import { SimpleStore } from '../lib/simple-store';
import { initialState, loopPageReducer, type LoopPageState } from './loopPageReducer';

export interface RootState {
  loopPage: LoopPageState;
}

export const store = new SimpleStore<RootState>({ loopPage: initialState });
store.registerReducer('loopPage', loopPageReducer);
