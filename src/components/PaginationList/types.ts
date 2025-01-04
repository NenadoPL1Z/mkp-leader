import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CustomerModel } from "@app/lib/models/CustomerModel";
import type {
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";
import type { FlatList, FlatListProps } from "react-native";
import type { AxiosRequestConfig } from "axios";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";

export type PaginationConfigData = { [key in string]: never };

export type ResetArg = {
  resetData?: PaginationConfigData;
  resetQuery?: PaginationConfigQuery;
  isResetDefault?: boolean;
  isScrollTop?: boolean;
};
export type PaginationResetFunction = (config: ResetArg) => void;
export type PaginationFilterFunction = (filterId: string | number) => void;

export type PaginationScrollRef = FlatList | null;
export type PaginationResetRef = PaginationResetFunction | null;
export type PaginationFilterRef = PaginationFilterFunction | null;
export type PaginationSetCardRef<T extends PaginationExtends> = Dispatch<
  SetStateAction<T[]>
> | null;
export type PaginationDisplayRefreshRef = Dispatch<
  SetStateAction<boolean>
> | null;

export interface PaginationEmptyProps {
  Component?: FC;
  children?: ReactNode;
}

export type PaginationConfigQuery = string[];

export interface PaginationRefs<T extends PaginationExtends> {
  scrollRef?: MutableRefObject<PaginationScrollRef>;
  resetRef?: MutableRefObject<PaginationResetRef>;
  filterRef?: MutableRefObject<PaginationFilterRef>;
  setCardRef?: MutableRefObject<PaginationSetCardRef<T>>;
  displayRefreshRef?: MutableRefObject<PaginationDisplayRefreshRef>;
}

export type PaginationCallbackCounter = (
  count: number,
  queryData?: PaginationConfigQuery,
) => void;

export interface PaginationConfig<T extends PaginationExtends>
  extends PaginationRefs<T> {
  url: string;
  query?: PaginationConfigQuery;
  data?: PaginationConfigData;
  pageLimit?: number;
  initialPage?: number;
  requestEnabled?: boolean;
  isDisplayRefresh?: boolean;
  isDisplayHeaderZeroData?: boolean;
  axiosConfig?: Partial<AxiosRequestConfig>;
  callbackCounter?: PaginationCallbackCounter;
  callbackRefresh?: () => void;
}

export type PaginationExtends =
  | ExecutorModel
  | CustomerModel
  | ServiceCardModel
  | RequestCompanyModel;

export interface PaginationListProps<T extends PaginationExtends>
  extends Omit<FlatListProps<T>, "data"> {
  config: PaginationConfig<T>;
  empty?: PaginationEmptyProps;
  ListEndBottomComponent?: FC;
}
