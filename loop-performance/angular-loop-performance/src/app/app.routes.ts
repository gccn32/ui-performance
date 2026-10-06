import { ActivatedRouteSnapshot, Router, Routes, UrlTree } from '@angular/router';
import { navLinksValues } from '../model/constants';
import { App } from './app';
import { inject } from '@angular/core';

const quantityValidatorGuard = (route: ActivatedRouteSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const quantityParam = route.paramMap.get('quantity');
  const quantity = parseInt(quantityParam!);

  if ('' + quantity === quantityParam && navLinksValues.includes(quantity)) {
    return true;
  }

  return router.createUrlTree(['/', navLinksValues[0]]);
};

export const routes: Routes = [
  {
    path: ':quantity',
    component: App,
    canActivate: [quantityValidatorGuard],
  },
  {
    path: '**',
    redirectTo: `/${navLinksValues[0]}`,
  },
];
