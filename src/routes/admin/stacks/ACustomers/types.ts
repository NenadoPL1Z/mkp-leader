import type { ExecutorModel } from "@app/lib/models/ExecutorModel.ts";
import type {
  CustomerDetailModel,
  CustomerModel,
} from "@app/lib/models/CustomerModel";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Nullable } from "@app/types/general.ts";
import type { ToastShowParams } from "react-native-toast-message";

type Callback<T = CustomerDetailModel> = {
  user: T;
  toast: string;
  callback: () => void;
};

export type CustomerProfileCallback = (data: Callback) => void;
export type CustomerProfileDeleteCallback = (
  data: Omit<Callback, "toast">,
) => void;
export type CustomerNewAddCallback = (data: Callback) => void;

type Edit = CustomerDetailModel & {
  callbackChange: CustomerProfileCallback;
};

type Profile = Pick<CustomerModel, "id"> & {
  callbackEdit: (user: CustomerModel) => void;
  callbackDelete: CustomerProfileDeleteCallback;
};

type New = {
  callbackAdd: CustomerNewAddCallback;
};

export type AdminCustomerAddressCallback = (
  data: string,
  callback: () => void,
) => void;

type Address = {
  initialValue: string;
  callbackAddress: AdminCustomerAddressCallback;
};

type Executor = {
  executorTitle: string;
  callbackSelectExecutor: (
    executor: ExecutorModel,
    onShowToast: (config: Nullable<ToastShowParams>) => void,
    goBack: () => void,
  ) => void;
};

export enum ACustomersSN {
  HOME = "Home",
  NEW = "New",
  PROFILE = "Profile",
  EDIT = "Edit",
  ADDRESS = "Address",
  EXECUTOR = "Executor",
}

export type ACustomersSPL = {
  [ACustomersSN.HOME]: undefined;
  [ACustomersSN.PROFILE]: Profile;
  [ACustomersSN.NEW]: New;
  [ACustomersSN.EDIT]: Edit;
  [ACustomersSN.ADDRESS]: Address;
  [ACustomersSN.EXECUTOR]: Executor;
};

export type ACHomeProps = NativeStackScreenProps<
  ACustomersSPL,
  ACustomersSN.HOME
>;

export type ACProfileProps = NativeStackScreenProps<
  ACustomersSPL,
  ACustomersSN.PROFILE
>;

export type ACEditProps = NativeStackScreenProps<
  ACustomersSPL,
  ACustomersSN.EDIT
>;

export type ACNewProps = NativeStackScreenProps<
  ACustomersSPL,
  ACustomersSN.NEW
>;

export type ACAddressProps = NativeStackScreenProps<
  ACustomersSPL,
  ACustomersSN.ADDRESS
>;

export type ACExecutorProps = NativeStackScreenProps<
  ACustomersSPL,
  ACustomersSN.EXECUTOR
>;
