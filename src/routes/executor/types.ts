import type { NavigatorScreenParams } from "@react-navigation/native";

export enum ExecutorRootSN {
  MAIN = "Main",
  PROFILE = "Profile",
}

export type ExecutorRootSPL = {
  [ExecutorRootSN.MAIN]: NavigatorScreenParams<never>;
  [ExecutorRootSN.PROFILE]: NavigatorScreenParams<never>;
};
