import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../../../domain/models/cartItem';
import { Quantity } from '../../../domain/models/quantity';

// cart.actions.ts
export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    '[ADD_ITEM]': props<{ item: CartItem }>(),
    '[REMOVE_ITEM]': props<{ item: CartItem }>(),
    '[UPDATE_QUANTITY]': props<{ item: CartItem; newQuantity: Quantity }>(),
    '[CLEAR_CART]': emptyProps(),
  },
});
