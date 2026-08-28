import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../../domain/models/cart';
import { CartActions } from './cart.actions';
import { initialState } from './index';

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { item }) => {
    return {
      ...state,
      cart: state.cart.addItem(item),
    };
  }),
  on(CartActions.removeItem, (state, { item }) => ({
    ...state,
    cart: state.cart.removeItem(item),
  })),
  on(CartActions.updateQuantity, (state, { item, newQuantity }) => ({
    ...state,
    cart: state.cart.updateItemQuantity(item, newQuantity),
  })),
  on(CartActions.clearCart, (state) => ({
    ...state,
    cart: state.cart.clear(),
  })),
  on(CartActions.getCartSuccess, (state, { items }) => ({
    ...state,
    cart: Cart.createCart(items),
  })),
);
