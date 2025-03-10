import React from "react";
import { Pressable, SafeAreaView, View, Animated } from "react-native";

import ModalUI from "@app/ui/ModalUI/ModalUI";
import ButtonUI from "@app/ui/ButtonUI";
import { styles } from "./index.styles";
import { usePopupUI } from "./usePopupUI";
import type { PopupUIProps } from "./types";

const PopupUI = ({
  isSuccess = true,
  visible,
  children,
  onSuccess,
  isBackdoorClose = true,
  containerStyle = {},
  innerContainerStyle = {},
  wrapperStyle = {},
  cancelButtonProps = {},
  successButtonProps = {},
  onClose,
  ModalChildren,
  ...modalProps
}: PopupUIProps) => {
  const { handleClose, animatedStyles, opacityBackdoorStyles } = usePopupUI({
    visible,
    onClose,
  });

  return (
    <ModalUI
      visible={visible}
      {...modalProps}
      onRequestClose={handleClose}
      transparent={true}>
      <View style={[styles.container, containerStyle]}>
        <Animated.View
          style={[styles.innerContainer, innerContainerStyle, animatedStyles]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={[styles.wrapper, wrapperStyle]}>
              <View style={styles.contentContainer}>{children}</View>
              <View style={styles.bottom}>
                <ButtonUI
                  variant={isSuccess ? "disabled" : "base"}
                  title={isSuccess ? "Отмена" : "Закрыть"}
                  {...cancelButtonProps}
                  containerStyle={[
                    styles.button,
                    cancelButtonProps?.containerStyle,
                  ]}
                  onPress={handleClose}
                />
                {isSuccess && (
                  <ButtonUI
                    title="Удалить"
                    {...successButtonProps}
                    containerStyle={[
                      styles.button,
                      successButtonProps?.containerStyle,
                    ]}
                    onPress={onSuccess}
                  />
                )}
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
        <Animated.View style={[styles.backdoor, opacityBackdoorStyles]}>
          <Pressable
            onPress={isBackdoorClose ? handleClose : undefined}
            style={styles.pressable}
          />
        </Animated.View>
      </View>
      {ModalChildren && <ModalChildren />}
    </ModalUI>
  );
};

export default React.memo(PopupUI);
