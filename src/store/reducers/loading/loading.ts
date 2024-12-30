import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";

type LoadingState = {
  isHideSplash: boolean;
  isCheckAuth: boolean;
  isNavigation: boolean;
};

const initialState: LoadingState = {
  isHideSplash: false,
  isCheckAuth: false,
  isNavigation: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
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
    selectAuth,
    selectNav,
    selectHideSplash,
  },
  actions: loadingSlice.actions,
};

export default loadingSlice.reducer;
