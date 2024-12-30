import type { FC } from "react";
import type { ButtonProps } from "@rneui/base";
import type { ModalProps, ViewStyle } from "react-native";

export interface PopupUIProps extends ModalProps {
  isSuccess?: boolean;
  onSuccess?: () => void;
  onClose: () => void;
  isBackdoorClose?: boolean;
  containerStyle?: ViewStyle;
  ModalChildren?: FC;
  innerContainerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  successButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
