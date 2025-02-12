import type {
  PaginationCallbackCounter,
  PaginationRefs,
} from "@app/components/PaginationList/types";
import type { TopBarNames } from "@app/types/enums/TopBarNames";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type {
  Filter,
  FilterChange,
  Sort,
  SortChange,
} from "@app/components/Sort/types";
import type {
  ServiceCardModel,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Nullable } from "@app/types/general.ts";
import type { ToastShowParams } from "react-native-toast-message";

export enum AMRequestsSN {
  HOME = "Home",
  INFO = "Info",
  EXECUTOR = "Executor",
  COMMENT = "Comment",
}

export type AMRequestsHomeProps = {
  company: {
    value: RequestCompanyModel;
    handleDecrementUnreadCount: (topBarNames: TopBarNames) => void;
    handleSetUnreadCount: (
      topBarNames: TopBarNames,
      newCounter: number,
    ) => void;
  };
};

export type AMRHGeneralProps = AMRequestsHomeProps & {
  sort: {
    value: Sort;
    onChange: SortChange;
  };
  filters: {
    value: Filter;
    onChange: FilterChange;
  };
  counter: {
    value: number;
    onChange: PaginationCallbackCounter;
    onDecrementCounter: () => void;
  };
  queryData: string[];
  workRefs: Required<PaginationRefs<ServiceCardModel>>;
  qualityRefs: Required<PaginationRefs<ServiceCardModel>>;
  closedRefs: Required<PaginationRefs<ServiceCardModel>>;
  refusedRefs: Required<PaginationRefs<ServiceCardModel>>;
  onResetAllTabs: () => void;
};

type Info = AMRHGeneralProps & {
  tabName: "work" | "quality" | "closed" | "refused";
  nextTabName: "work" | "quality" | "closed" | "refused" | "";
  card: ServiceCardModel;
};

type Executor = ServicesDetailModel & {
  executorTitle: string;
  callbackSelectExecutor: (
    executor: ExecutorModel,
    onShowToast: (config: Nullable<ToastShowParams>) => void,
    goBack: () => void,
  ) => void;
};

type Comments = {
  initialValue: string;
  onChange: (value: string) => void;
};

export type AMRequestsSPL = {
  [AMRequestsSN.HOME]: AMRequestsHomeProps;
  [AMRequestsSN.INFO]: Info;
  [AMRequestsSN.EXECUTOR]: Executor;
  [AMRequestsSN.COMMENT]: Comments;
};

export type AMHomeScreenProps = NativeStackScreenProps<
  AMRequestsSPL,
  AMRequestsSN.HOME
>;

export type AMRInfoScreenProps = NativeStackScreenProps<
  AMRequestsSPL,
  AMRequestsSN.INFO
>;

export type AMRExecutorScreenProps = NativeStackScreenProps<
  AMRequestsSPL,
  AMRequestsSN.EXECUTOR
>;
export type AMRCommentScreenProps = NativeStackScreenProps<
  AMRequestsSPL,
  AMRequestsSN.COMMENT
>;
