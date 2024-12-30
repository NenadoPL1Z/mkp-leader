import { createAsyncThunk } from "@reduxjs/toolkit";
import { setHeader } from "@app/lib/functions/setHeader";
import type { StatusCallback } from "@app/types/general";
import type { UserModel } from "@app/lib/models/UserModel";
import type { Store } from "@app/store/store";

type Data = Partial<StatusCallback> & {
  access_token: string;
};

export const fetchUserMe = createAsyncThunk<UserModel | "reject", Data, Store>(
  "user/fetchUserMe",
  async (
    { access_token, success = () => {}, reject = () => {} },
    { extra: api, rejectWithValue },
  ) => {
    try {
      //? CHECK ACCESS
      if (!access_token) {
        reject();
        return rejectWithValue("reject");
      }

      //? GET USER MODEL
      const response = await api.get<UserModel>("/users/me", {
        headers: setHeader.auth(access_token),
      });
      const isOk = response.status === 200;

      //? CHECK BAD REQUEST
      if (!isOk) {
        reject();
        return rejectWithValue("reject");
      }

      success();
      return response.data;
    } catch {
      reject();
      return rejectWithValue("reject");
    }
  },
);
