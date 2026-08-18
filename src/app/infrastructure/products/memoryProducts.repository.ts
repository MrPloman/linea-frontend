import { Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '@presentation/mocks/products.mock';
import { Product } from '../../core/domain/models/product';
import { ProductRepository } from '../../core/domain/ports/product.repository';

// infrastructure/inMemoryProductRepository.ts
@Injectable({ providedIn: 'root' })
export class InMemoryProductRepository implements ProductRepository {
  private readonly products: Product[] = [
    // 2-3 productos reales, con Product.createProduct(...) y sus variantes
  ];

  async findById(id: string): Promise<Product | null> {
    return (await MOCK_PRODUCTS.find((product: Product) => product.displayId === id)) ?? null;
  }

  async findAll(): Promise<Product[]> {
    return await MOCK_PRODUCTS;
  }
}
