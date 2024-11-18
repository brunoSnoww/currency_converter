import { LoaderFunctionArgs, redirect } from "react-router-dom";
import {
  Currency,
  CurrencyExchangeData,
  defaultCurrency,
  GetTickerAPIResponse,
} from "../types";
import { QueryClient } from "@tanstack/react-query";
import SDK from "@uphold/uphold-sdk-javascript";

const isCurrency = (value: string): value is Currency =>
  Object.values(Currency).includes(value as Currency);

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
  refetchOnWindowFocus: true,
  suspense: true,
});

export const tickerLoader =
  ({ queryClient }: { queryClient: QueryClient }) =>
    ({
      params,
      request,
    }: LoaderFunctionArgs<CurrencyExchangeData & { isEmptyState: boolean }>) => {
      const currency = params.currency || defaultCurrency;
      const amountParam = new URL(request.url).searchParams.get("amount") || "0";
      const isEmptyState = amountParam === "0";
      // Parse the amount and check for validity
      const amount = parseFloat(amountParam);
      if (isNaN(amount)) {
        // Redirect to the home page
        return redirect("/");
      }

      const query = getTickerQuery(currency as Currency);
      const tickerPromise: Promise<GetTickerAPIResponse[]> =
        queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query);
      const data = Promise.resolve(tickerPromise).then((res) =>
        res
          .filter((el) => el.currency != currency && isCurrency(el.currency))
          .map(({ currency, bid }) => ({
            currency,
            amount: parseFloat(bid) * amount,
          })),
      );
      return { data, isEmptyState };
    };
