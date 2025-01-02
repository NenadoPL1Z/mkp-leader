import axios from "axios";
import { API_URL, IS_DEV, TIMEOUT } from "@app/lib/constants";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";

const createInstance = () => {
  const config = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
  });

  config.interceptors.request.use(
    async (request) => {
      const { access_token = "" } = await jwt.getAccessToken();
      request.headers.Authorization = `Bearer ${access_token}`;

      if (IS_DEV) {
        console.log(
          `🚀🚀🚀 Начало запрос: [${request.method?.toUpperCase()}] ${
            request.url
          }`,
          {
            request,
            headers: request.headers,
            data: request.data,
          },
        );
      }

      return request;
    },
    (error) => {
      if (IS_DEV) console.error("⛔⛔⛔ Ошибка запроса:", error);
      return Promise.reject(error);
    },
  );

  if (IS_DEV) {
    config.interceptors.response.use(
      (response) => {
        console.log(
          `✅✅✅ Конец запроса: [${response.status}] ${response.config.url}`,
          {
            response,
            headers: response.headers,
            data: response.data,
          },
        );
        return response;
      },
      (error) => {
        if (error.response) {
          console.error(
            `⛔⛔⛔ Ошибка ответа: [${error.response.status}] ${error.config.url}`,
            {
              error,
              response: error.response,
              data: error.response.data,
            },
          );
        } else {
          console.error("🌐🌐🌐 Ошибка сети:", {
            error,
            message: error.message,
          });
        }
        return Promise.reject(error);
      },
    );
  }

  return config;
};

export const apiInstance = createInstance();
