import { Cart } from '../models/cart';

export interface CartRepository {
  // TODO(pol): usar load() para rehidratar el CartStore al arrancar la app
  // cuando el repositorio tenga persistencia real (localStorage / API).
  load(): Promise<Cart | null>;
  save(cart: Cart): Promise<void>;
}
