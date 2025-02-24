import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";

type LoadingState = {
  isCheckVersion: boolean;
  isCheckAuth: boolean;
  isNavigation: boolean;
  isHideSplash: boolean;
};

const initialState: LoadingState = {
  isCheckVersion: false,
  isCheckAuth: false,
  isNavigation: false,
  isHideSplash: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    version(state) {
      state.isCheckVersion = true;
    },
    auth(state) {
      state.isCheckAuth = true;
    },
    navigation(state) {
      state.isNavigation = true;
    },
    hideSplash(state) {
      state.isHideSplash = true;
    },
  },
});

const selectVersion = (state: RootState) => {
  return state.loading.isCheckVersion;
};

const selectAuth = (state: RootState) => {
  return state.loading.isCheckAuth;
};

const selectNav = (state: RootState) => {
  return state.loading.isNavigation;
};

const selectHideSplash = (state: RootState) => {
  return state.loading.isHideSplash;
};

export const loading = {
  selectors: {
    selectVersion,
    selectAuth,
    selectNav,
    selectHideSplash,
  },
  actions: loadingSlice.actions,
};

export default loadingSlice.reducer;
