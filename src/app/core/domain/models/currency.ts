export const SUPPORTED_CURRENCIES = ['EUR'] as const;

export type Currency = (typeof SUPPORTED_CURRENCIES)[number];
