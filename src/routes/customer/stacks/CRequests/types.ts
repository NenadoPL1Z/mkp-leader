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
  newRefs: Required<PaginationRefs<ServiceCardModel>>;
  workRefs: Required<PaginationRefs<ServiceCardModel>>;
  qualityRefs: Required<PaginationRefs<ServiceCardModel>>;
  closedRefs: Required<PaginationRefs<ServiceCardModel>>;
  onResetAllTabs: () => void;
};

export type CRHTopBarProps = Pick<CRGeneralProps, "newRefs">;

type Info = CRGeneralProps & {
  tabName: "new" | "work" | "quality" | "closed";
  nextTabName: "new" | "work" | "quality" | "closed" | "";
  card: ServiceCardModel;
  cardIndex: number;
};

export type CRNewEditCallback = (
  data: ServicesDetailModel,
  callback: () => void,
) => void;

type New = {
  tabName: "new" | "work" | "quality" | "closed";
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
