import { apiInstance } from "@app/lib/http";
import { BASE_URL } from "@app/lib/constants";

export const getAppVersions = () =>
  apiInstance.get("/versions", {
    baseURL: BASE_URL,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
