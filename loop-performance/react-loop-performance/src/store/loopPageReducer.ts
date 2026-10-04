import { type UnknownAction } from '@reduxjs/toolkit';
import { type GridElement } from '../model/GridElement';
import {
  decreaseQuantityInGridAction,
  increaseQuantityInGridAction,
  incrementCounterAction,
  setGridDataAction,
  sortGridAction,
} from './loopPageActions';
import { Sorting } from '../model/Sorting';

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

export function loopPageReducer(state = initialState, action: UnknownAction): LoopPageState {
  if (incrementCounterAction.match(action)) {
    return { ...state, counter: state.counter + 1 };
  } else if (sortGridAction.match(action)) {
    return {
      ...state,
      sorting: action.payload,
      grid: sortGridData([...state.grid], action.payload),
    };
  } else if (setGridDataAction.match(action)) {
    return { ...state, grid: sortGridData(action.payload, state.sorting) };
  } else if (increaseQuantityInGridAction.match(action)) {
    return { ...state, grid: state.grid.map((e) => ({ ...e, quantity: e.quantity + 1 })) };
  } else if (decreaseQuantityInGridAction.match(action)) {
    return { ...state, grid: state.grid.map((e) => ({ ...e, quantity: e.quantity - 1 })) };
  }
  return state;
}
