// libs
import { ReactNode } from "react";
import { Provider } from "react-redux";
// configs
import { store } from "@/configs/redux";

type TProps = {
  children: ReactNode;
};
export function ReduxProvider({ children }: TProps) {
  return <Provider store={store}>{children}</Provider>;
}
