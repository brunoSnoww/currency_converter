// Define a type for the currency data structure
export type GetTickerAPIResponse = {
  ask: string;
  bid: string;
  currency: Currency;
  pair: string;
};

export type CurrencyExchangeData = Pick<GetTickerAPIResponse, "currency"> & {
  amount: number;
};

export enum Currency {
  AED = "AED",
  ARS = "ARS",
  AUD = "AUD",
  BAT = "BAT",
  BCH = "BCH",
  BRL = "BRL",
  BTC = "BTC",
  BTG = "BTG",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  DASH = "DASH",
  DKK = "DKK",
  ETH = "ETH",
  EUR = "EUR",
  GBP = "GBP",
  HKD = "HKD",
  ILS = "ILS",
  INR = "INR",
  JPY = "JPY",
  KES = "KES",
  LBA = "LBA",
  LTC = "LTC",
  MXN = "MXN",
  NOK = "NOK",
  NZD = "NZD",
  PHP = "PHP",
  PLN = "PLN",
  SEK = "SEK",
  SGD = "SGD",
  USD = "USD",
  VOX = "VOX",
  XAG = "XAG",
  XAU = "XAU",
  XPD = "XPD",
  XPT = "XPT",
  XRP = "XRP",
}
