import { useNavigate, Outlet } from "react-router-dom";
import { useDebounce } from "./hooks/useDebounce";
import { Currency } from "./types";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { UserInput } from "./components/UserInput";

function App() {
  const navigate = useNavigate();

  const redirect = (currency: Currency, value: string) =>
    navigate(`/${currency}?amount=${value}`);

  const debouncedRedirect = useDebounce((currency: Currency, value: string) => {
    redirect(currency, value);
  }, 500);

  return (
    <Flex
      width="100vw"
      justify="center"
      align="center"
      direction="column"
      gap="4"
    >
      <Flex direction="column" align="center" gap="6">
        <Heading size="4" mb="6">
          Currency Converter
        </Heading>
        <Text
          size="3"
          color="gray"
          style={{
            maxWidth: "32rem",
            textAlign: "center",
          }}
        >
          Receive competitive and transparent pricing with no hidden spreads.
          See how we compare.
        </Text>
      </Flex>
      <div style={{ minWidth: "32rem" }}>
        <UserInput
          onCurrencyChange={redirect}
          onAmountChange={debouncedRedirect}
        />
        <br />
        <Outlet />
      </div>
    </Flex>
  );
}

export default App;
