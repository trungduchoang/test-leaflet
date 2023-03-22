// libs
import clsx from "clsx";
import { KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
// others
import classes from "./InputField.module.scss";

type TProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  onPressEnter?: (e: KeyboardEvent<HTMLDivElement>) => void;
  // Add effects that run after native events is fired
  sideEffect?: {
    // Add effects that run after input value change
    afterChange?: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    // Add effects that run after input is blured
    afterBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
} & TextFieldProps;
/**
 * InputField
 * @example
 * <InputField {...register("field-name")} label="Label" />
 */
const InputField = ({
  name,
  control,
  className,
  onPressEnter,
  onKeyPress,
  helperText,
  sideEffect,
  ...rest
}: TProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error: { message: fieldErrorMsg = "" } = {} },
      }) => (
        <TextField
          ref={ref}
          name={name}
          error={!!fieldErrorMsg}
          onChange={(e) => {
            onChange(e);
            if (sideEffect?.afterChange) sideEffect.afterChange(e);
          }}
          onBlur={(e) => {
            onBlur();
            if (sideEffect?.afterBlur) sideEffect.afterBlur(e);
          }}
          value={value}
          className={clsx(classes.root, className)}
          onKeyPress={overridedOnKeyPress}
          helperText={<HelperTextAndErrorMsg fieldErrorMsg={fieldErrorMsg} />}
          {...rest}
        />
      )}
    />
  );

  function overridedOnKeyPress(e: KeyboardEvent<HTMLDivElement>) {
    // TODO: Make a default onPressEnter that focus next input
    if (e.key === "Enter" && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyPress) onKeyPress(e);
  }
  function HelperTextAndErrorMsg({
    fieldErrorMsg,
  }: {
    fieldErrorMsg?: string;
  }) {
    return (
      <>
        {fieldErrorMsg && (
          <>
            <span style={{ color: "#f71010" }}>{fieldErrorMsg}</span>
            <br />
          </>
        )}
        {helperText}
      </>
    );
  }
};

export default InputField;
