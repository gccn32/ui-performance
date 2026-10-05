import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { rootReducers } from '../store';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { LoopPageEffects } from '../store/loopPageEffects';
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(rootReducers),
    provideEffects([LoopPageEffects]),
    provideRouterStore(),
  ],
};
