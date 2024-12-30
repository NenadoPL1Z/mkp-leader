import { apiInstance } from "@app/lib/http";
import { setHeader } from "@app/lib/functions/setHeader";
import type { AxiosResponse } from "axios";
import type { AuthTokens } from "@app/types/general";

type Return = Promise<AxiosResponse<AuthTokens>>;

export const getUpdateAccessToken = (refresh_token: string): Return => {
  return apiInstance.put<AuthTokens>(
    "/auth/tokens",
    {},
    {
      headers: setHeader.auth(refresh_token),
    },
  );
};
