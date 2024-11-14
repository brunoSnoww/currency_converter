import React from "react";
import { useTickerData } from "../hooks/useTickerData";
import { CurrencyExchangeData } from "../types";
import currencyIcons from "./Icons";

const CurrencyDisplay: React.FC<CurrencyExchangeData> = ({
  currency,
  amount,
}) => {
  // Construct path to icon based on currency

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}
    >
      <span>{amount.toFixed(2)}</span>
      <div>
        <span>{currency.toUpperCase()}</span>
        <img src={currencyIcons[currency]} />
      </div>
    </div>
  );
};

const Tables = () => {
  const { data } = useTickerData();
  return (
    <ul>
      {data?.map(({ currency, amount }) => (
        <li>
          <CurrencyDisplay amount={amount} currency={currency} />
        </li>
      ))}
    </ul>
  );
};

export const CurrencyExchangeTable = () => {
  return (
    <React.Suspense fallback={<div>fuuuuccckkk</div>}>
      <Tables />
    </React.Suspense>
  );
};
