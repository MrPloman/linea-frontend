import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../../../domain/models/cartItem';
import { Quantity } from '../../../domain/models/quantity';

// cart.actions.ts
export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    getCartSuccess: props<{ items: CartItem[] }>(),
    addItem: props<{ item: CartItem }>(),
    removeItem: props<{ item: CartItem }>(),
    updateQuantity: props<{ item: CartItem; newQuantity: Quantity }>(),
    clearCart: emptyProps(),
  },
});
