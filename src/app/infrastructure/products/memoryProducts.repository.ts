import { Injectable } from '@angular/core';
import { Product } from '../../core/domain/models/product';
import { ProductRepository } from '../../core/domain/ports/product.repository';

// infrastructure/inMemoryProductRepository.ts
@Injectable({ providedIn: 'root' })
export class InMemoryProductRepository implements ProductRepository {
  private readonly products: Product[] = [
    // 2-3 productos reales, con Product.createProduct(...) y sus variantes
  ];

  async findById(id: string): Promise<Product | null> {
    return await null;
    // TODO: tu turno
  }

  async findAll(): Promise<Product[]> {
    return await [];
    // TODO: tu turno
  }
}
