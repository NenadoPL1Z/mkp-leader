import type {
  ServiceCardModel,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel.ts";
import type { PaginationRefs } from "@app/components/PaginationList/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum CRequestsSN {
  HOME = "Home",
  INFO = "Info",
  NEW = "New",
}

export type CRGeneralProps = {
  counter: {
    value: number;
    onChange: (counter: number) => void;
    onDecrementCounter: () => void;
  };
  workRefs: Required<PaginationRefs<ServiceCardModel>>;
  qualityRefs: Required<PaginationRefs<ServiceCardModel>>;
  closedRefs: Required<PaginationRefs<ServiceCardModel>>;
  refuseRefs: Required<PaginationRefs<ServiceCardModel>>;
  onResetAllTabs: () => void;
};

export type CRHTopBarProps = Pick<CRGeneralProps, "workRefs">;

type Info = CRGeneralProps & {
  tabName: "work" | "quality" | "closed" | "refuse";
  nextTabName: "work" | "quality" | "closed" | "refuse" | "";
  card: ServiceCardModel;
  cardIndex: number;
};

export type CRNewEditCallback = (
  data: ServicesDetailModel,
  callback: () => void,
) => void;

type New = {
  tabName: "refuse" | "work" | "quality" | "closed";
  tabRef: Required<PaginationRefs<ServiceCardModel>>;
  initialData: ServicesDetailModel | null;
  onEditCards: CRNewEditCallback;
};

export type CRequestsSPL = {
  [CRequestsSN.HOME]: undefined;
  [CRequestsSN.INFO]: Info;
  [CRequestsSN.NEW]: New;
};

export type CRHomeScreenProps = NativeStackScreenProps<
  CRequestsSPL,
  CRequestsSN.HOME
>;

export type CRInfoScreenProps = NativeStackScreenProps<
  CRequestsSPL,
  CRequestsSN.INFO
>;

export type CRNewScreenProps = NativeStackScreenProps<
  CRequestsSPL,
  CRequestsSN.NEW
>;
