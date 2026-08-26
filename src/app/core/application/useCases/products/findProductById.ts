import { Injectable, inject } from '@angular/core';
import { Product } from '../../../domain/models/product';
import { PRODUCT_REPOSITORY } from '../../tokens/productsRepositoryToken';

// core/application/useCases/findProductByIdUseCase.ts
@Injectable({ providedIn: 'root' })
export class FindProductByIdUseCase {
  private productRepository = inject(PRODUCT_REPOSITORY);

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
