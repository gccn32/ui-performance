export function on(element: HTMLElement, event: string, handler: (event: Event) => any) {
  element.addEventListener(event, handler);
}
