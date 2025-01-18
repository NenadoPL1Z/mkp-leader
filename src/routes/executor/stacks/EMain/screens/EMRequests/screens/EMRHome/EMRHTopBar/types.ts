import { TopBarNames } from "@app/types/enums/TopBarNames";
import type {
  EMRequestsHomeProps,
  EMRequestsSN,
  EMRequestsSPL,
} from "../../../types";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum EMRHTopBarNamespace {
  WORK = TopBarNames.WORK,
  QUALITY = TopBarNames.Verifying,
  CLOSED = TopBarNames.CLOSED,
  REFUSAL = TopBarNames.REFUSAL,
}

export type EMRHTopBarStackParamList = {
  [EMRHTopBarNamespace.WORK]: EMRequestsHomeProps;
  [EMRHTopBarNamespace.QUALITY]: EMRequestsHomeProps;
  [EMRHTopBarNamespace.CLOSED]: EMRequestsHomeProps;
  [EMRHTopBarNamespace.REFUSAL]: EMRequestsHomeProps;
};

type Parent = NativeStackScreenProps<EMRequestsSPL, EMRequestsSN.INFO>;
type ScreenProps<T extends EMRHTopBarNamespace> = CompositeScreenProps<
  NativeStackScreenProps<EMRHTopBarStackParamList, T>,
  Parent
>;

export type EMRHWorkScreenProps = ScreenProps<EMRHTopBarNamespace.WORK>;
export type EMRHQualityScreenProps = ScreenProps<EMRHTopBarNamespace.QUALITY>;
export type EMRHClosedScreenProps = ScreenProps<EMRHTopBarNamespace.CLOSED>;
export type EMRHRefusalScreenProps = ScreenProps<EMRHTopBarNamespace.REFUSAL>;
