import React from "react";

import ButtonSheetContent from "./BottomSheetContent/BottomSheetContent";
import { useBottomSheetUI } from "./useBottomSheetUI";
import ModalUI from "../ModalUI/ModalUI";

import type { BottomSheetUIProps } from "./types";

//! MODAL WRAPPER COMPONENT
const BottomSheetUI = (props: BottomSheetUIProps) => {
  const { modalProps = {} } = props;
  const { localVisible, PortalContainer } = useBottomSheetUI(props);

  return (
    <PortalContainer>
      <ModalUI
        {...modalProps}
        visible={localVisible}
        transparent={true}
        onRequestClose={props.handleClose}>
        <ButtonSheetContent {...props} />
      </ModalUI>
    </PortalContainer>
  );
};

export default React.memo(BottomSheetUI);
