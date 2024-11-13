import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import { Callback } from "./pages/callback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
]);
