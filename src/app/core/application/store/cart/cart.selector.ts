import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '.';
import { getShippingCost } from '../../../domain/policies/shippingPolicy';
import { getIncludedVat } from '../../../domain/policies/vatPolicy';

// cart.selectors.ts
export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, (state) =>
  state.cart.getArrayOfItems(),
);
export const selectCartSubtotal = createSelector(selectCartState, (state) => state.cart.subTotal);

export const selectShippingCost = createSelector(selectCartSubtotal, (subtotal) =>
  getShippingCost(subtotal),
);

export const selectCartTotal = createSelector(
  selectCartSubtotal,
  selectShippingCost,
  (subtotal, shipping) => subtotal.add(shipping),
);
export const selectItemCount = createSelector(selectCartState, (state) => state.cart.itemCount);
export const selectIsCartEmpty = createSelector(selectCartState, (state) => state.cart.isEmpty);

export const selectIncludedVat = createSelector(selectCartTotal, (total) => getIncludedVat(total));
