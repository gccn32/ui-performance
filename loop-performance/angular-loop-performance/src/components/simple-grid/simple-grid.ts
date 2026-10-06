import { Component, inject, signal } from '@angular/core';
import { SimpleGridActions } from '../simple-grid-actions/simple-grid-actions';
import { Store } from '@ngrx/store';
import { selectGridData } from '../../store/loopPageSelectors';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [SimpleGridActions, AsyncPipe],
  selector: 'alp-simple-grid',
  styleUrl: './simple-grid.scss',
  templateUrl: './simple-grid.html',
})
export class SimpleGrid {
  private store = inject(Store);
  showHeader = signal(true);
  gridData = this.store.select(selectGridData);
}
