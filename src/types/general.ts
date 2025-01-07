import type { ViewStyle } from "react-native";
import type { Input } from "@rneui/base";
import type { ReactNode, FunctionComponent } from "react";
import type { SvgProps } from "react-native-svg";

export type Nullable<T> = T | null;

export type Children = ReactNode;
export type ChildrenProps<T = object> = { children: Children } & T;

export type StatusCallback<T = object, R = void> = T & {
  success: () => void;
  reject: (arg: R) => void;
};

export type TextFieldRef = Input;
export interface AuthTokens {
  refresh_token: string;
  access_token: string;
}

export type SvgPropsFixed = Omit<SvgProps, "style"> & {
  style?: ViewStyle & { color?: string };
};
export type SvgFC = FunctionComponent<SvgPropsFixed>;

export type FetchPaginationResponse<T> = {
  items: T[];
  total: number;
  counter: number;
};

export type DetailString = { detail: string };

export interface CatchFetchDetail<T> {
  detail: T;
}

export type Callback = () => void;

export type Option = { label: string; value: "true" | "false" };
