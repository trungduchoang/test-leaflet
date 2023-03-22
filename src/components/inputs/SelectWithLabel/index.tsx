// libs
import { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import clsx from "clsx";
// others
import classes from "./SelectWithLabel.module.scss";

export type TSelectWithLabelProps = {
  children: ReactNode | ReactNode[];
  helperText?: ReactNode;
  hasEmptyOption?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & SelectProps<any>;
/**
 * SelectWithLabel
 * @example
 * <SelectWithLabel label="Label">
 *  <MenuItem value="1">Item 1</MenuItem>
 * </SelectWithLabel>
 * @notes <SelectWithLabel {...register("name")}> will NOT working properly due to Mui-Select is controlled component
 * @notes Test on Mui@5.3.0
 * @notes Should use @/components/inputs/SelectField
 */
const SelectWithLabel = forwardRef(
  (
    {
      className,
      name,
      label,
      children,
      size = "small",
      helperText,
      hasEmptyOption = false,
      required,
      ...rest
    }: TSelectWithLabelProps,
    ref: ForwardedRef<unknown>,
  ) => (
    <FormControl
      className={clsx(classes.root, size === "small" && classes.fixLabel)}
    >
      <InputLabel id={name} required={required}>
        {label}
      </InputLabel>
      <Select
        ref={ref}
        className={className}
        labelId={name}
        label={label}
        size={size}
        name={name}
        {...rest}
      >
        {hasEmptyOption && <MenuItem value="">None</MenuItem>}
        {children}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  ),
);

export default SelectWithLabel;
