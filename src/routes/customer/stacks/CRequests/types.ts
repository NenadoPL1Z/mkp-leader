import type {
  ServiceCardModel,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel.ts";
import type {
  PaginationCallbackCounter,
  PaginationRefs,
} from "@app/components/PaginationList/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { RICommentsSPL } from "@app/routes/stacks/RIComments/types.ts";

export enum CRequestsSN {
  HOME = "Home",
  INFO = "Info",
  NEW = "New",
  COMMENTS = "Comments",
}

export type CRGeneralProps = {
  counter: {
    value: number;
    onSetUnreadCounters: PaginationCallbackCounter;
    onDecrementUnreadCounter: () => void;
  };
  workRefs: Required<PaginationRefs<ServiceCardModel>>;
  qualityRefs: Required<PaginationRefs<ServiceCardModel>>;
  closedRefs: Required<PaginationRefs<ServiceCardModel>>;
  refusedRefs: Required<PaginationRefs<ServiceCardModel>>;
  onResetAllTabs: () => void;
  onDisplayToast: (text: string) => void;
};

export type CRHTopBarProps = Pick<
  CRGeneralProps,
  "workRefs" | "onDisplayToast"
>;

type Info = CRGeneralProps & {
  tabName: "work" | "quality" | "closed" | "refused";
  nextTabName: "work" | "quality" | "closed" | "refused" | "";
  card: ServiceCardModel;
  cardIndex: number;
};

export type CRNewEditCallback = (
  data: ServicesDetailModel,
  callback: () => void,
) => void;

type New = {
  tabName: "refused" | "work" | "quality" | "closed";
  tabRef: Required<PaginationRefs<ServiceCardModel>>;
  initialData: ServicesDetailModel | null;
  onEditCards: CRNewEditCallback;
};

export type CRequestsSPL = {
  [CRequestsSN.HOME]: undefined;
  [CRequestsSN.INFO]: Info;
  [CRequestsSN.NEW]: New;
  [CRequestsSN.COMMENTS]: NavigatorScreenParams<RICommentsSPL>;
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
