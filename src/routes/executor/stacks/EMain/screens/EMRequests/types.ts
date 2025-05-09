import type {
  RequestBadgeModel,
  RequestBadgeModelKey,
  RequestCompanyModel,
} from "@app/lib/models/RequestModel";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { TopBarNames } from "@app/types/enums/TopBarNames";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  PaginationCallbackCounter,
  PaginationRefs,
} from "@app/components/PaginationList/types";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { RICommentsSPL } from "@app/routes/stacks/RIComments/types.ts";

export enum EMRequestsSN {
  HOME = "Home",
  INFO = "Info",
  COMMENTS = "Comments",
}

export type EMRequestsHomeProps = {
  company: {
    value: RequestCompanyModel;
    handleDecrementUnreadCount: (topBarNames: TopBarNames) => void;
    handleSetUnreadCount: (
      topBarNames: TopBarNames,
      newCounter: number,
    ) => void;
    handleUpdateStatusCounter: (
      currentTabName: RequestBadgeModelKey,
      nextTabName?: RequestBadgeModelKey,
    ) => void;
    handleSetStatusCounter: (
      updatedBadge: Partial<Record<keyof RequestBadgeModel, number>>,
    ) => void;
  };
};

export type EMRHGeneralProps = EMRequestsHomeProps & {
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
};

type Info = EMRHGeneralProps & {
  tabName: "work" | "quality" | "closed" | "refused";
  nextTabName: "work" | "quality" | "closed" | "refused" | "";
  card: ServiceCardModel;
};

export type EMRequestsSPL = {
  [EMRequestsSN.HOME]: EMRequestsHomeProps;
  [EMRequestsSN.INFO]: Info;
  [EMRequestsSN.COMMENTS]: NavigatorScreenParams<RICommentsSPL>;
};

export type EMRHomeScreenProps = NativeStackScreenProps<
  EMRequestsSPL,
  EMRequestsSN.HOME
>;

export type EMRInfoScreenProps = NativeStackScreenProps<
  EMRequestsSPL,
  EMRequestsSN.INFO
>;
