import { useNavigate, Outlet } from "react-router-dom";
import { useDebounce } from "./hooks/useDebounce";
import { Currency } from "./types";
import { Flex } from "@radix-ui/themes";
import { Form } from "./components/Form/Form";

function App() {
  const navigate = useNavigate();

  const debouncedRedirect = useDebounce((currency: Currency, value: string) => {
    if (value) {
      navigate(`/${currency}?amount=${value}`);
    }
  }, 500); // Adjust debounce delay as needed

  const handleChange = (currency: Currency, amount: string) => {
    debouncedRedirect(currency, amount); // Call the debounced function with the current input value
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      justify="center"
      align="center"
      direction="column"
    >
      <div style={{ minWidth: "20%" }}>
        <Form
          onCurrencyChange={(currency: Currency, amount: string) => {
            navigate(`/${currency}?amount=${amount}`);
          }}
          onAmountChange={handleChange}
        />
      </div>
      <Outlet />
    </Flex>
  );
}

export default App;
