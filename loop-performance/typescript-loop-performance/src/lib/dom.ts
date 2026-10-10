export function createDom<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  className?: string | string[],
  children?: string | number | HTMLElement | DocumentFragment | (HTMLElement | string | number)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (className)
    if (Array.isArray(className)) element.classList.add(...className);
    else element.classList.add(className);
  if (children != null)
    if (Array.isArray(children)) element.append(...(children as any[]));
    else element.append(children as any);
  return element;
}

export function on(element: HTMLElement, event: string, handler: (event: Event) => any) {
  element.addEventListener(event, handler);
}

export function toggleClassName(element: HTMLElement, className: string, toggle: boolean = true) {
  element.classList[toggle ? 'add' : 'remove'](className);
}
