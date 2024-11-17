import { LoaderFunctionArgs } from "react-router-dom";
import { Currency, CurrencyExchangeData, GetTickerAPIResponse } from "../types";
import { QueryClient } from "@tanstack/react-query";
import SDK from "@uphold/uphold-sdk-javascript";

export function isCurrency(value: string): value is Currency {
  return Object.values(Currency).includes(value as Currency);
}

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

const getTickerQuery = (currency: Currency) => ({
  queryKey: ["ticker", `${currency}`],
  queryFn: () => getSdk().getTicker(currency),
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 15,
  refetchOnWindowFocus: true,
  suspense: true,
});

export const tickerLoader =
  ({ queryClient }: { queryClient: QueryClient }) =>
  ({ params, request }: LoaderFunctionArgs<CurrencyExchangeData>) => {
    const currency = params.currency || "USD"; // Default to USD
    const amount = new URL(request.url).searchParams.get("amount") || "0";
    const query = getTickerQuery(currency as Currency);
    const tickerPromise: Promise<GetTickerAPIResponse[]> =
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query);

    const data = Promise.resolve(tickerPromise).then((res) =>
      res
        .filter((el) => el.currency != currency && isCurrency(el.currency))
        .map(({ currency, bid }) => ({
          currency,
          amount: parseFloat(bid) * parseFloat(amount),
        })),
    );
    return { data };
  };
