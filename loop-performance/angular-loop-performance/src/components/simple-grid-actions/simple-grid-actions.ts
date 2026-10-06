import { Component, inject, model } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sorting } from '../../model/Sorting';
import {
  decreaseQuantityInGridAction,
  increaseQuantityInGridAction,
  sortGridAction,
} from '../../store/loopPageActions';
import { selectSorting } from '../../store/loopPageSelectors';

@Component({
  imports: [],
  selector: 'alp-simple-grid-actions',
  styleUrl: './simple-grid-actions.scss',
  templateUrl: './simple-grid-actions.html',
})
export class SimpleGridActions {
  private store = inject(Store);
  SortingType = Sorting;
  sorting = this.store.selectSignal(selectSorting);
  showHeader = model<boolean>();

  sortAsc() {
    this.store.dispatch(sortGridAction({ sorting: Sorting.Asc }));
  }

  sortDesc() {
    this.store.dispatch(sortGridAction({ sorting: Sorting.Desc }));
  }

  shuffle() {
    this.store.dispatch(sortGridAction({ sorting: Sorting.Shuffle, seed: Date.now() }));
  }

  decreaseQuantity() {
    this.store.dispatch(decreaseQuantityInGridAction());
  }

  increaseQuantity() {
    this.store.dispatch(increaseQuantityInGridAction());
  }
}
