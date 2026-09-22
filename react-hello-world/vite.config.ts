import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

process.env.BROWSER = 'google-chrome';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json', // Guide the checker to the right config
      },
    }),
  ],
  server: {
    open: true, // Automatically opens the app in the browser on server start
  },
});
