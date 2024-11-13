import { useParams, useLocation, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Currency, CurrencyExchangeData, GetTickerAPIResponse } from "../types";
import { getTickerData } from "../mocks/tickerResponse";
import SDK from "@uphold/uphold-sdk-javascript";

type SDK = {
  getTicker: (currency: Currency) => Promise<GetTickerAPIResponse[]>;
};

let sdk: SDK;

export function getSdk() {
  if (!sdk)
    sdk = new SDK({
      baseUrl: "http://api-sandbox.uphold.com",
      clientId: "foo",
      clientSecret: "bar",
    });
  return sdk as SDK;
  /*return {
    getTicker: () => {
      return new Promise((r) => {
        setTimeout(() => r(getTickerData), 3000);
      });
    },
  } as SDK;*/
}

const processGetTickerAPIResponse = (
  amount: string,
  response: GetTickerAPIResponse[],
) => {
  return response.map((d) => ({
    currency: d.currency as Currency,
    amount: parseFloat(d.bid) * parseFloat(amount),
  })) as [];
};

export const getTickerQuery = (amount: string, currency: Currency) => ({
  queryKey: ["ticker", `${currency}`, `${amount}`],
  queryFn: () =>
    getSdk()
      .getTicker(currency)
      .then((res) => res.filter((d) => d.currency != currency))
      .then((res) => processGetTickerAPIResponse(amount, res)),
  staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  cacheTime: 1000 * 60 * 15, // Cache data stays in memory for 15 minutes
  refetchOnWindowFocus: true, // Refetch when the window gains focus
  suspense: true,
});

export const useTickerData = () => {
  const { currency } = useParams<{ currency: Currency }>(); // Extracts the currency from the URL path
  const location = useLocation(); // Gets the current location object
  const amount = new URLSearchParams(location.search).get("amount") || "0"; // Extracts the amount from query params
  return useQuery<CurrencyExchangeData[]>(
    getTickerQuery(amount, currency ?? Currency.USD),
  );
};
