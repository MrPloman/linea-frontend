import { Injectable, inject } from '@angular/core';
import { CartItem } from '../../../domain/models/cartItem';
import { CartStore } from '../../state/cartStore';
import { CART_REPOSITORY } from './cartRepositoryToken';

@Injectable({ providedIn: 'root' })
export class AddItemToCartUseCase {
  private cartRepository = inject(CART_REPOSITORY);
  private cartStore = inject(CartStore);

  // El store es la fuente de verdad síncrona (evita perder actualizaciones si
  // llegan dos comandos seguidos); el repositorio persiste el resultado.
  async execute(item: CartItem): Promise<void> {
    const updatedCart = this.cartStore.cart().addItem(item);
    this.cartStore.setCart(updatedCart);
    await this.cartRepository.save(updatedCart);
  }
}
