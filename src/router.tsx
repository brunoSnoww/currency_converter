import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import App from "./App";
import { CurrencyExchangeTable } from "./components/CurrencyExchangeTable";
import { tickerLoader } from "./loaders/tickerLoader";
import { defaultCurrency } from "./types";
import { CurrencyErrorBoundary } from "./components/Error";

export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Navigate to={`${defaultCurrency}`} replace />, // Redirects to /USD if accessing root path
        },
        {
          path: "/:currency",
          element: <CurrencyExchangeTable />,
          loader: tickerLoader({ queryClient }),
          errorElement: <CurrencyErrorBoundary />,
        },
      ],
    },
  ]);
