import "./App.css";
// @deno-types="@types/react"
import { useState } from "react";
// @ts-expect-error Unable to infer type at the moment
import reactLogo from "./assets/react.svg";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return <>Hello</>;
}

export default App;
