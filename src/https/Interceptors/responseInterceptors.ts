// libs
import axios from "axios";
import jwtDecode from "jwt-decode";
// others
import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";
import { AXIOS_INSTANCE } from "../AxiosInstance";

/**
 * doRefreshTokenIntercept
 */
export const doRefreshTokenIntercept = () => {
  AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest.isRefreshed) {
        originalRequest.isRefreshed = true;
        const refreshToken = cookie.get(STORAGE_KEYS.REFRESH_TOKEN);
        return axios
          .request({
            method: "GET",
            baseURL: process.env.GAME_BASE_API,
            // TODO:
            url: "type refresh token url here",
            params: {
              token: refreshToken,
            },
          })
          .then((res) => {
            const { exp: refreshTokenExpire = 0 } =
              jwtDecode<any>(res.data.refresh_token) || {};
            const { exp: accessTokenExpire = 0 } =
              jwtDecode<any>(res.data.access_token) || {};
            cookie.set({
              name: STORAGE_KEYS.ACCESS_TOKEN,
              value: res.data.access_token,
              exactlyTime: new Date(+new Date() + +accessTokenExpire),
            });
            cookie.set({
              name: STORAGE_KEYS.REFRESH_TOKEN,
              value: res.data.refresh_token,
              exactlyTime: new Date(+new Date() + +refreshTokenExpire),
            });
            return AXIOS_INSTANCE({
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${res.data.access_token}`,
              },
            });
          })
          .catch(() => {
            cookie.remove(STORAGE_KEYS.ACCESS_TOKEN);
            cookie.remove(STORAGE_KEYS.REFRESH_TOKEN);
            // TODO:
            window.open("Type signin route here", "_self");
          });
      }

      return Promise.reject(error);
    },
  );
};
