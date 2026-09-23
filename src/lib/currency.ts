const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "AED ",
  AUD: "A$",
  CAD: "C$",
};

export function formatPrice(amount: number, currency: string = "INR"): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
  return `${symbol}${amount.toLocaleString("en-IN")}`;
}

export const SUPPORTED_CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED", "AUD", "CAD"];
