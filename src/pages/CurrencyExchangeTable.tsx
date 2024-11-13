import { useLoaderData } from "react-router-dom";
import React from "react";
import { CurrencyExchangeData } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useTickerData } from "../hooks/useTickerData";

export const CurrencyExchangeTable = () => {
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
