import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "@app/ui/Typography";
import BasketIcon from "@app/assets/icons/BasketIcon.svg";
import { Colors } from "@app/theme/colors";
import { Font } from "@app/theme/font";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText";
import ToastUI from "@app/ui/ToastUI";
import { useDeleteUser } from "./useDeleteUser";
import type { DeleteUserProps } from "./types";

const DeleteUser = (props: DeleteUserProps) => {
  const { title } = props;
  const { bottom, offset } = useMarginBottom();

  const {
    toast,
    isOpen,
    isLoading,

    onHideToast,
    handleOpen,
    handleClose,

    onSuccess,
  } = useDeleteUser(props);

  return (
    <>
      <View style={[styles.root, { marginBottom: offset }]}>
        <TouchableOpacity
          style={styles.press}
          onPress={handleOpen}>
          <View style={styles.basket}>
            <BasketIcon color="red" />
          </View>
          <Typography
            fontFamily={Font.TEXT}
            fontSize={13}
            lineHeight={15}
            fontWeight="400"
            color={Colors.ERROR}>
            Удалить {title}
          </Typography>
        </TouchableOpacity>
      </View>
      <PopupUI
        visible={isOpen}
        onSuccess={onSuccess}
        onClose={handleClose}
        successButtonProps={{ loading: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
        isBackdoorClose={!isLoading}
        ModalChildren={() => (
          <ToastUI
            params={{
              ...toast,
              isVisible: !!toast,
              bottomOffset: bottom,
              onHide: onHideToast,
            }}
          />
        )}>
        <PopupText>
          Вы уверены, что хотите удалить данные пользователя?
        </PopupText>
      </PopupUI>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  press: {
    alignItems: "center",
  },
  basket: {
    marginBottom: 8,
  },
});

export default React.memo(DeleteUser);
