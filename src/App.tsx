import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  // Debounced function to update the URL
  const debouncedRedirect = useDebounce((value: string) => {
    if (value) {
      navigate(`?amount=${value}`);
    }
  }, 500); // Adjust debounce delay as needed

  // Handle input change and trigger the debounced redirect
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    debouncedRedirect(value); // Call the debounced function with the current input value
  };

  return (
    <div>
      <label htmlFor="amount">Amount</label>
      <input
        type="text"
        value={amount}
        id="amount"
        onChange={handleChange}
        required
      />
      <Outlet />
    </div>
  );
}

export default App;
