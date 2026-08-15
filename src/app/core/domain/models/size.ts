import { LETTER_SIZES, LetterSize, SIZE_SYSTEM, SizeSystem } from '../types/systemSize';

export class Size {
  private constructor(
    private readonly system: SizeSystem,
    private readonly value: string | number,
  ) {}

  static createSize(system: SizeSystem, rawValue: string | number) {
    if (!system || !SIZE_SYSTEM.includes(system)) throw new Error('Valid system value is required');
    switch (system) {
      case 'letter':
        if (typeof rawValue !== 'string' || !LETTER_SIZES.includes(rawValue as LetterSize))
          throw new Error(
            `Invalid letter size: "${rawValue}". Expected one of ${LETTER_SIZES.join(', ')}`,
          );

        return new Size(system, rawValue);

      case 'numeric-eu':
        if (
          typeof rawValue !== 'number' ||
          !Number.isInteger(rawValue) ||
          (rawValue as number) % 2 !== 0 ||
          rawValue < 36 ||
          rawValue > 70
        )
          throw new Error(
            `Invalid numeric size: "${rawValue}". Expected an even number between 36 and 70}`,
          );
        return new Size(system, rawValue);

      case 'shoe':
        if (
          typeof rawValue !== 'number' ||
          !Number.isInteger(rawValue) ||
          (rawValue as number) < 18 ||
          (rawValue as number) > 50
        ) {
          throw new Error(
            `Invalid numeric shoe size: "${rawValue}". Expected a number between 18 and 50}`,
          );
        }
        return new Size(system, rawValue);

      case 'unique':
        return new Size(system, rawValue);

      default: {
        const _exhaustiveCheck: never = system;
        return _exhaustiveCheck;
      }
    }
  }
  public isEqual(other: Size): boolean {
    return this.system === other.system && this.value === other.value;
  }
  public get displayValue(): string {
    return `${this.value}`;
  }
}
