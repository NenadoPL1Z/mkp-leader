import type { StatusBarStyle } from "react-native";
import type { Nullable } from "@app/types/general.ts";
import type { NetworkInfoState } from "@app/lib/modules/network";

export interface StatusBarGlobal {
  backgroundColor: string;
  statusBar?: StatusBarStyle | null;
}

export type VersionsDetails = {
  google_play_version: string;
  app_store_version: string;
  google_play_url: string;
  app_store_url: string;
};

export interface VersionGlobal {
  isActual: Nullable<boolean>;
  currentVersion: Nullable<string>;
  details: Nullable<VersionsDetails>;
}

export type GlobalState = {
  version: VersionGlobal;
  statusBar: StatusBarGlobal;
  netInfo: Nullable<NetworkInfoState>;
};
