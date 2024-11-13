import { Currency, CurrencyExchangeData, GetTickerAPIResponse } from "./types";

function shuffle(array: any) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
export const processGetTickerAPIResponse = (
  amount: string,
  response: GetTickerAPIResponse[],
) => {
  shuffle(response);
  return response.map((d) => ({
    exchangedCurrency: d.pair.substring(0, 3) as Currency,
    amount: parseFloat(d.bid) * parseFloat(amount),
  })) as CurrencyExchangeData[];
};
