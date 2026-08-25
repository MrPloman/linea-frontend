import { Cart } from '../models/cart';

export interface CartRepository {
  load(): Promise<Cart | null>;
  save(cart: Cart): Promise<void>;
}
