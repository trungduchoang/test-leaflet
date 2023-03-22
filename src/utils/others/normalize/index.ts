/**
 * normalize - Normalize Array
 * @description Normalize first nested of [Object, ...]
 * @param input - Array Input
 * @param key - Primary key name
 */
export function normalize(input: TObject[], key: string) {
  return input.reduce(
    ({ result: accResult, keys: accKeys }, current) => {
      const currentKey = current[key];

      return {
        result: { ...accResult, [currentKey]: current },
        keys: [...accKeys, `${currentKey}`],
      };
    },
    { result: {}, keys: [] },
  ) as { result: TObject; keys: string[] };
}
