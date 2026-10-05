import type { AppState } from '.';

export function selectLoopPage(state: AppState) {
  return state.loopPage;
}

export function selectGridData(state: AppState) {
  return state.loopPage.grid;
}

export function selectCounter(state: AppState) {
  return state.loopPage.counter;
}

export function selectSorting(state: AppState) {
  return state.loopPage.sorting;
}
