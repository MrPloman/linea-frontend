import { Injectable } from '@angular/core';
import { Cart } from '../../core/domain/models/cart';
import { CartItem } from '../../core/domain/models/cartItem';
import { CartRepository } from '../../core/domain/ports/cart.repository';

@Injectable({ providedIn: 'root' })
export class InMemoryCartRepository implements CartRepository {
  async load(): Promise<Cart | null> {
    const cart = localStorage.getItem('cart');
    if (!cart) return await null;
    return await JSON.parse(cart);
  }

  async save(cart: CartItem[]): Promise<void> {
    await localStorage.setItem('cart', JSON.stringify(cart));
  }
  async clear(): Promise<void> {
    const cart = localStorage.getItem('cart');
    if (!cart) return;
    await localStorage.removeItem('cart');
  }
}
