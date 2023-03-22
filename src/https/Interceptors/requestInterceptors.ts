// others
import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";
import { AXIOS_INSTANCE } from "../AxiosInstance";

/**
 * Intercept request
 */
const doAxiosRequestIntercept = () => {
  AXIOS_INSTANCE.interceptors.request.use(
    async (config) => {
      const accessToken = cookie.get(STORAGE_KEYS.ACCESS_TOKEN);

      return {
        ...config,
        headers: {
          [STORAGE_KEYS.AUTHORIZATION]: `Bearer ${accessToken}`,
          ...config.headers,
        },
      };
    },
    (error) => {
      Promise.reject(error);
    },
  );
};

export default doAxiosRequestIntercept;
