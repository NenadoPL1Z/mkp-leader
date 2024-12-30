import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";
import { fetchUserMe } from "@app/store/reducers/user/asyncThunks/fetchUserMe";
import type { StatusCallback, AuthTokens } from "@app/types/general";
import type { Store } from "@app/store/store";

type Data = StatusCallback<{
  username: string;
  password: string;
}>;

export const fetchUserLogin = createAsyncThunk<unknown, Data, Store>(
  "user/fetchUserLogin",
  async (
    { username, password, success, reject },
    { extra: api, dispatch, rejectWithValue },
  ) => {
    try {
      const forData = new FormData();
      forData.append("username", username);
      forData.append("password", password);

      const response = await api.post<AuthTokens>("/auth/tokens", forData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const tokens = response.data;
      const isTokens = tokens.access_token && tokens.refresh_token;

      //? CHECK TOKENS
      if (!isTokens) {
        reject();
        return rejectWithValue("reject");
      }

      //? SAVE TOKENS
      await jwt
        .setAuthTokens({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        })
        //? ОТКЛЮЧАЕМ ВЕРХНИЙ TRY/CATCH, ЧТОБЫ ИДТИ ДАЛЬШЕ ПО ЛОГИКИ
        .catch();

      //? FETCH USER MODEL
      dispatch(
        fetchUserMe({
          access_token: tokens.access_token,
          success,
          reject,
        }),
      );

      return;
    } catch {
      reject();
      return rejectWithValue("reject");
    }
  },
);
