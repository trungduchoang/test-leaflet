// libs
import { AxiosError } from "axios";
// others
import { notify } from "@/utils/notify";

/**
 * defaultHttpError
 * @param error
 */
export function defaultHttpError(error: AxiosError) {
  const errorMsg =
    error.response?.data?.message || error.message || "Unknown Error!";
  notify.error(errorMsg);
}

/**
 * makeRequestUrl
 * @param url
 * @param urlParams
 */
export function makeRequestUrl<TUrlParams>(
  url: string | ((params: TUrlParams) => string),
  urlParams?: TUrlParams,
) {
  if (typeof url === "string") return url;
  if (typeof url === "function" && urlParams) return url(urlParams);
  throw new Error(
    "API's URL must be string or a function with urlParams is provided!",
  );
}
