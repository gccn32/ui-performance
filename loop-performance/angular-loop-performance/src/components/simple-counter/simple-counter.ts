import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCounter } from '../../store/loopPageSelectors';
import { AsyncPipe } from '@angular/common';
import { incrementCounterAction } from '../../store/loopPageActions';

@Component({
  imports: [AsyncPipe],
  selector: 'alp-simple-counter',
  styleUrl: './simple-counter.scss',
  templateUrl: './simple-counter.html',
})
export class SimpleCounter {
  private store = inject(Store);
  counter = this.store.select(selectCounter);

  increment() {
    this.store.dispatch(incrementCounterAction());
  }
}
