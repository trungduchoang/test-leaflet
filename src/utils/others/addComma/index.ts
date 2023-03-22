/**
 * addComma
 * @description Convert 12345678... -> 12, 345, 678...
 * @param input
 */
export const addComma = (input: number | string | null | undefined) =>
  `${input ?? "0"}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
