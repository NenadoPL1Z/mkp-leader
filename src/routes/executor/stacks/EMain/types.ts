import type { EMRequestsSPL } from "./screens/EMRequests/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NavigatorScreenParams } from "@react-navigation/native";

export enum EMainSN {
  HOME = "Home",
  REQUESTS = "Requests",
}

export type ERMainSPL = {
  [EMainSN.HOME]: undefined;
  [EMainSN.REQUESTS]: NavigatorScreenParams<EMRequestsSPL>;
};

export type EMHomeScreenProps = NativeStackScreenProps<ERMainSPL, EMainSN.HOME>;
