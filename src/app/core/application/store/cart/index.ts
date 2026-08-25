import { CartItem } from '../../../domain/models/cartItem';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = { items: [] };
