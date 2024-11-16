export const getCalculatedRate = (currencyValue: number, inputAmount: number) =>
  (currencyValue * inputAmount).toFixed(4);

export const formatToNumber = (entry: string) => {
  return Number(entry.split(",").join(""));
};

export const isValid = (entry: string) => {
  const regexp = /^\d+(\.\d{1,2})?$/;
  return regexp.test(formatToNumber(entry).toString());
};

export const formatToLocaleString = (entry: string) => {
  // return empty string if input is empty
  if (entry.length === 0) {
    return "";
  }

  // check if input is valid
  if (!isValid(entry)) {
    throw new Error("The entry cannot be formatted. Invalid input string.");
  }

  // allow trailing dot for decimal input
  if (entry.slice(-1) === ".") {
    return entry;
  }

  return formatToNumber(entry).toLocaleString("en-US");
};
