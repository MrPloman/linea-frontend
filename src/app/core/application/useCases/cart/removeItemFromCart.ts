import { Injectable, inject } from '@angular/core';
import { CartItem } from '../../../domain/models/cartItem';
import { CartStore } from '../../state/cartStore';
import { CART_REPOSITORY } from './cartRepositoryToken';

@Injectable({ providedIn: 'root' })
export class RemoveItemFromCartUseCase {
  private cartRepository = inject(CART_REPOSITORY);
  private cartStore = inject(CartStore);

  async execute(item: CartItem): Promise<void> {
    const updatedCart = this.cartStore.cart().removeItem(item);
    this.cartStore.setCart(updatedCart);
    await this.cartRepository.save(updatedCart);
  }
}
