import { TopBarNames } from "@app/types/enums/TopBarNames";
import type {
  AMRequestsHomeProps,
  AMRequestsSN,
  AMRequestsSPL,
} from "../../../types";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AMRHTopBarNamespace {
  NEW = TopBarNames.NEW,
  WORK = TopBarNames.WORK,
  QUALITY = TopBarNames.Verifying,
  CLOSED = TopBarNames.CLOSED,
}

export type AMRHTopBarStackParamList = {
  [AMRHTopBarNamespace.NEW]: AMRequestsHomeProps;
  [AMRHTopBarNamespace.WORK]: AMRequestsHomeProps;
  [AMRHTopBarNamespace.QUALITY]: AMRequestsHomeProps;
  [AMRHTopBarNamespace.CLOSED]: AMRequestsHomeProps;
};

type Parent = NativeStackScreenProps<AMRequestsSPL, AMRequestsSN.INFO>;
type ScreenProps<T extends AMRHTopBarNamespace> = CompositeScreenProps<
  NativeStackScreenProps<AMRHTopBarStackParamList, T>,
  Parent
>;

export type AMRHNewScreenProps = ScreenProps<AMRHTopBarNamespace.NEW>;
export type AMRHWorkScreenProps = ScreenProps<AMRHTopBarNamespace.WORK>;
export type AMRHQualityScreenProps = ScreenProps<AMRHTopBarNamespace.QUALITY>;
export type AMRHClosedScreenProps = ScreenProps<AMRHTopBarNamespace.CLOSED>;
