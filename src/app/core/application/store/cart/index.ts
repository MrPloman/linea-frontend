import { Cart } from '../../../domain/models/cart';

export interface CartState {
  cart: Cart;
}

export const initialState: CartState = { cart: Cart.createEmptyCart() };
