import { Injectable, inject } from '@angular/core';

import { CartItem } from '../../../domain/models/cartItem';
import { CART_REPOSITORY } from '../../tokens/cartRepositoryToken';

@Injectable({ providedIn: 'root' })
export class AddItemToCartUseCase {
  private cartRepository = inject(CART_REPOSITORY);
  async execute(items: CartItem[]): Promise<void> {
    await this.cartRepository.save(items);
  }
}
