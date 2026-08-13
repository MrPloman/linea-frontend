export const LETTER_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
export type LetterSize = (typeof LETTER_SIZES)[number];
export const SIZE_SYSTEM = ['letter', 'numeric-eu', 'shoe', 'unique'] as const;
export type SizeSystem = (typeof SIZE_SYSTEM)[number];
