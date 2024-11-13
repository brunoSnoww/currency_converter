import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTickerQuery } from "../utils/uphold-sdk";
import { Currency, GetTickerAPIResponse } from "../types";

export const useTickerData = () => {
  const { currency } = useParams<{ currency: Currency }>(); // Extracts the currency from the URL path
  const location = useLocation(); // Gets the current location object
  const amount = new URLSearchParams(location.search).get("amount") || "0"; // Extracts the amount from query params
  return useQuery<GetTickerAPIResponse[]>(
    getTickerQuery(amount, currency ?? Currency.USD),
  );
};
