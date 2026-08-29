import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { CartEffects } from './core/application/store/cart/cart.effect';
import { cartReducer } from './core/application/store/cart/cart.reducer';
import { CART_REPOSITORY } from './core/application/tokens/cartRepositoryToken';
import {
  PAYPAL_PAYMENT_GATEWAY,
  STRIPE_PAYMENT_GATEWAY,
} from './core/application/tokens/paymentGatewayToken';
import { PRODUCT_REPOSITORY } from './core/application/tokens/productsRepositoryToken';
import { InMemoryCartRepository } from './infrastructure/cart/memoryCart.repository';
import { PaypalPaymentAdapter } from './infrastructure/payment/paypalPayment.adapter';
import { StripePaymentAdapter } from './infrastructure/payment/stripePayment.adapter';
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
    provideHttpClient(),
    { provide: PRODUCT_REPOSITORY, useClass: InMemoryProductRepository },
    { provide: CART_REPOSITORY, useClass: InMemoryCartRepository },
    { provide: STRIPE_PAYMENT_GATEWAY, useClass: StripePaymentAdapter },
    { provide: PAYPAL_PAYMENT_GATEWAY, useClass: PaypalPaymentAdapter },
  ],
};
