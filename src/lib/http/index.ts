import axios from "axios";
import { API_URL, TIMEOUT } from "@app/lib/constants";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";
import type { InternalAxiosRequestConfig } from "axios";

const createInstance = () => {
  const config = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
  });

  config.interceptors.request.use(async (request) => {
    const { access_token } = await jwt.getAccessToken();

    return {
      ...request,
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...request.headers,
      },
    } as InternalAxiosRequestConfig;
  });

  return config;
};

export const apiInstance = createInstance();
