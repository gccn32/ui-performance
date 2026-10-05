
import { createReducer, on } from '@ngrx/store';
import { GridElement } from '../model/GridElement';
import { Sorting } from '../model/Sorting';
import {
  decreaseQuantityInGridAction,
  increaseQuantityInGridAction,
  incrementCounterAction,
  setGridDataAction,
  sortGridAction,
} from './loopPageActions';

export interface LoopPageState {
  counter: number;
  sorting: Sorting;
  grid: GridElement[];
}

const initialState: LoopPageState = {
  counter: 0,
  grid: [],
  sorting: Sorting.Asc,
};

function shuffleGridData<T>(array: T[]) {
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const comparator = new Intl.Collator().compare;
function sortGridData(gridData: GridElement[], sorting: Sorting): GridElement[] {
  if (sorting === Sorting.Asc) {
    gridData.sort((a, b) => comparator(a.caption, b.caption));
  } else if (sorting === Sorting.Desc) {
    gridData.sort((a, b) => -comparator(a.caption, b.caption));
  } else {
    gridData = shuffleGridData(gridData);
  }
  return gridData;
}

export const loopPageReducer = createReducer(
  initialState,
  on(incrementCounterAction, (state) => ({
    ...state,
    counter: state.counter + 1,
  })),
  on(sortGridAction, (state, { sorting }) => ({
    ...state,
    sorting,
    grid: sortGridData([...state.grid], sorting),
  })),
  on(setGridDataAction, (state, { grid }) => ({
    ...state,
    grid: sortGridData(grid, state.sorting),
  })),
  on(increaseQuantityInGridAction, (state) => ({
    ...state,
    grid: state.grid.map((e) => ({ ...e, quantity: e.quantity + 1 })),
  })),
  on(decreaseQuantityInGridAction, (state) => ({
    ...state,
    grid: state.grid.map((e) => ({ ...e, quantity: e.quantity - 1 })),
  })),
);
