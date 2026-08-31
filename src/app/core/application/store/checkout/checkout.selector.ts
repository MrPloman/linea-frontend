import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from '.';

// cart.selectors.ts
export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');
export const selectAddress = createSelector(
  selectCheckoutState,
  ({ checkout }) => checkout.address,
);
export const selectShippingMethod = createSelector(
  selectCheckoutState,
  ({ checkout }) => checkout.shippingMethod,
);
export const selectExtraCostShippingMethod = createSelector(
  selectShippingMethod,
  ({ price }) => price,
);
