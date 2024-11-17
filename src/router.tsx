import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import App from "./App";
import { CurrencyExchangeTable } from "./components/CurrencyExchangeTable";
import { tickerLoader } from "./loaders/tickerLoader";

export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <div>FUCK</div>,
      children: [
        {
          path: "/",
          element: <Navigate to="/USD" replace />, // Redirects to /USD if accessing root path
        },
        {
          path: "/:currency",
          element: <CurrencyExchangeTable />,
          loader: tickerLoader({ queryClient }),
        },
      ],
    },
  ]);
