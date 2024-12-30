import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AMRequestsSPL } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";

export enum AMainSN {
  HOME = "Home",
  REQUESTS = "Requests",
}

export type AMainSPL = {
  [AMainSN.HOME]: undefined;
  [AMainSN.REQUESTS]: NavigatorScreenParams<AMRequestsSPL>;
};

export type AMHomeScreenProps = NativeStackScreenProps<AMainSPL, AMainSN.HOME>;
