import React from "react";
import { Currency, CurrencyExchangeData } from "../types";
import { Await, useLoaderData } from "react-router-dom";
import { Flex, Text, Badge, Card, Skeleton } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { EmptyState } from "./EmptyState";
import currencyIcons from "./Icons";

interface CurrencyDisplayProps {
  currency: Currency;
  amount: number;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  currency,
  amount,
}) => (
  <Flex justify="between" align="center" gap="4">
    <Text
      size="6"
      weight="bold"
      style={{
        color: "#1f2937",
      }}
    >
      {amount.toFixed(2)}
    </Text>
    <Flex justify="center" align="center" gap="3">
      <Badge variant="solid" size="2">
        {currency.toUpperCase()}
      </Badge>
      <Avatar.Root>
        <Avatar.Image
          src={currencyIcons[currency]}
          alt={`${currency} icon`}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Avatar.Fallback
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          {currency.charAt(0).toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
    </Flex>
  </Flex>
);

const CurrencyDisplaySkeleton = () => (
  <Flex justify="between" align="center">
    <Skeleton width="80px" height="24px" />
    <Flex justify="center" align="center" gap="3">
      <Skeleton width="40px" height="20px" />
    </Flex>
  </Flex>
);

export const CurrencyExchangeTable = () => {
  const { data, isEmptyState } = useLoaderData() as {
    data: CurrencyExchangeData[];
    isEmptyState: boolean;
  };
  return (
    <React.Suspense
      fallback={
        <ScrollArea.Root style={{ height: "80vh", borderRadius: "8px" }}>
          <ScrollArea.Viewport
            style={{
              width: "100%",
              height: "100%",
              paddingRight: "12px",
            }}
          >
            <Flex direction="column" gap="4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} variant="classic" size="5">
                  <CurrencyDisplaySkeleton />
                </Card>
              ))}
            </Flex>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            style={{
              width: 8,
              background: "#e0e0e0",
              borderLeft: "2px solid #ccc",
            }}
          >
            <ScrollArea.Thumb
              style={{
                background: "#ffffff",
                borderRadius: "4px",
              }}
            />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      }
    >
      <Await resolve={data}>
        {(resolvedData: { currency: Currency; amount: number }[]) => (
          <ScrollArea.Root
            style={{ height: "80vh", borderRadius: "8px", margin: "16px" }}
          >
            <ScrollArea.Viewport
              style={{
                width: "100%",
                height: "100%",
                paddingRight: "12px",
              }}
            >
              {isEmptyState ? (
                <EmptyState />
              ) : (
                <Flex direction="column" gap="4">
                  {resolvedData.map(({ amount, currency }) => (
                    <Card key={currency} variant="classic" size="5">
                      <CurrencyDisplay amount={amount} currency={currency} />
                    </Card>
                  ))}
                </Flex>
              )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              style={{
                width: 8,
                background: "#e0e0e0",
                borderLeft: "2px solid #ccc",
              }}
            >
              <ScrollArea.Thumb
                style={{
                  background: "#ffffff",
                  borderRadius: "4px",
                }}
              />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        )}
      </Await>
    </React.Suspense>
  );
};
