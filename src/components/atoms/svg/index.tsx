// libs
import classNames from "classnames";
import { HTMLAttributes } from "react";
import { Props, ReactSVG } from "react-svg";
// components
import Spinner from "@/components/atoms/Spinner";
// types
import { SvgTypes } from "./type";
// others
import classes from "./Svg.module.scss";

type PROPS = {
  type: SvgTypes;
} & Omit<Props, "src" | "loading" | "wrapper"> &
  HTMLAttributes<any>;

/**
 * Svg
 * @description Collections of SVG files from feather icons store in /public/icons
 * @description Render SVG files by react-svg
 * @see https://feathericons.com/
 * @see https://github.com/tanem/react-svg
 */
export default function Svg({ type, className, ...props }: PROPS) {
  return (
    <ReactSVG
      src={`/icons/${type}.svg`}
      loading={Spinner}
      wrapper="span"
      className={classNames(classes.root, className)}
      {...props}
    />
  );
}
