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
import HREdit from "@app/ui/HeaderUI/HeaderRight/HREdit";
import { SelectExecutorDefault } from "./components/SelectExecutorDefault";
import type { AEProfileProps } from "@app/routes/admin/stacks/AExecutors/types";

const AEProfile = (props: AEProfileProps) => {
  const {
    executorDefaultId,
    userInfo,
    toast,
    onHideToast,
    onPushEdit,
    handleDeleteUser,
    handleSelectExecutorDefault,
  } = useAEProfile(props);

  return (
    <ScreenContainer>
      <HeaderUI>
        <View style={styles.header}>
          <SelectExecutorDefault
            executor={userInfo}
            isDefaultExecutor={userInfo.id === executorDefaultId}
            handleSelectExecutorDefault={handleSelectExecutorDefault}
          />
          <HREdit
            onPress={onPushEdit}
            iconProps={{ color: Colors.GRAY_TEN }}
          />
        </View>
      </HeaderUI>
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
          bottomOffset: Size.BUTTON + 50,
          onHide: onHideToast,
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingRight: Size.SCREEN_PADDING,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
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
