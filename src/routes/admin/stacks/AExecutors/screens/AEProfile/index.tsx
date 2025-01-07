import React from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import About from "@app/components/About";
import HeaderUI from "@app/ui/HeaderUI";
import { Colors } from "@app/theme/colors";
import { StyleSheet, View } from "react-native";
import DeleteUser from "@app/components/DeleteUser";
import { useAEProfile } from "@app/routes/admin/stacks/AExecutors/screens/AEProfile/useAEProfile";
import ToastUI from "@app/ui/ToastUI";
import { DEVICE_HEIGHT_IS_SMAL, Size } from "@app/lib/constants/size";
import type { AEProfileProps } from "@app/routes/admin/stacks/AExecutors/types";

const AEProfile = (props: AEProfileProps) => {
  const { userInfo, toast, onHideToast, onPushEdit, handleDeleteUser } =
    useAEProfile(props);

  return (
    <ScreenContainer>
      <HeaderUI
        right={{
          variant: "edit",
          onPress: onPushEdit,
          iconProps: { color: Colors.GRAY_TEN },
        }}
      />
      <View style={styles.container}>
        <View style={styles.top}>
          <About
            title={userInfo.name}
            phone={userInfo.phone}
            login={userInfo.username}
            avatar={{
              name: userInfo.name,
              phone: userInfo.phone,
              size: 104,
              avatarProps: {},
            }}
          />
        </View>
        <View style={styles.bottom}>
          <DeleteUser
            title="исполнителя"
            user={userInfo}
            callback={handleDeleteUser}
          />
        </View>
      </View>
      <ToastUI
        params={{
          isVisible: !!toast,
          ...toast,
          bottomOffset: Size.BUTTON + 20,
          onHide: onHideToast,
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: DEVICE_HEIGHT_IS_SMAL ? 50 : 77,
    paddingHorizontal: Size.SCREEN_PADDING,
    flexGrow: 1,
  },
  bottom: {
    flex: 0,
    alignItems: "center",
  },
});

export default React.memo(AEProfile);
