export class StockQuantity {
  private constructor(private readonly quantity: number) {}

  public static createStockQuantity(quantity: number) {
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0) {
      throw new Error(`Invalid numeric quantity: "${quantity}". No negative numbers allowed`);
    }
    return new StockQuantity(quantity);
  }

  public add(otherQuantity: StockQuantity): StockQuantity {
    return StockQuantity.createStockQuantity(this.quantity + otherQuantity.quantity);
  }

  public substract(otherQuantity: StockQuantity): StockQuantity {
    if (this.quantity < otherQuantity.quantity) {
      throw new Error(
        `Cannot substract ${otherQuantity.quantity} from ${this.quantity}. Result would be negative`,
      );
    }
    return StockQuantity.createStockQuantity(this.quantity - otherQuantity.quantity);
  }
  public oneMore(): StockQuantity {
    return this.add(StockQuantity.createStockQuantity(1));
  }

  public oneLess(): StockQuantity {
    return this.substract(StockQuantity.createStockQuantity(1));
  }
  public isLowStock(threshold: number): boolean {
    if (typeof threshold !== 'number' || !Number.isInteger(threshold) || threshold < 0) {
      throw new Error(`Invalid numeric threshold: "${threshold}". No negative numbers allowed`);
    }
    return this.quantity <= threshold;
  }

  public isEqual(other: StockQuantity): boolean {
    return this.quantity === other.quantity;
  }

  get displayValue(): number {
    return this.quantity;
  }
}
