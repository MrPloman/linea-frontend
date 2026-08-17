import { Injectable, InjectionToken, inject } from '@angular/core';
import { Product } from '../../../domain/models/product';
import { ProductRepository } from '../../../domain/ports/product.repository';
export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>('ProductRepository');

// core/application/useCases/findProductByIdUseCase.ts
@Injectable({ providedIn: 'root' })
export class FindProductByIdUseCase {
  private productRepository = inject(PRODUCT_REPOSITORY);

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
