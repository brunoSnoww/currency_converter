import React from "react";
import { useTickerData } from "../hooks/useTickerData";

const Tables = () => {
  const { data } = useTickerData();
  return (
    <ul>
      {data?.map((value) => (
        <li>
          <div style={{ display: "flex", gap: "8px" }}>
            <p>{value.exchangedCurrency}</p>
            <p>{value.amount}</p>
          </div>
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
