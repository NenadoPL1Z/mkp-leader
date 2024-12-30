import { createSlice } from "@reduxjs/toolkit";
import { fetchUserMe } from "@app/store/reducers/user/asyncThunks/fetchUserMe";
import type { CustomerModel } from "@app/lib/models/CustomerModel";
import type { Nullable } from "@app/types/general";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";
import type { UserModel } from "@app/lib/models/UserModel";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";

const initialUser = {} as UserModel;

type UserState = {
  isAuth: Nullable<boolean>;
  isSessionExist: boolean;
  user: UserModel;
};

const initialState: UserState = {
  isAuth: null,
  isSessionExist: false,
  user: initialUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    session(state) {
      state.isAuth = false;
      state.isSessionExist = true;
      state.user = initialUser;
    },
    closeSession(state) {
      state.isSessionExist = false;
    },
    logout(state) {
      state.isAuth = false;
      state.isSessionExist = false;
      state.user = initialUser;
    },
  },
  extraReducers: (builder) => {
    //? USER_ME
    builder.addCase(fetchUserMe.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isSessionExist = false;
      state.user = action.payload as UserModel;
    });
    builder.addCase(fetchUserMe.rejected, (state) => {
      state.isAuth = false;
      state.isSessionExist = false;
      state.user = {} as UserModel;
    });
  },
});

const selectUserAuth = (state: RootState) => {
  return state.user.isAuth;
};
const selectSession = (state: RootState) => {
  return state.user.isSessionExist;
};
const selectUserInfo = <
  T extends UserModel | CustomerModel | ExecutorModel = UserModel,
>(
  state: RootState,
) => {
  return state.user.user as T;
};

export const user = {
  selectors: {
    selectUserAuth,
    selectSession,
    selectUserInfo,
  },
  actions: userSlice.actions,
};

export default userSlice.reducer;
