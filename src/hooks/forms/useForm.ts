// libs
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  PathValue,
  SetValueConfig,
  UnpackNestedValue,
  useFormContext,
} from "react-hook-form";
// types
import { TAllFormValues } from "@/react-hook-form/types";
// others
import { focusErrorElement } from "@/utils/others";
import { notify } from "@/utils/notify";

type TPages = keyof TAllFormValues;
type TFieldName<TFieldValues extends FieldValues> = FieldPath<TFieldValues>;
type TFieldValue<TFieldValues extends FieldValues> = UnpackNestedValue<
  FieldPathValue<TFieldValues, TFieldName<TFieldValues>>
>;
type TSetValues<TFieldValues extends FieldValues> = {
  [key in TFieldName<TFieldValues>]?: TFieldValue<TFieldValues>;
};
type TEntryItem<TFieldValues extends FieldValues> = [
  Path<TFieldValues>,
  UnpackNestedValue<PathValue<TFieldValues, Path<TFieldValues>>>,
];

/**
 * useForm
 * @description Wrap react-hook-form useFormContext with typescript
 * @description Override method trigger by validateForm
 * @description Override method register for using with Mui
 * @param _pageName
 * @return validateForm
 * @return setValues
 * @return Rest react-hook-form useForm methods
 * @see https://react-hook-form.com/api/useform
 */
export const useForm = <TPageName extends TPages>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _pageName: TPageName,
) => {
  const {
    setValue: rhfSetValues,
    trigger,
    register: rhfRegister,
    control,
    ...restFormProps
  } = useFormContext<TAllFormValues[TPageName]>();

  return {
    validateForm,
    setValues,
    setValue,
    control,
    register,
    ...restFormProps,
  };

  /**
   * setValues
   * @description Multi trigger setValue at once
   * @param values
   * @param options - RHF setValue configs
   * @example
   * setValues({
   *  fieldName1: "fieldValue1",
   *  fieldName2: "fieldValue2",
   * })
   */
  function setValues(
    values: TSetValues<TAllFormValues[TPageName]>,
    options?: SetValueConfig,
  ) {
    Object.entries(values).forEach((item) => {
      const [name, value] = (item as unknown) as TEntryItem<
        TAllFormValues[TPageName]
      >;
      setValue(name, value, options);
    });
  }

  /**
   * setValue
   * @description Validate after setValue success as default
   * @param name
   * @param value
   * @param options - RHF setValue configs
   * @example
   * setValues("field-name", "value")
   */
  function setValue(
    name: Path<TAllFormValues[TPageName]>,
    value: TFieldValue<TAllFormValues[TPageName]>,
    options?: SetValueConfig,
  ) {
    rhfSetValues(name, value, { shouldValidate: true, ...options });
  }

  /**
   * validateForm
   * @param onPassed
   * @param onFail
   * @param shouldFocus - default: true
   * @example
   * validateForm({
   *  onPassed: () => { console.log("Passed validates"); }
   * })
   */
  async function validateForm({
    onPassed,
    onFail = () => {
      notify.error("Form validation fail!");
    },
    shouldFocus = true,
  }: {
    onPassed: () => void;
    onFail?: () => void;
    shouldFocus?: boolean;
  }) {
    const isPassedValidate = await trigger();
    if (isPassedValidate) {
      onPassed();
      return;
    }
    if (shouldFocus) focusErrorElement();
    if (!isPassedValidate && !!onFail) onFail();
  }

  /**
   * register
   * @param fieldName
   * @description Replace native RHF-register by new function that can be used with Mui-controlled-components
   * @description Native RHF-register is using for native-inputs/uncontrolled components, NOT controlled components
   * @example
   * register("field-name")
   */
  function register(fieldName: FieldPath<TAllFormValues[TPageName]>) {
    return {
      control: (control as unknown) as Control,
      name: fieldName,
    };
  }
};
