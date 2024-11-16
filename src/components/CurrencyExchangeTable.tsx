import React from "react";
import { CurrencyExchangeData } from "../types";
import currencyIcons from "./Icons";
import { Await, useLoaderData } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

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
  const { data } = useLoaderData() as any;
  return (
    <React.Suspense fallback={<div>fuuuuccckkk</div>}>
      <Await resolve={data}>
        {(data) => (
          <Flex direction="column" gap="5" overflow="scroll" maxHeight="50vh">
            {data?.map(({ currency, amount }) => (
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
