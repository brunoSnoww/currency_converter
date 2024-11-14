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

function isCurrency(value: string): value is Currency {
  return Object.values(Currency).includes(value as Currency);
}

export const getTickerQuery = (amount: string, currency_from: Currency) => ({
  queryKey: ["ticker", `${currency_from}`, `${amount}`],
  queryFn: async () => {
    const getTickerResponse = await getSdk().getTicker(currency_from);
    return getTickerResponse
      .filter(
        ({ currency }) => currency != currency_from && isCurrency(currency),
      )
      .map(({ currency, bid }) => ({
        currency,
        amount: parseFloat(bid) * parseFloat(amount),
      })) as [];
  },
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 15,
  refetchOnWindowFocus: true,
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
