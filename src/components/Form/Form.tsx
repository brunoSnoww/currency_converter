import { Box, Button, DropdownMenu, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import currencyIcons from "../Icons";
import { Currency } from "../../types";
import { useParams, useSearchParams } from "react-router-dom";

export const Form = ({
  onCurrencyChange,
  onAmountChange,
}: {
  onCurrencyChange: (currency: Currency, amount: string) => void;
  onAmountChange: (currency: Currency, amount: string) => void;
}) => {
  const [searchParams] = useSearchParams();

  // `amount` is a string or defaults to an empty string
  const amount: string = searchParams.get("amount") || "";
  const [inputValue, setInputValue] = useState(amount);

  const { currency: paramCurrency } = useParams<{ currency: string }>();
  const currencyI =
    paramCurrency &&
    Object.values(Currency).includes(paramCurrency.toUpperCase() as Currency)
      ? (paramCurrency.toUpperCase() as Currency)
      : Currency.USD;

  const [currency, setcurrency] = useState(currencyI);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      onAmountChange(currency, value);
    }
  };

  const handleCurrencyChange = (currencyI: Currency) => {
    setcurrency(currencyI);
    onCurrencyChange(currencyI, inputValue);
  };

  return (
    <Flex gap="3">
      <Box maxWidth="250px">
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
        <DropdownMenu.Content>
          {Object.values(Currency).map((currency) => (
            <DropdownMenu.Item
              key={currency}
              onClick={() => handleCurrencyChange(currency)}
            >
              <Flex justify="center" align="center" gap="1">
                <span>{currency.toUpperCase()}</span>
                <img
                  style={{ objectFit: "contain" }}
                  src={currencyIcons[currency]}
                  alt={`${currency} icon`}
                />
              </Flex>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};
