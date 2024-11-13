import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { Currency } from "./types";
import { CurrencyExchangeTable } from "./components/CurrencyExchangeTable";
import { getTickerQuery } from "./hooks/useTickerData";
import { defer } from "react-router-dom";

export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <div>FUCK</div>,
      children: [
        {
          path: "/:currency",
          element: <CurrencyExchangeTable />,
          /*loader: async ({ params, request }) => {
            const currency = params.currency as Currency;
            const amount =
              new URL(request.url).searchParams.get("amount") || "0";
            const query = getTickerQuery(amount, currency);
            return (
              queryClient.getQueryData(query.queryKey) ??
              queryClient.fetchQuery(query)
            );
          },*/
        },
      ],
    },
  ]);
