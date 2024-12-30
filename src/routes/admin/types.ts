import type { ACustomersSPL } from "./stacks/ACustomers/types";
import type { AExecutorsSPL } from "./stacks/AExecutors/types";
import type { AMainSPL } from "./stacks/AMain/types";
import type { NavigatorScreenParams } from "@react-navigation/native";

export enum AdminRootSN {
  MAIN = "Main",
  Profile = "MEProfile",
  EXECUTORS = "Executors",
  CUSTOMER = "Customer",
}

export type AdminRootSPL = {
  [AdminRootSN.EXECUTORS]: NavigatorScreenParams<AExecutorsSPL>;
  [AdminRootSN.MAIN]: NavigatorScreenParams<AMainSPL>;
  [AdminRootSN.Profile]: undefined;
  [AdminRootSN.CUSTOMER]: NavigatorScreenParams<ACustomersSPL>;
};
