import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
