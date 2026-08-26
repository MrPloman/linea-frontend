import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';

export interface CartRepository {
  load(): Promise<Cart | null>;
  save(cart: CartItem[]): Promise<void>;
  clear(): Promise<void>;
}
