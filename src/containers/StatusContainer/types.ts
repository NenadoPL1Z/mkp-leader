import type { ViewProps } from "react-native";
import type { ChildrenProps } from "@app/types/general";
import type { FC } from "react";

export interface LoadingContainerProps {
  containerProps?: ViewProps;
}

export interface ErrorContainerProps {
  onPress: () => void;
  containerProps?: ViewProps;
}

export interface StatusContainerProps extends ChildrenProps {
  isLoading: boolean;
  isError: boolean;
  LoadingComponent?: FC;
  errorProps: ErrorContainerProps;
  loadingProps?: LoadingContainerProps;
}
