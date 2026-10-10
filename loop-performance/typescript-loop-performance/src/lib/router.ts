type Listener = (pathname: string) => any;
type Route = { route: string | RegExp; handler: Listener };

let routes: Route[] = [];
const listener: Listener[] = [];

function triggerNav() {
  const pathname = location.pathname;
  for (const r of routes) {
    if (pathname === r.route || (r.route as RegExp)?.test(pathname)) {
      r.handler(pathname);
      break;
    }
  }
  listener.forEach((l) => l(pathname));
}
window.addEventListener('popstate', triggerNav);

export const subscribeNavigation = (l: Listener) => listener.push(l);

export const createRouter = (r: Route[]) => {
  routes = r;
  return { start: triggerNav };
};

export function navigate(path: string) {
  history.pushState({}, '', path);
  triggerNav();
}
