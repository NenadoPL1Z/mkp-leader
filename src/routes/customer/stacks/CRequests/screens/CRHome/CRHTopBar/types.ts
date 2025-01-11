import { TopBarNames } from "@app/types/enums/TopBarNames";
import type { CRequestsSN, CRequestsSPL } from "../../../types";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type CRHomeTopBarsProps = void;

export enum CRTopBarNamespace {
  WORK = TopBarNames.WORK,
  QUALITY = TopBarNames.Verifying,
  CLOSED = TopBarNames.CLOSED,
  REFUSAL = TopBarNames.REFUSAL,
}

export type CRTopBarStackParamList = {
  [CRTopBarNamespace.WORK]: undefined;
  [CRTopBarNamespace.QUALITY]: undefined;
  [CRTopBarNamespace.CLOSED]: undefined;
  [CRTopBarNamespace.REFUSAL]: undefined;
};

type Parent = NativeStackScreenProps<CRequestsSPL, CRequestsSN.INFO>;
type ScreenProps<T extends CRTopBarNamespace> = CompositeScreenProps<
  NativeStackScreenProps<CRTopBarStackParamList, T>,
  Parent
>;
export type CRWorkScreenProps = ScreenProps<CRTopBarNamespace.WORK>;
export type CRQualityScreenProps = ScreenProps<CRTopBarNamespace.QUALITY>;
export type CRClosedScreenProps = ScreenProps<CRTopBarNamespace.CLOSED>;
export type CRRefusalScreenProps = ScreenProps<CRTopBarNamespace.REFUSAL>;
