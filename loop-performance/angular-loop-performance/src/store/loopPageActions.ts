import { createAction, props } from '@ngrx/store';
import { GridElement } from '../model/GridElement';
import { Sorting } from '../model/Sorting';

export const setGridDataAction = createAction(
  'setGridDataAction',
  props<{ grid: GridElement[], seed: number }>(),
);
export const sortGridAction = createAction('SortGridAction', props<{ sorting: Sorting, seed?: number }>());
export const incrementCounterAction = createAction('IncrementCounterAction');

export const increaseQuantityInGridAction = createAction('increaseQuantityInGridAction');
export const decreaseQuantityInGridAction = createAction('decreaseQuantityInGridAction');
