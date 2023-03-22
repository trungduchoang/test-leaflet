// libs
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type TProps = Omit<
  AutocompleteProps<string, boolean, boolean, boolean>,
  "id" | "name" | "renderInput" | "options"
> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  options: string[];
  required?: boolean;
};
/**
 * AutoCompleteField
 * @param freeSolo - Allow free typing value in Input
 * @params ...rest AutoCompleteField's params
 * @example
 *  <AutoCompleteField
      {...register('field-name')}
      freeSolo
      label="Label"
      options={['option-1', 'option-2']}
    />
 */
export default function AutoCompleteField({
  name,
  control,
  label,
  required,
  ...rest
}: TProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              onChange={onChange}
            />
          )}
          ref={ref}
          onChange={(_, data) => onChange(data)}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
      )}
    />
  );
}
