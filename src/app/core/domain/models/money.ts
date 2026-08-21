// money.ts
import { Currency, SUPPORTED_CURRENCIES } from '../types/currency';

export class Money {
  private constructor(
    private readonly amountInCents: number,
    private readonly currency: Currency,
  ) {}

  public static createMoney(value: number, currency: Currency): Money {
    if (value < 0) throw new Error('Amount cannot be negative');
    if (!Number.isInteger(value)) throw new Error('Amount must be an integer (cents)');
    if (!SUPPORTED_CURRENCIES.includes(currency)) throw new Error('Unsupported currency');
    return new Money(value, currency);
  }

  public add(otherMoney: Money): Money {
    if (this.currency !== otherMoney.currency) {
      throw new Error(
        `Cannot add Money with different currencies: ${this.currency} vs ${otherMoney.currency}`,
      );
    }
    return Money.createMoney(this.amountInCents + otherMoney.amountInCents, this.currency);
  }

  public subtract(otherMoney: Money) {
    if (this.currency !== otherMoney.currency) {
      throw new Error(
        `Cannot add Money with different currencies: ${this.currency} vs ${otherMoney.currency}`,
      );
    }
    return Money.createMoney(this.amountInCents - otherMoney.amountInCents, this.currency);
  }

  public multiply(factor: number): Money {
    return Money.createMoney(Math.round(this.amountInCents * factor), this.currency);
  }
  public divide(factor: number): Money {
    if (factor <= 0) throw new Error('Factor divider must be greater than 0');
    return Money.createMoney(Math.round(this.amountInCents / factor), this.currency);
  }

  public toDisplayString(): string {
    return (this.amountInCents / 100).toFixed(2);
  }

  public toDisplayStringAndCurrency(): string {
    return `${this.toDisplayString()} ${this.currencyValue}`;
  }

  public isEqual(otherMoney: Money): boolean {
    return this.amountInCents === otherMoney.amountInCents && this.currency === otherMoney.currency;
  }

  public isZero(): boolean {
    return this.amountInCents === 0;
  }

  public isGreaterThanZero(): boolean {
    return this.amountInCents > 0;
  }

  public percentageValue(percentage: number) {
    const vatAmount = Math.round((this.amountInCents * percentage) / 100);
    return Money.createMoney(vatAmount, this.currency);
  }

  public isGreaterOrEqualTo(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error(
        `Cannot compare Money with different currencies: ${this.currency} vs ${other.currency}`,
      );
    }
    return this.amountInCents >= other.amountInCents;
  }
  public get currencyValue() {
    return this.currency;
  }
}
