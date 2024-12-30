import { createSlice } from "@reduxjs/toolkit";
import { Colors } from "@app/theme/colors.ts";
import type { GlobalState, StatusBarGlobal } from "./type.ts";
import type { NetworkInfoState } from "@app/lib/modules/network";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  netInfo: null,
  statusBar: {
    backgroundColor: Colors.PRIMARY,
    statusBar: null,
  },
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
});

export const { changeNetInfo, changeStatusBar } = globalSlice.actions;

export default globalSlice.reducer;
