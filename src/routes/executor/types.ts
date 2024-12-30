import type { NavigatorScreenParams } from "@react-navigation/native";

export enum ExecutorRootSN {
  MAIN = "Main",
  PROFILE = "Profile",
}

export type ExecutorRootSPL = {
  [ExecutorRootSN.MAIN]: NavigatorScreenParams<undefined>;
  [ExecutorRootSN.PROFILE]: NavigatorScreenParams<undefined>;
};
