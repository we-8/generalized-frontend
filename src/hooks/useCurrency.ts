import { useMemo } from "react";

// Exchange rates relative to LKR (Sri Lankan Rupee)
const EXCHANGE_RATES = {
  LKR: 1,
  USD: 0.0034,
  EUR: 0.0031,
  AUD: 0.0049,
};

const CURRENCY_SYMBOLS = {
  LKR: "Rs.",
  USD: "$",
  EUR: "€",
  AUD: "A$",
};

export const useCurrency = (selectedCurrency: string) => {
  const exchangeRate =
    EXCHANGE_RATES[selectedCurrency as keyof typeof EXCHANGE_RATES] || 1;
  const currencySymbol =
    CURRENCY_SYMBOLS[selectedCurrency as keyof typeof CURRENCY_SYMBOLS] ||
    "Rs.";

  const convertFromLKR = useMemo(() => {
    return (lkrAmount: number): number => {
      return lkrAmount * exchangeRate;
    };
  }, [exchangeRate]);

  const convertToLKR = useMemo(() => {
    return (amount: number): number => {
      return amount / exchangeRate;
    };
  }, [exchangeRate]);

  const formatPrice = useMemo(() => {
    return (lkrAmount: number): string => {
      const convertedAmount = convertFromLKR(lkrAmount);
      return `${currencySymbol}${convertedAmount.toFixed(2)}`;
    };
  }, [convertFromLKR, currencySymbol]);

  return {
    convertFromLKR,
    convertToLKR,
    formatPrice,
    currencySymbol,
    exchangeRate,
  };
};
