// libs
import { FocusEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Control, Controller } from "react-hook-form";
// components
import SelectWithLabel, { TSelectWithLabelProps } from "../SelectWithLabel";

type TProps = Omit<TSelectWithLabelProps, "id" | "name"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // Add effects that run after native events is fired
  sideEffect?: {
    // Add effects that run after input value change
    afterChange?: (e: SelectChangeEvent<unknown>) => void;
    // Add effects that run after input is blured
    afterBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
};
/**
 * SelectField
 * @param hasEmptyOption
 * @example
 * <SelectField {...register("field-name")} label="Label">
 *  <MenuItem value="1">Item 1</MenuItem>
 * </SelectField>
 */
const SelectField = ({
  children,
  name,
  control,
  sideEffect,
  ...rest
}: TProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value, ref } }) => (
      <SelectWithLabel
        ref={ref}
        id={name}
        name={name}
        onChange={(e) => {
          onChange(e);
          if (sideEffect?.afterChange) sideEffect.afterChange(e);
        }}
        onBlur={(e) => {
          onBlur();
          if (sideEffect?.afterBlur) sideEffect.afterBlur(e);
        }}
        value={value}
        {...rest}
      >
        {children}
      </SelectWithLabel>
    )}
  />
);

export default SelectField;
