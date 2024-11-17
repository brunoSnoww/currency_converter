import React from "react";
import { Currency, CurrencyExchangeData } from "../types";
import currencyIcons from "./Icons";
import { Await, useLoaderData } from "react-router-dom";
import { Flex } from "@radix-ui/themes";
import { tickerLoader } from "../loaders/tickerLoader";

const CurrencyDisplay: React.FC<CurrencyExchangeData> = ({
  currency,
  amount,
}) => (
  <Flex justify="between">
    <span>{amount.toFixed(2)}</span>
    <Flex justify="center" align="center" gap="1">
      <span>{currency.toUpperCase()}</span>
      <img src={currencyIcons[currency]} />
    </Flex>
  </Flex>
);

export const CurrencyExchangeTable = () => {
  const { data } = useLoaderData() as { data: ReturnType<typeof tickerLoader> };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data}>
        {(resolvedData: { currency: Currency; amount: number }[]) => (
          <Flex direction="column" gap="5" overflow="scroll" maxHeight="50vh">
            {resolvedData.map(({ amount, currency }) => (
              <div key={currency}>
                <CurrencyDisplay amount={amount} currency={currency} />
              </div>
            ))}
          </Flex>
        )}
      </Await>
    </React.Suspense>
  );
};
