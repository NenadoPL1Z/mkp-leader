import type { NavigatorScreenParams } from "@react-navigation/native";

export enum CustomerRootSN {
  REQUESTS = "Requests",
  PROFILE = "Profile",
}

export type CustomerRootSPL = {
  [CustomerRootSN.REQUESTS]: NavigatorScreenParams<never>;
  [CustomerRootSN.PROFILE]: NavigatorScreenParams<never>;
};
