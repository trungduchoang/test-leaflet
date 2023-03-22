// libs
import { useConfirmDialog } from 'react-mui-confirm';

/**
 * useConfirm
 * @description Show confirm dialog, base on react-mui-confirm
 * @see https://www.npmjs.com/package/react-mui-confirm
 * @see https://codesandbox.io/s/react-material-ui-confirm-examples-19c0i?file=/pages/index.tsx:1380-1393
 * @returns Callback for show confirm dialog
 * @example
 * const confirm = useConfirm();
 * confirm({
 *  title: "",
 *  description: "",
 *  onConfirm: () => {},
 * })
 * @param title
 * @param description
 * @param confirmText
 * @param timer
 * @param onConfirm
 * @param confirmButtonText
 * @param cancelButtonText
 * @param rejectOnCancel
 * @param dialogProps
 * @param dialogTitleProps
 * @param dialogContentProps
 * @param dialogContentTextProps
 * @param dialogActionsProps
 * @param confirmTextFieldProps
 * @param timerProgressProps
 * @param confirmButtonProps
 * @param cancelButtonProps
 */
export function useConfirm() {
  return useConfirmDialog();
}
