// libs
import { ReactNode } from "react";
import Spinner from "../atoms/Spinner";
// others
import classes from "./Layout.module.scss";

type TProps = {
  children?: ReactNode;
  loading?: boolean;
};
/**
 * Layout
 * @param children
 * @param loading
 */
export default function Layout({ children, loading }: TProps) {
  return (
    <div className={classes.root}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.mainWrapper}>{children}</div>
      )}
    </div>
  );
}
