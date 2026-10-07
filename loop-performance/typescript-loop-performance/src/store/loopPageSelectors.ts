import type { RootState } from '.';

export function selectLoopPage(state: RootState) {
  return state.loopPage;
}

export function selectGridData(state: RootState) {
  return state.loopPage.grid;
}

export function selectCounter(state: RootState) {
  return state.loopPage.counter;
}

export function selectSorting(state: RootState) {
  return state.loopPage.sorting;
}
