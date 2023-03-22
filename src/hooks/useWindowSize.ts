// libs
import { useEffect, useState } from "react";
import { useDebounceFn } from "./debounceAndThrottle/useDebounceFn";

type WindowSize = {
  width: number;
  height: number;
};
/**
 * useWindowSize
 * @returns { width: number | 0, height: number | 0 }
 * @description Retrieve window dimensions onResize
 * @see https://usehooks-typescript.com/react-hook/use-window-size
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());

  const [updateWindowSize] = useDebounceFn(() => {
    setWindowSize(getWindowSize());
  });

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return windowSize;
}

/**
 * getWindowSize
 * @returns { width: number | 0, height: number | 0 }
 */
function getWindowSize() {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return {
    width: 0,
    height: 0,
  };
}
