import SDK from "@uphold/uphold-sdk-javascript";
import { Currency, GetTickerAPIResponse } from "../types";
import { getTickerData } from "../mocks/tickerResponse";
import { processGetTickerAPIResponse } from "../utils";

type SDK = {
  getTicker: (currency: Currency) => Promise<GetTickerAPIResponse[]>;
};

let sdk: SDK;

export function getSdk() {
  /*if (!sdk)
    sdk = new SDK({
      baseUrl: "http://api-sandbox.uphold.com",
      clientId: "foo",
      clientSecret: "bar",
    });*/
  return {
    getTicker: () => {
      return new Promise((r) => {
        setTimeout(() => r(getTickerData), 1000);
      });
    },
  } as SDK;
}

export const getTickerQuery = (amount: string, currency: Currency) => ({
  queryKey: ["ticker", `${currency}`, `${amount}`],
  queryFn: () =>
    getSdk()
      .getTicker(currency)
      .then((res) => processGetTickerAPIResponse(amount, res)),
});
