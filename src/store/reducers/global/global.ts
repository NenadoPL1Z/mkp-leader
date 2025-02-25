import { createSlice } from "@reduxjs/toolkit";
import { Colors } from "@app/theme/colors.ts";
import { fetchVersions } from "./asyncThunks/fetchVersions";
import type { GlobalState, StatusBarGlobal } from "./type.ts";
import type { NetworkInfoState } from "@app/lib/modules/network";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  version: {
    isActual: null,
    actualVersion: null,
    currentVersion: null,
    details: null,
  },
  statusBar: { backgroundColor: Colors.PRIMARY, statusBar: null },
  netInfo: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeNetInfo(state, action: PayloadAction<NetworkInfoState>) {
      state.netInfo = action.payload;
    },
    changeStatusBar(state, action: PayloadAction<StatusBarGlobal>) {
      state.statusBar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVersions.fulfilled, (state, action) => {
      state.version = action.payload;
    });
  },
});

export const { changeNetInfo, changeStatusBar } = globalSlice.actions;

export default globalSlice.reducer;
