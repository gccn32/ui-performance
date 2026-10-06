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

function mulberry32(seed: number) {
  return function (): number {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleGridData<T>(array: T[], seed: number) {
  const random = mulberry32(seed);
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const comparator = new Intl.Collator().compare;
function sortGridData(gridData: GridElement[], sorting: Sorting, seed?: number): GridElement[] {
  if (sorting === Sorting.Asc) {
    return gridData.toSorted((a, b) => comparator(a.caption, b.caption));
  } else if (sorting === Sorting.Desc) {
    return gridData.toSorted((a, b) => comparator(b.caption, a.caption));
  } else {
    return shuffleGridData([...gridData], seed!);
  }
}

export const loopPageReducer = createReducer(
  initialState,
  on(incrementCounterAction, (state) => ({
    ...state,
    counter: state.counter + 1,
  })),
  on(sortGridAction, (state, { sorting, seed }) => ({
    ...state,
    sorting,
    grid: sortGridData(state.grid, sorting, seed),
  })),
  on(setGridDataAction, (state, { grid, seed }) => ({
    ...state,
    grid: sortGridData(grid, state.sorting, seed),
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
