/* eslint-disable @typescript-eslint/no-explicit-any */
// libs
import { useCallback, useEffect, useRef } from "react";
// hooks
import { useUpdateEffect } from "../useUpdateEffect";

/**
 * useDebounceFn
 * @see https://github.com/umijs/hooks/blob/master/packages/hooks/src/useDebounceFn/index.ts
 * @param fn
 * @param deps
 * @param wait
 * @example
 * const [debouncedFn] = useDebounceFn(() => { console.log("example"); })
 */
export const useDebounceFn = (
  fn: (...props: any) => void,
  wait = 300,
  deps = [],
) => {
  const timer = useRef<any>();

  const fnRef = useRef<(...props: any) => void>(fn);
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const execute = useCallback(
    (...args: any) => {
      cancel();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, wait);
    },
    [wait, cancel],
  );

  useUpdateEffect(() => {
    execute();

    return cancel;
  }, [...deps, execute]);

  useEffect(() => cancel, []);

  return [execute, cancel];
};
