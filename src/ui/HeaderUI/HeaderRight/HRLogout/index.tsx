import { StyleSheet, TouchableOpacity } from "react-native";
import LogoutIcon from "@app/assets/icons/Logout.svg";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText";
import { useLogout } from "@app/hooks/useLogout";
import type { HRChildrenProps } from "@app/ui/HeaderUI/types";

const HRLogout = (props: HRChildrenProps) => {
  const {
    isOpen,
    isLoading,

    handleOpen,
    handleClose,

    onSuccess,
  } = useLogout();

  return (
    <>
      <TouchableOpacity
        {...props}
        style={styles.root}
        onPress={handleOpen}>
        <LogoutIcon />
      </TouchableOpacity>
      <PopupUI
        visible={isOpen}
        onSuccess={onSuccess}
        onClose={handleClose}
        successButtonProps={{ title: "Выйти", loading: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
        isBackdoorClose={!isLoading}>
        <PopupText>Вы уверены, что хотите выйти из аккаунта?</PopupText>
      </PopupUI>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HRLogout;
