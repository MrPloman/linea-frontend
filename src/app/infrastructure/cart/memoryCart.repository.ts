import { Injectable } from '@angular/core';
import { Cart } from '../../core/domain/models/cart';
import { CartRepository } from '../../core/domain/ports/cart.repository';

// TODO(pol): persistencia real (localStorage / API) — hoy replica el
// comportamiento anterior: el carrito solo vive en memoria.
@Injectable({ providedIn: 'root' })
export class InMemoryCartRepository implements CartRepository {
  private cart: Cart | null = null;

  async load(): Promise<Cart | null> {
    return this.cart;
  }

  async save(cart: Cart): Promise<void> {
    this.cart = cart;
  }
}
