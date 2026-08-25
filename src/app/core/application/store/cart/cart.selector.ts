import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '.';
import { Money } from '../../../domain/models/money';

// cart.selectors.ts
export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, (state) => state.items);
export const selectCartSubtotal = createSelector(selectCartItems, (items) =>
  items.reduce((acc, item) => acc.add(item.lineTotal), Money.createMoney(0, 'EUR')),
);
