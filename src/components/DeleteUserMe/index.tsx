import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "@app/ui/Typography";
import BasketIcon from "@app/assets/icons/BasketIcon.svg";
import { Colors } from "@app/theme/colors";
import { Font } from "@app/theme/font";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText";
import ToastUI from "@app/ui/ToastUI";
import { useDeleteUserMe } from "./useDeleteUserMe";

const DeleteUserMe = () => {
  const { toast, isOpen, onHideToast, handleOpen, handleClose, onSuccess } =
    useDeleteUserMe();

  return (
    <>
      <View style={styles.root}>
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
            Удалить аккаунт
          </Typography>
        </TouchableOpacity>
      </View>
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          bottomOffset: 80,
          onHide: onHideToast,
        }}
      />
      <PopupUI
        visible={isOpen}
        onSuccess={onSuccess}
        onClose={handleClose}>
        <PopupText>Вы уверены, что хотите удалить свой аккаунт?</PopupText>
      </PopupUI>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginBottom: 15,
  },
  press: {
    alignItems: "center",
  },
  basket: {
    marginBottom: 8,
  },
});

export default React.memo(DeleteUserMe);
