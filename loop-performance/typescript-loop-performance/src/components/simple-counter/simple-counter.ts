import { createDom, on } from '../../lib/dom';
import { store } from '../../store';
import { incrementCounterAction } from '../../store/loopPageActions';
import { selectCounter } from '../../store/loopPageSelectors';
import './simple-counter.scss';

class SimpleCounter extends HTMLElement {
  connectedCallback() {
    const button = createDom('button', '', 'Increment');
    on(button, 'click', () => {
      store.dispatch(incrementCounterAction());
    });

    const valueHolder = createDom('div', 'simple-counter-value');
    store.subscribe(selectCounter, (data: number) => {
      valueHolder.textContent = '' + data;
    });
    this.append(createDom('section', 'simple-counter', [button, valueHolder]));
  }
}

customElements.define('tlp-simple-counter', SimpleCounter);
