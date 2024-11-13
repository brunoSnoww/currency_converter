import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router(queryClient)} />
    </QueryClientProvider>
  </StrictMode>,
);
