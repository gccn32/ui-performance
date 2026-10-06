import { createListenerMiddleware } from '@reduxjs/toolkit';
import { gridElements } from '../model/constants';
import { setGridDataAction, setGridRowsQuantityAction } from './loopPageActions';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setGridRowsQuantityAction,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(
      setGridDataAction({ gridData: gridElements.slice(0, action.payload), seed: Date.now() }),
    );
  },
});
