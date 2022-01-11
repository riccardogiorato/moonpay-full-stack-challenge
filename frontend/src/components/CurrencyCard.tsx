import React from "react";
import { MoonpayCurrency } from "../pages";

export interface CurrencyProps {
  currency: MoonpayCurrency;
}

export const CurrencyCard: React.FC<CurrencyProps> = ({ currency }) => {
  const currencyCoinMarketCapName = currency.name
    .toLowerCase()
    .split("(")[0]
    .trim()
    .split(" ")
    .join("-");
  return (
    <a
      href={`https://coinmarketcap.com/currencies/${currencyCoinMarketCapName}/`}
      key={currency.id}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
    >
      <h3>{currency.name}</h3>
      <p>{currency.code}</p>
      <p>🇺🇸: {currency.isSupportedInUS ? "✔️" : "❌"} </p>
      <p>test: {currency.supportsTestMode ? "✔️" : "❌"} </p>
    </a>
  );
};
