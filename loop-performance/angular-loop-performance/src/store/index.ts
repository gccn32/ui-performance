import { ActionReducerMap } from '@ngrx/store';
import { loopPageReducer, LoopPageState } from './loopPageReducers';

export interface AppState {
  loopPage: LoopPageState;
}

export const rootReducers: ActionReducerMap<AppState> = { loopPage: loopPageReducer };
