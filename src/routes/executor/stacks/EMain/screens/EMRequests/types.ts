import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { TopBarNames } from "@app/types/enums/TopBarNames";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { PaginationRefs } from "@app/components/PaginationList/types";

export enum EMRequestsSN {
  HOME = "Home",
  INFO = "Info",
}

export type EMRequestsHomeProps = {
  company: {
    value: RequestCompanyModel;
    handleCounterDecrement: (topBarNames: TopBarNames) => void;
    handleCounterUpdate: (topBarNames: TopBarNames, newCounter: number) => void;
  };
};

export type EMRHGeneralProps = EMRequestsHomeProps & {
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

type Info = EMRHGeneralProps & {
  tabName: "work" | "quality" | "closed" | "refuse";
  nextTabName: "work" | "quality" | "closed" | "refuse" | "";
  card: ServiceCardModel;
};

export type EMRequestsSPL = {
  [EMRequestsSN.HOME]: EMRequestsHomeProps;
  [EMRequestsSN.INFO]: Info;
};

export type EMRHomeScreenProps = NativeStackScreenProps<
  EMRequestsSPL,
  EMRequestsSN.HOME
>;

export type EMRInfoScreenProps = NativeStackScreenProps<
  EMRequestsSPL,
  EMRequestsSN.INFO
>;
