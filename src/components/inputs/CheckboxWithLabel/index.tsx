// libs
import clsx from "clsx";
import { Checkbox, CheckboxProps } from "@mui/material";
import { ForwardedRef, forwardRef, ReactNode } from "react";
// others
import classes from "./CheckboxWithLabel.module.scss";

export type TCheckboxWithLabelProps = {
  id: string;
  label?: ReactNode;
  wrapperClass?: string;
} & CheckboxProps;
/**
 * CheckboxWithLabel
 * @example
 *  <CheckboxWithLabel
      label="Label"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
 */
const CheckboxWithLabel = forwardRef(
  (
    {
      wrapperClass,
      className,
      id,
      label,
      checked,
      ...rest
    }: TCheckboxWithLabelProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <div className={clsx(classes.root, wrapperClass)}>
      <Checkbox
        // Why a key is needed here? https://stackoverflow.com/a/39392838
        key={`${checked}${Math.random()}`}
        ref={ref}
        id={id}
        className={className}
        {...rest}
      />
      <label htmlFor={id} style={{ cursor: "pointer" }}>
        {label}
      </label>
    </div>
  ),
);

export default CheckboxWithLabel;
