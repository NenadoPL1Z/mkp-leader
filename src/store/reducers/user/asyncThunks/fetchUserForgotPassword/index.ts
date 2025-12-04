import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthTokens } from "@app/types/general";
import type { Store } from "@app/store/store";

type Data = {
  username: string;
};

export const fetchUserForgotPassword = createAsyncThunk<unknown, Data, Store>(
  "user/fetchUserForgotPassword",
  async ({ username }, { extra: api }) => {
    return api.post<AuthTokens>("/auth/forgot-password", { username });
  },
);
