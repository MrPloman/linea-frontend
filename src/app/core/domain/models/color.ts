// color.ts
export const AVAILABLE_COLORS = [
  'black',
  'white',
  'beige',
  'blue',
  'red',
  'green',
  'grey',
  'brown',
  'pink',
  'stone',
] as const;

export type ColorValue = (typeof AVAILABLE_COLORS)[number];

export class Color {
  private constructor(private readonly value: ColorValue) {}

  public static createColor(rawValue: string): Color {
    const normalized = rawValue.trim().toLowerCase() as ColorValue;

    if (!AVAILABLE_COLORS.includes(normalized)) {
      throw new Error(
        `Invalid color: "${rawValue}". Expected one of ${AVAILABLE_COLORS.join(', ')}`,
      );
    }

    return new Color(normalized);
  }

  public get displayValue(): ColorValue {
    return this.value;
  }

  public isEqual(other: Color): boolean {
    return this.value === other.value;
  }
}
