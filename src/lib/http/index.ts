import axios from "axios";
import { API_URL, TIMEOUT } from "@app/lib/constants";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";

const createInstance = () => {
  const config = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
  });

  config.interceptors.request.use(async (request) => {
    const { access_token } = await jwt.getAuthTokens();

    if (!request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${access_token}`;
    }

    return request;
  });

  return config;
};

export const apiInstance = createInstance();
