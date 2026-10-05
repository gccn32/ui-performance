import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { filter, map } from 'rxjs/operators';
import { navLinksValues } from '../model/constants';
import { GridElement } from '../model/GridElement';
import { setGridDataAction } from './loopPageActions';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.match(
    /\w+/g,
  );

@Injectable()
export class LoopPageEffects {
  private actions$ = inject(Actions);

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      map((action) => {
        const params = action.payload.routerState.root.firstChild?.params;
        return params?.['quantity'];
      }),
      // 3. Only emit if an ID actually exists in the URL
      filter((quantity): quantity is string => !!quantity),
      map((quantity) => parseInt(quantity)),
      map((quantity) => (navLinksValues.includes(quantity) ? quantity : navLinksValues[1])),
      map((quantity) => {
        const gridElements: GridElement[] = [];
        for (let i = 0; i < quantity; i++) {
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

        return setGridDataAction({ grid: gridElements });
      }),
    ),
  );
}
