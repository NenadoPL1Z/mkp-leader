import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";

export const deleteAuthTokens = async () => {
  const { refresh_token } = await jwt.getAuthTokens();
  return apiInstance.delete(Api.auth.tokens, {
    headers: { Authorization: `Bearer ${refresh_token}` },
  });
};
