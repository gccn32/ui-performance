import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { filter, map } from 'rxjs';
import { gridElements, navLinksValues } from '../model/constants';
import { setGridDataAction } from './loopPageActions';

@Injectable()
export class LoopPageEffects {
  private actions$ = inject(Actions);

  quantityChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      map((action) => {
        const params = action.payload.routerState.root.firstChild?.params;
        return params?.['quantity'];
      }),
      filter((quantity): quantity is string => !!quantity),
      map((quantity) => parseInt(quantity)),
      map((quantity) => (navLinksValues.includes(quantity) ? quantity : navLinksValues[0])),
      map((gridSize) => {
        return setGridDataAction({ grid: gridElements.slice(0, gridSize), seed: Date.now() });
      }),
    ),
  );
}
