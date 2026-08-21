// productSku.ts
export class ProductSku {
  private static readonly PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  private static readonly MIN_SEGMENTS = 3; // product-color-size
  private static readonly MAX_LENGTH = 64;
  private constructor(private readonly value: string) {}
  public static validate(value: string): string[] {
    const errors: string[] = [];
    const trimmed = value?.trim() ?? '';

    if (trimmed.length === 0) {
      errors.push('SKU cannot be empty.');
      return errors;
    }
    if (trimmed.length > ProductSku.MAX_LENGTH) {
      errors.push(`SKU cannot exceed ${ProductSku.MAX_LENGTH} characters.`);
    }
    if (!ProductSku.PATTERN.test(trimmed)) {
      errors.push('SKU only accepts lowercase letters, digits and single hyphens.');
    } else if (trimmed.split('-').length < ProductSku.MIN_SEGMENTS) {
      errors.push('SKU must follow the product-color-size format.');
    }
    return errors;
  }
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
