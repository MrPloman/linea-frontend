// productSku.ts
export class ProductSku {
  private constructor(private readonly value: string) {}

  public static createProductSku(rawValue: string): ProductSku {
    const normalized = rawValue
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, '_')
      .replace(/[^A-Z0-9_]/g, '');

    if (normalized.length === 0) {
      throw new Error('ProductSku cannot be empty');
    }

    return new ProductSku(normalized);
  }

  get displayValue(): string {
    return this.value;
  }

  public isEqual(other: ProductSku): boolean {
    return this.value === other.value;
  }
}
