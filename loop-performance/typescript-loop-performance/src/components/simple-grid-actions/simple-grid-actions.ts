import './simple-grid-actions.scss';
import { Sorting } from '../../model/Sorting';
import { store } from '../../store';
import {
  decreaseQuantityInGridAction,
  increaseQuantityInGridAction,
  sortGridAction,
} from '../../store/loopPageActions';
import { selectSorting } from '../../store/loopPageSelectors';
import { createDom } from '../../lib/createDom';

const activeClassName = 'active';
const buttonClassName = 'simple-grid-actions-button';

export class SimpleGridActions extends HTMLElement {
  private toggleHeader: HTMLButtonElement | undefined;

  connectedCallback() {
    const sortAscButton = createDom('button', buttonClassName, 'Ascending');
    sortAscButton.addEventListener('click', () =>
      store.dispatch(sortGridAction({ sorting: Sorting.Asc, seed: Date.now() }))
    );

    const sortDescButton = createDom('button', buttonClassName, 'Descending');
    sortDescButton.addEventListener('click', () =>
      store.dispatch(sortGridAction({ sorting: Sorting.Desc, seed: Date.now() }))
    );

    const shuffleButton = createDom('button', buttonClassName, 'Shuffle');
    shuffleButton.addEventListener('click', () =>
      store.dispatch(sortGridAction({ sorting: Sorting.Shuffle, seed: Date.now() }))
    );

    const increaseQuantityButton = createDom('button', buttonClassName, 'Increase Quantity Field');
    increaseQuantityButton.addEventListener('click', () => store.dispatch(increaseQuantityInGridAction()));

    const decreaseQuantityButton = createDom('button', buttonClassName, 'Decrease Quantity Field');
    decreaseQuantityButton.addEventListener('click', () => store.dispatch(decreaseQuantityInGridAction()));

    this.toggleHeader = createDom('button', buttonClassName, 'Show Header');
    this.toggleHeader.addEventListener('click', () => this.dispatchEvent(new Event('toggleHeader')));

    const buttons = [
      { sorting: Sorting.Asc, button: sortAscButton },
      { sorting: Sorting.Desc, button: sortDescButton },
      { sorting: Sorting.Shuffle, button: shuffleButton },
    ];

    store.subscribe(selectSorting, (sorting: Sorting) => {
      buttons.forEach((e) => {
        if (e.sorting !== sorting) {
          e.button.classList.remove(activeClassName);
          e.button.disabled = false;
        } else {
          e.button.classList.add(activeClassName);
          e.button.disabled = sorting === Sorting.Asc || sorting === Sorting.Desc;
        }
      });
    });

    this.append(
      createDom('fieldset', 'simple-grid-actions-field', [
        sortAscButton,
        sortDescButton,
        shuffleButton,
        increaseQuantityButton,
        decreaseQuantityButton,
        this.toggleHeader,
      ])
    );
  }
  set showHeader(newValue: boolean) {
    this.toggleHeader!.textContent = newValue ? 'Hide Header' : 'Show Header';
  }
}

customElements.define('tlp-simple-grid-actions', SimpleGridActions);
