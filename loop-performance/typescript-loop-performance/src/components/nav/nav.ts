import { createDom, on, toggleClassName } from '../../lib/dom';
import { navLinksValues } from '../../model/constants';
import { navigate, subscribeNavigation } from '../../lib/router';
import './nav.scss';

class Nav extends HTMLElement {
  private createLink(navLinkValue: number): HTMLAnchorElement {
    const link = createDom('a', 'menu-navigation-link', `${navLinkValue} lines`);
    const href = `/${navLinkValue}/`;
    link.href = href;
    subscribeNavigation((pathname) => toggleClassName(link, 'active', href === pathname));

    on(link, 'click', (e) => {
      e.preventDefault();
      navigate(href);
    });

    return link;
  }

  connectedCallback() {
    const list: HTMLElement[] = [];
    for (const navLinkValue of navLinksValues) {
      const link = this.createLink(navLinkValue);
      list.push(createDom('li', 'menu-navigation-item', link));
    }
    this.append(createDom('menu', 'menu-navigation', list));
  }
}

customElements.define('tlp-nav', Nav);
