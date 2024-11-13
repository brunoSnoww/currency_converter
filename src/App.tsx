import "./App.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

export default App;
