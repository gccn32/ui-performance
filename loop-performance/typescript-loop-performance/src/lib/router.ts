import { navLinksValues } from '../model/constants';

type RouterListener = () => void;
const listeners: RouterListener[] = [];

const validatePath = (path: string) => navLinksValues.some((e) => `/${e}/` === path);

export const subscribeNavigation = (l: RouterListener) => listeners.push(l);

export function triggerNavigation() {
  if (!validatePath(location.pathname)) {
    return navigate(`/${navLinksValues[0]}/`);
  }

  listeners.forEach((l) => l());
}

window.addEventListener('popstate', triggerNavigation);

export function navigate(path: string) {
  history.pushState({}, '', path);
  triggerNavigation();
}
