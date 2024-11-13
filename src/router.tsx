import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import { getTickerQuery } from "./utils/uphold-sdk";
import { CurrencyExchangeTable } from "./pages/CurrencyExchangeTable";
import { QueryClient } from "@tanstack/react-query";
import { Currency } from "./types";

export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/:currency",
          element: <CurrencyExchangeTable />,
          loader: async ({ params, request }) => {
            const currency = params.currency as Currency;
            const amount =
              new URL(request.url).searchParams.get("amount") || "0";
            const query = getTickerQuery(amount, currency);
            let p =
              queryClient.getQueryData(query.queryKey) ??
              (await queryClient.fetchQuery(query));
            console.log(p);
            return p;
          },
        },
      ],
    },
  ]);
