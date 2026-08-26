import { Injectable, inject } from '@angular/core';
import { CART_REPOSITORY } from '../../tokens/cartRepositoryToken';

@Injectable({ providedIn: 'root' })
export class ClearCartUseCase {
  private cartRepository = inject(CART_REPOSITORY);
  async execute(): Promise<void> {
    await this.cartRepository.clear();
  }
}
