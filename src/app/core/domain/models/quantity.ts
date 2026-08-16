export class Quantity {
  private static readonly MAX_VALUE = 99;

  private constructor(private readonly value: number) {}

  public static createQuantity(value: number): Quantity {
    if (!Number.isInteger(value)) {
      throw new Error('Quantity must be an integer');
    }
    if (value <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (value > Quantity.MAX_VALUE) {
      throw new Error(`Quantity cannot exceed ${Quantity.MAX_VALUE}`);
    }
    return new Quantity(value);
  }

  public get displayValue(): number {
    return this.value;
  }

  public add(other: Quantity): Quantity {
    return Quantity.createQuantity(this.value + other.value);
  }

  public substract(other: Quantity): Quantity {
    if (this.value - other.value <= 0) {
      throw new Error(
        `Cannot substract ${other.value} from ${this.value}. Result must remain greater than 0.`,
      );
    }
    return Quantity.createQuantity(this.value - other.value);
  }

  public isEqual(other: Quantity): boolean {
    return this.value === other.value;
  }

  public isGreaterThan(other: Quantity): boolean {
    return this.value > other.value;
  }

  public isLessThan(other: Quantity): boolean {
    return this.value < other.value;
  }

  public isGreaterOrEqualTo(other: Quantity): boolean {
    return this.value >= other.value;
  }
}
