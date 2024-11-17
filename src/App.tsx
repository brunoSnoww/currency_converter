import { useNavigate, Outlet } from "react-router-dom";
import { useDebounce } from "./hooks/useDebounce";
import { Currency } from "./types";
import { Flex } from "@radix-ui/themes";
import { Form } from "./components/Form/Form";

function App() {
  const navigate = useNavigate();

  const redirect = (currency: Currency, value: string) =>
    navigate(`/${currency}?amount=${value}`);

  const debouncedRedirect = useDebounce((currency: Currency, value: string) => {
    if (value) {
      redirect(currency, value);
    }
  }, 500); // Adjust debounce delay as needed

  return (
    <Flex
      width="100vw"
      height="100vh"
      justify="center"
      align="center"
      direction="column"
    >
      <div style={{ minWidth: "20%" }}>
        <Form onCurrencyChange={redirect} onAmountChange={debouncedRedirect} />
        <Outlet />
      </div>
    </Flex>
  );
}

export default App;
