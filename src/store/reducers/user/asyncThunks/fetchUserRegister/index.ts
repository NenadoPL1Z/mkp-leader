import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserLogin } from "@app/store/reducers/user/asyncThunks/fetchUserLogin";
import { isAxiosError } from "axios";
import type { StatusCallback, AuthTokens } from "@app/types/general";
import type { Store } from "@app/store/store";

type Data = StatusCallback<
  {
    username: string;
    password: string;
  },
  string | undefined
>;

export const fetchUserRegister = createAsyncThunk<unknown, Data, Store>(
  "user/fetchUserRegister",
  async (
    { username, password, success, reject },
    { extra: api, dispatch, rejectWithValue },
  ) => {
    try {
      await api.post<AuthTokens>("/auth/register", { username, password });
      dispatch(
        fetchUserLogin({
          username,
          password,
          success,
          reject: () => reject(undefined),
        }),
      );
      return;
    } catch (error) {
      if (isAxiosError(error)) {
        reject(error?.response?.data?.detail);
      } else {
        reject(undefined);
      }
      return rejectWithValue("reject");
    }
  },
);
