import type { StatusBarStyle } from "react-native";
import type { Nullable } from "@app/types/general.ts";
import type { NetworkInfoState } from "@app/lib/modules/network";

export interface StatusBarGlobal {
  backgroundColor: string;
  statusBar?: StatusBarStyle | null;
}

export type GlobalState = {
  netInfo: Nullable<NetworkInfoState>;
  statusBar: StatusBarGlobal;
};
