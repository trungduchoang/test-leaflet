/**
 * focusErrorElement
 * @notes Using Mui-className (Mui-error) for searching error element
 */
export const focusErrorElement = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorElements = document.getElementsByClassName("Mui-error") as any;
  for (let i = 0; i < errorElements.length; i += 1) {
    if (errorElements[i].tagName === "LABEL") {
      errorElements[i].focus();
      return;
    }
  }
};
