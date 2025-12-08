import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserLogin } from "@app/store/reducers/user/asyncThunks/fetchUserLogin";
import { isAxiosError } from "axios";
import type { StatusCallback } from "@app/types/general";
import type { Store } from "@app/store/store";

type Data = StatusCallback<
  {
    username: string;
    token: string;
    new_password: string;
  },
  string | undefined
>;

export const fetchUserReset = createAsyncThunk<unknown, Data, Store>(
  "user/fetchUserReset",
  async (
    { username, token, new_password, success, reject },
    { extra: api, dispatch, rejectWithValue },
  ) => {
    try {
      await api.post("/auth/reset-password", { token, new_password });

      dispatch(
        fetchUserLogin({
          username,
          password: new_password,
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
