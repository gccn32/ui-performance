import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setGridDataAction, setGridRowsQuantityAction } from './loopPageActions';
import type { GridElement } from '../model/GridElement';

export const listenerMiddleware = createListenerMiddleware();
const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.match(
    /\w+/g,
  );

listenerMiddleware.startListening({
  actionCreator: setGridRowsQuantityAction,
  effect: (action, listenerApi) => {
    const gridElements: GridElement[] = [];
    for (let i = 0; i < action.payload; i++) {
      const captionItems = [];
      const captionItemsCount = Math.floor(Math.random() * 8 + 3);
      for (let e = 0; e < captionItemsCount; e++) {
        captionItems.push(loremIpsum![Math.floor(Math.random() * loremIpsum!.length)]);
      }
      const quantity = Math.floor(Math.random() * 1000000) + 9998;

      gridElements.push({
        caption: captionItems.join(' '),
        quantity,
        index: i,
        id: `${i}-${quantity}`,
      });
    }

    listenerApi.dispatch(setGridDataAction(gridElements));
  },
});
