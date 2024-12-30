import type { ReactNode } from "react";
import type { ModalProps, PressableProps } from "react-native";
import type { BottomSheetProps } from "@gorhom/bottom-sheet";

export interface BottomSheetUIProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  isAutoHeight?: boolean;
  isBackdoorClose?: boolean;
  isPortal?: boolean;
  modalProps?: Omit<ModalProps, "children">;
  bottomSheetProps?: Partial<Omit<BottomSheetProps, "children">>;
}

export type BottomSheetBackdoorProps = PressableProps;
