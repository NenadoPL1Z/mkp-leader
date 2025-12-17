import React from "react";
import { Modal } from "react-native";
import { useStatusBar } from "@app/hooks/useStatusBar.ts";
import { Colors } from "@app/theme/colors.ts";
import type { ModalProps } from "react-native";

export type ModalUIProps = Required<Pick<ModalProps, "onRequestClose">> &
  Omit<ModalProps, "onRequestClose">;

const ModalUI = ({ children, ...modalProps }: ModalUIProps) => {
  useStatusBar(modalProps.visible, {
    backgroundColor: Colors.GRAY_ELEVEN,
    statusBar: "light-content",
  });

  return (
    <Modal
      supportedOrientations={["portrait"]}
      {...modalProps}>
      {children}
    </Modal>
  );
};

export default React.memo(ModalUI);
