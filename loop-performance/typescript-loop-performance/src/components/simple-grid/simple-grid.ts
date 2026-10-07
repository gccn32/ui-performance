import './simple-grid.scss';
import './../simple-grid-actions/simple-grid-actions';
import type { SimpleGridActions } from './../simple-grid-actions/simple-grid-actions';
import { createDom } from '../../lib/createDom';
import type { GridElement } from '../../model/GridElement';
import { store } from '../../store';
import { selectGridData } from '../../store/loopPageSelectors';

const firstWrapperDataLimit = 50;

class SimpleGrid extends HTMLElement {
  showHeader = true;
  gridDataFirstWrapper = createDom('ul', 'grid');
  gridDataSecondWrapper = createDom('ul', 'grid');
  renderTimeout: number;

  private createGridHeader(): HTMLElement {
    const headerCells = [
      createDom('div', 'grid-data-id', 'ID'),
      createDom('div', 'grid-data-caption', 'Caption'),
      createDom('div', 'grid-data-quantity', 'Quantity'),
    ];
    return createDom('div', ['grid-row', 'grid-row-header'], headerCells);
  }

  private generateRow(item: GridElement): HTMLElement {
    const gridCells = [
      createDom('div', 'grid-data-id', item.index),
      createDom('div', 'grid-data-caption', item.caption),
      createDom('div', 'grid-data-quantity', item.quantity),
    ];
    return createDom('li', 'grid-row', gridCells);
  }

  private showData(data: GridElement[]) {
    const fragment = new DocumentFragment();
    for (let i = 0; i < Math.min(firstWrapperDataLimit, data.length); i++) {
      fragment.append(this.generateRow(data[i]));
    }
    this.gridDataFirstWrapper.replaceChildren(fragment);

    clearTimeout(this.renderTimeout);
    this.renderTimeout = setTimeout(() => {
      const fragment = new DocumentFragment();
      for (let i = firstWrapperDataLimit; i < data.length; i++) {
        fragment.append(this.generateRow(data[i]));
      }
      this.gridDataSecondWrapper.replaceChildren(fragment);
    });
  }
  connectedCallback() {
    const header = document.createElement('tlp-simple-grid-actions') as SimpleGridActions;
    this.append(header);
    header.showHeader = this.showHeader;
    const gridHeader = this.createGridHeader();
    header.after(gridHeader);
    header.addEventListener('toggleHeader', () => {
      header.showHeader = this.showHeader = !this.showHeader;
      if (this.showHeader) {
        header.after(gridHeader);
      } else {
        gridHeader.remove();
      }
    });

    this.append(this.gridDataFirstWrapper, this.gridDataSecondWrapper);
    store.subscribe(selectGridData, (data: GridElement[]) => this.showData(data));
  }
}

customElements.define('tlp-simple-grid', SimpleGrid);
