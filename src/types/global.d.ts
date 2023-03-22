/**
 * Values of Object
 * (Like TS keyof but get values instead)
 * @note This is not support Array
 * @example For Array:
 * const fruits = ["Apple", "Orange", "Pear"] as const;
 * type Fruits = typeof fruits[number]; // "Apple" | "Orange" | "Pear"
 */
type ValueOf<T> = T[keyof T];

/**
 * Reveal Object properties type recursively
 */
type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T;

/**
 * Reveal Object properties type only first nested
 */
type ShallowExpand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

/**
 * ObjectType
 * @param PropertiesType = any
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TObject<PropertiesType = any> {
  [key: string]: PropertiesType;
}

/**
 * EmptyObject
 */
type EmptyObject = {
  [K in never]: never;
};
