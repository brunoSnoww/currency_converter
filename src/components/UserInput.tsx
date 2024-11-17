import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Currency, defaultCurrency } from "../types";
import currencyIcons from "./Icons";

export const UserInput = ({
  onCurrencyChange,
  onAmountChange,
}: {
  onCurrencyChange: (currency: Currency, amount: string) => void;
  onAmountChange: (currency: Currency, amount: string) => void;
}) => {
  const [searchParams] = useSearchParams();

  const amount: string = searchParams.get("amount") || "";
  const [inputValue, setInputValue] = useState(amount);

  const { currency: paramCurrency } = useParams<{ currency: string }>();
  const currencyInitial =
    paramCurrency &&
    Object.values(Currency).includes(paramCurrency.toUpperCase() as Currency)
      ? (paramCurrency.toUpperCase() as Currency)
      : defaultCurrency;

  const [currency, setcurrency] = useState<Currency>(currencyInitial);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      onAmountChange(currency, value);
    }
  };

  const handleCurrencyChange = (currency: Currency) => {
    setcurrency(currency);
    onCurrencyChange(currency, inputValue);
  };

  return (
    <Flex gap="3" justify="between">
      <Box minWidth="24rem">
        <TextField.Root
          size="2"
          placeholder="Enter numbers only"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            {currency}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          sideOffset={5}
          style={{
            padding: "8px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {Object.values(Currency).map((currency) => (
            <DropdownMenu.Item
              key={currency}
              onClick={() => handleCurrencyChange(currency)}
              style={{
                padding: "10px 15px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Flex justify="start" align="center" gap="2">
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    backgroundColor: "#e5e7eb",
                  }}
                  src={currencyIcons[currency]}
                  alt={`${currency} icon`}
                />
                <Text size="3" weight="medium" color="gray">
                  {currency.toUpperCase()}
                </Text>
              </Flex>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};
