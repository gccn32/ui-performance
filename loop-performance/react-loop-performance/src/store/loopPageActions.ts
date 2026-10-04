import { type GridElement } from '../model/GridElement';

import { createAction } from '@reduxjs/toolkit';
import type { Sorting } from '../model/Sorting';

export const setGridDataAction = createAction<GridElement[]>('setGridDataAction');
export const sortGridAction = createAction<Sorting>('SortGridAction');
export const incrementCounterAction = createAction('IncrementCounterAction');
export const setGridRowsQuantityAction = createAction<number>('setGridRowsQuantityAction');
export const increaseQuantityInGridAction = createAction('increaseQuantityInGridAction');
export const decreaseQuantityInGridAction = createAction('decreaseQuantityInGridAction');
