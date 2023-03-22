// libs
import { useSelector } from "react-redux";
// types
import { TPageReducer, TRootReducer } from "@/configs/redux";

type TSelector = {
  <TSelected>(
    selector: (state: TRootReducer) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
};
type ReturnType<
  TPageName extends TPageReducer,
  TReducerName extends keyof TRootReducer[TPageName],
> = TRootReducer[TPageName][TReducerName];
type TEqualityFn<
  TPageName extends TPageReducer,
  TReducerName extends keyof TRootReducer[TPageName],
> = (
  left: ReturnType<TPageName, TReducerName>,
  right: ReturnType<TPageName, TReducerName>
) => boolean;

const useTypedSelector: TSelector = useSelector;

/**
 * useStore
 * @description Extract reducer states and add shallow compare
 * @param pageName
 * @param reducerName
 * @param equalityFn
 */
export const useStore = <
  TPageName extends TPageReducer,
  TReducerName extends keyof TRootReducer[TPageName],
>(
  pageName: TPageName,
  reducerName: TReducerName,
  equalityFn?: TEqualityFn<TPageName, TReducerName>,
): ReturnType<TPageName, TReducerName> =>
  useTypedSelector(
    (state) => (state[pageName] as TRootReducer[TPageName])[reducerName],
    // Default using shallow compare for reducing re-render
    equalityFn || ((prev, next) => prev === next),
  );
