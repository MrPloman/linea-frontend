import { CartItem } from '../models/cartItem';

export interface CartRepository {
  load(): Promise<CartItem[]>;
  save(cart: CartItem[]): Promise<void>;
  clear(): Promise<void>;
}
