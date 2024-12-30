import { asyncStorage } from "@app/lib/modules/asyncStorage/asyncStorage";
import type { MultiAsyncStorageKeysType } from "../types";
import type { AuthTokens } from "@app/types/general";

type AuthTokenResponse = "success" | "reject";

const setAuthTokens = async ({ access_token, refresh_token }: AuthTokens) => {
  const access: MultiAsyncStorageKeysType = ["@access_token", access_token];
  const refresh: MultiAsyncStorageKeysType = ["@refresh_token", refresh_token];

  const response: AuthTokenResponse = await asyncStorage
    .multiSetItemAsyncStorage([access, refresh])
    .then(() => "success" as AuthTokenResponse)
    .catch(() => "reject" as AuthTokenResponse);

  return response;
};

const getAuthTokens = async () => {
  const initial = { access_token: "", refresh_token: "" };
  return await asyncStorage
    .multiGetItemAsyncStorage(["@access_token", "@refresh_token"])
    .then((tokens) => {
      if (!tokens) {
        return initial;
      }
      return {
        access_token: tokens[0][1] || "",
        refresh_token: tokens[1][1] || "",
      };
    })
    .catch(() => {
      return initial;
    });
};

const getAccessToken = async () => {
  const tokens = await getAuthTokens();

  return {
    access_token: tokens.access_token,
  };
};

const removeAuthTokens = async () => {
  return asyncStorage.multiRemoveItemAsyncStorage([
    "@access_token",
    "@refresh_token",
  ]);
};

export const jwt = {
  setAuthTokens,
  getAuthTokens,
  getAccessToken,
  removeAuthTokens,
};
