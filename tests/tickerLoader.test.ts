// tickerLoader.test.ts
import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { Currency, GetTickerAPIResponse } from "../src/types";
import { describe, expect, vi } from "vitest";
import { tickerLoader } from "../src/loaders/tickerLoader";
vi.mock("react-router-dom", () => ({
  ...vi.importActual<typeof import("react-router-dom")>("react-router-dom"),
  redirect: vi.fn(),
}));

describe("tickerLoader", () => {
  const mockQueryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('redirects to "/" when amount is invalid', async () => {
    const loader = tickerLoader({ queryClient: mockQueryClient });

    const args: LoaderFunctionArgs = {
      params: { currency: Currency.USD },
      request: new Request("http://localhost/USD?amount=invalid"),
    };
    //@ts-expect-error todo: type the following loc
    const { data, isEmptyState } = loader(args);

    expect(isEmptyState).toBe(false);
    await data;
    expect(redirect).toHaveBeenCalledWith("/");
  });

  test("returns data when amount is valid", async () => {
    const loader = tickerLoader({ queryClient: mockQueryClient });

    const mockData: GetTickerAPIResponse[] = [
      { currency: Currency.EUR, bid: "0.85", ask: "0.70", pair: "pair" },
      { currency: Currency.GBP, bid: "0.75", ask: "0.69", pair: "par" },
    ];

    vi.spyOn(mockQueryClient, "fetchQuery").mockResolvedValue(mockData);

    const args: LoaderFunctionArgs = {
      params: { currency: Currency.USD },
      request: new Request("http://localhost/USD?amount=100"),
    };

    const result = loader(args);

    //@ts-expect-error todo: type the following loc
    const { data, isEmptyState } = result;

    const resolvedData = await data;

    expect(isEmptyState).toBe(false);
    expect(resolvedData).toEqual([
      { currency: Currency.EUR, amount: 85 },
      { currency: Currency.GBP, amount: 75 },
    ]);
  });
});
