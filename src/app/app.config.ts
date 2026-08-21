import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { CART_REPOSITORY } from './core/application/useCases/cart/cartRepositoryToken';
import { PRODUCT_REPOSITORY } from './core/application/useCases/products/findProductById';
import { InMemoryCartRepository } from './infrastructure/cart/memoryCart.repository';
import { InMemoryProductRepository } from './infrastructure/products/memoryProducts.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
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
