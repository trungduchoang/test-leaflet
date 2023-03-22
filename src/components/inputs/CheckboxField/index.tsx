// libs
import { FocusEvent, ChangeEvent } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
// components
import CheckboxWithLabel, {
  TCheckboxWithLabelProps,
} from "../CheckboxWithLabel";

type TProps = Omit<TCheckboxWithLabelProps, "id" | "name"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // Add effects that run after native events is fired
  sideEffect?: {
    // Add effects that run after input value change
    afterChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    // Add effects that run after input is blured
    afterBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
  };
};
/**
 * CheckboxField
 * @example
 * <CheckboxField {...register("field-name")} label="Label" />
 */
const CheckboxField = ({ name, control, sideEffect, ...rest }: TProps) => {
  const { setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ref } }) => (
        <CheckboxWithLabel
          id={name}
          name={name}
          checked={value}
          onChange={(e) => {
            setValue(name, e.target.checked);
            if (sideEffect?.afterChange) sideEffect.afterChange(e);
          }}
          onBlur={(e) => {
            if (sideEffect?.afterBlur) sideEffect.afterBlur(e);
          }}
          ref={ref}
          {...rest}
        />
      )}
    />
  );
};

export default CheckboxField;
