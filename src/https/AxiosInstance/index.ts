// libs
import axios from "axios";
// configs
import { ENV } from "@/configs/env";

export const AXIOS_INSTANCE = axios.create({
  baseURL: ENV.BASE_API,
});
