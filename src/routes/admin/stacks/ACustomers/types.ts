import type {
  CustomerDetailModel,
  CustomerModel,
} from "@app/lib/models/CustomerModel";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

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

export enum ACustomersSN {
  HOME = "Home",
  NEW = "New",
  PROFILE = "Profile",
  EDIT = "Edit",
  ADDRESS = "Address",
}

export type ACustomersSPL = {
  [ACustomersSN.HOME]: undefined;
  [ACustomersSN.PROFILE]: Profile;
  [ACustomersSN.NEW]: New;
  [ACustomersSN.EDIT]: Edit;
  [ACustomersSN.ADDRESS]: Address;
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
