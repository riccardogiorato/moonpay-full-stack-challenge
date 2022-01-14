import { motion } from "framer-motion";
import React from "react";
import { MoonpayCurrency } from "../pages";

export interface CurrencyProps {
  currency: MoonpayCurrency;
}

export const CurrencyCard: React.FC<CurrencyProps> = ({
  currency,
  ...props
}) => {
  const currencyCoinMarketCapName = currency.name
    .toLowerCase()
    .split("(")[0]
    .trim()
    .split(" ")
    .join("-");
  return (
    <motion.a
      href={`https://coinmarketcap.com/currencies/${currencyCoinMarketCapName}/`}
      key={currency.id}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
      layout
      {...props}
    >
      <h3>{currency.name}</h3>
      <p>Symbol: {currency.code}</p>
      <p>USA: {currency.isSupportedInUS ? "✔️" : "❌"} </p>
      <p>Test Mode: {currency.supportsTestMode ? "✔️" : "❌"} </p>
    </motion.a>
  );
};
