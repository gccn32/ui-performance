import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import fs from 'fs';
import { spawn } from 'child_process'; // Import child_process spawn

const isWatch = process.argv.includes('--watch');
const templateContent = fs.readFileSync('./src/index.html', 'utf-8');

// Helper to run tsc type-checking natively inside the script
function runTypeChecker() {
  const args = ['--noEmit'];
  if (isWatch) args.push('--watch', '--preserveWatchOutput');

  // Spawn a native tsc subprocess inheriting terminal pipe outputs
  const tsc = spawn('npx', ['tsc', ...args], {
    stdio: 'inherit',
    shell: true,
  });

  return new Promise((resolve, reject) => {
    if (isWatch) {
      // In watch mode, let it run continuously in the background
      resolve();
    } else {
      // In production mode, wait for validation to complete
      tsc.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('❌ TypeScript validation failed. Aborting build.'));
      });
    }
  });
}

if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: !isWatch,
  target: 'esnext',
  platform: 'browser',
  format: 'esm',
  outdir: 'dist',
  metafile: true,
  publicPath: '/',
  sourcemap: isWatch,
  banner: isWatch
    ? {
        js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
      }
    : {},
  plugins: [
    sassPlugin(),
    htmlPlugin({
      files: [
        {
          entryPoints: ['src/index.ts'],
          filename: 'index.html',
          htmlTemplate: templateContent,
          scriptLoading: 'module',
        },
      ],
    }),
  ],
};

async function run() {
  if (isWatch) {
    // 1. Kick off the TypeScript continuous background watch layer
    await runTypeChecker();

    // 2. Initialize the esbuild bundler infrastructure
    let ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('⚡ Watching source trees for modifications...');

    const serverOpts = {
      port: 3000,
      servedir: 'dist',
      fallback: 'dist/index.html',
    };

    let { host, port } = await ctx.serve(serverOpts);
    const url = `http://localhost:${port}`;
    console.log(`🚀 Development server active at ${url}`);
  } else {
    console.log('🔍 Running strict type checks...');
    // In production, block the build from starting if errors exist
    await runTypeChecker();

    console.log('📦 Bundling assets for production...');
    await esbuild.build(config);
    console.log('✔ Production bundle generated successfully inside "dist/"!');
  }
}

run().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
