import { Routes } from '@angular/router';
import { navLinksValues } from '../model/constants';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${navLinksValues[0]}`,
    pathMatch: 'full',
  },
  {
    path: ':quantity',
    component: App,
  },
];
