import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { CartEffects } from './core/application/store/cart/cart.effect';
import { cartReducer } from './core/application/store/cart/cart.reducer';
import { CART_REPOSITORY } from './core/application/useCases/cart/cartRepositoryToken';
import { PRODUCT_REPOSITORY } from './core/application/useCases/products/findProductById';
import { InMemoryCartRepository } from './infrastructure/cart/memoryCart.repository';
import { InMemoryProductRepository } from './infrastructure/products/memoryProducts.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideStore({ cart: cartReducer }),
    provideEffects(CartEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    { provide: PRODUCT_REPOSITORY, useClass: InMemoryProductRepository },
    { provide: CART_REPOSITORY, useClass: InMemoryCartRepository },
  ],
};
