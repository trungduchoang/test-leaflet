// libs
import { useEffect, useState } from "react";

/**
 * useDOMEffect
 * @description Add effect that runs only when DOM is initialized
 * @param effect
 */
export const useDOMEffect = (effect: () => void) => {
  const [hasDOM, setHasDOM] = useState(false);

  useEffect(() => {
    if (hasDOM) {
      effect();
    } else {
      setHasDOM(true);
    }
  }, [hasDOM]);
};
