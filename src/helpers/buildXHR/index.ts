// libs
import { useState } from "react";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
// types
import { TApiConfigs, TCallbackProps, TXhrReturn } from "@/types";
// others
import { AXIOS_INSTANCE } from "@/https/AxiosInstance";
import { defaultHttpError, makeRequestUrl } from "../tools";
import { notify } from "@/utils/notify";

/**
 * buildXHR
 * @description build a like-useAsync-hook for request API
 * @param configs
 * @return React Hook for requesting API
 * @example Static API_URL
 * type TRequest = {
    email: string;
    password: string;
   };
   type TParams = {
    someParam: string;
   };
   type TResponse = {
    name: string;
   };
   export const useRequestRegisterAccount = buildXHR<
     TRequest,
     TResponse,
     TParams,
   >({
     url: "/example/api/endpoint/",
     method: "POST",
     initialResponseValues: {}
   });
   // Usage in React Component
     const [requestRegisterAccount, { isLoading, response }] = useRequestRegisterAccount();
     requestRegisterAccount({
       // ...
       cbSuccess: (response) => {
         // This is on success callback
       }
     });
 * @example Dynamic API_URL
 * type TUrlParams = {
 *  param1: string
 * }
   type TResponse = {
    name: string;
   };
   export const useRequestRegisterAccount = buildXHR<
     undefined,
     TResponse,
     undefined,
     TUrlParams,
   >({
     url: ({ param1 }) => `/url/with/params/${param1}/`,
     method: "POST",
     initialResponseValues: {}
   });
   // Usage in React Component
     const [requestRegisterAccount, { isLoading, response }] = useRequestRegisterAccount();
     requestRegisterAccount({
       urlParams: {
        param1: "example",
       },
       cbSuccess: (response) => {
         // This is on success callback
       }
     });
 */
export const buildXHR = <
  TResponse = TObject,
  TRequestBody = TObject,
  TRequestQuery = TObject,
  TUrlParams = TObject,
>(
  {
    initialResponseValues,
    url,
    ...defaultConfigs
  }: TApiConfigs<TResponse, TUrlParams>,
  axiosInstance: AxiosInstance = AXIOS_INSTANCE,
) => (isNotifySuccess?: "notify-success") => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<TResponse>(initialResponseValues);
  const [error, setError] = useState<AxiosError | null>(null);
  const isExecuted = isLoading || response !== initialResponseValues;

  const execute = (
    cbProps?: TCallbackProps<TResponse, TRequestBody, TRequestQuery, TUrlParams>,
  ) => {
    const { cbSuccess, cbError, urlParams, ...runtimeConfigs } = cbProps || {};
    setLoading(true);

    return axiosInstance
      .request({
        url: makeRequestUrl<TUrlParams>(url, urlParams),
        ...defaultConfigs,
        ...runtimeConfigs,
        headers: {
          ...defaultConfigs.headers,
          ...runtimeConfigs.headers,
        },
      })
      .then((response: AxiosResponse<TResponse>) => {
        setResponse(response.data);
        if (cbSuccess) cbSuccess(response.data);
        if (isNotifySuccess === "notify-success") notify.success("Success");
      })
      .catch((error: AxiosError) => {
        setError(error);
        if (cbError) cbError(error);
        else defaultHttpError(error);
      })
      .finally(() => setLoading(false));
  };

  return [
    execute,
    {
      isLoading,
      response: response as unknown,
      error,
      // TODO: Is below isExecuted, isSuccess working?
      isExecuted,
      isSuccess: !isLoading && isExecuted && !error,
    },
  ] as [typeof execute, TXhrReturn<TResponse>];
};
