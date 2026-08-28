import { Injectable, inject } from '@angular/core';
import { CartItem } from '../../../domain/models/cartItem';
import { CART_REPOSITORY } from '../../tokens/cartRepositoryToken';

@Injectable({ providedIn: 'root' })
export class GetCarttUseCase {
  private cartRepository = inject(CART_REPOSITORY);
  async execute(): Promise<CartItem[]> {
    return await this.cartRepository.load();
  }
}
