import { Injectable, inject } from '@angular/core';
import { CartItem } from '../../../domain/models/cartItem';
import { Quantity } from '../../../domain/models/quantity';
import { CartStore } from '../../state/cartStore';
import { CART_REPOSITORY } from './cartRepositoryToken';

@Injectable({ providedIn: 'root' })
export class UpdateCartItemQuantityUseCase {
  private cartRepository = inject(CART_REPOSITORY);
  private cartStore = inject(CartStore);

  async execute(item: CartItem, newQuantity: Quantity): Promise<void> {
    const updatedCart = this.cartStore.cart().updateItemQuantity(item, newQuantity);
    this.cartStore.setCart(updatedCart);
    await this.cartRepository.save(updatedCart);
  }
}
