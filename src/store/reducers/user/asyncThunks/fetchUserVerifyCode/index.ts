import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthTokens } from "@app/types/general";
import type { Store } from "@app/store/store";

type Data = {
  username: string;
  token: string;
};

export const fetchUserVerifyCode = createAsyncThunk<unknown, Data, Store>(
  "user/fetchUserVerifyCode",
  async ({ username, token }, { extra: api }) => {
    return api.post<AuthTokens>("/auth/verify-reset-code", {
      username,
      token,
    });
  },
);
