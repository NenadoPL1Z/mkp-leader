import React from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import HeaderUI from "@app/ui/HeaderUI";
import { Colors } from "@app/theme/colors";
import { ScrollView, StyleSheet, View } from "react-native";
import ToastUI from "@app/ui/ToastUI";
import { DEVICE_HEIGHT_IS_SMAL, Size } from "@app/lib/constants/size";
import DeleteUser from "@app/components/DeleteUser";
import StatusContainer from "@app/containers/StatusContainer";
import About from "@app/components/About";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import { useACProfile } from "./useACProfile";
import type { ACProfileProps } from "@app/routes/admin/stacks/ACustomers/types";

const ACProfile = (props: ACProfileProps) => {
  const {
    userInfo,
    isLoading,
    isError,
    toast,
    loadData,
    onHideToast,
    onPushEdit,
    handleDeleteUser,
  } = useACProfile(props);

  const { top, bottom } = useMarginBottom();

  return (
    <ScreenContainer
      isSaveArea={false}
      top={top}>
      <HeaderUI
        right={{
          variant: "edit",
          onPress: onPushEdit,
          iconProps: { color: Colors.GRAY_TEN },
        }}
      />
      <StatusContainer
        isLoading={isLoading}
        isError={isError}
        errorProps={{ onPress: loadData }}
        loadingProps={{
          containerProps: { style: { marginBottom: Size.HEADER } },
        }}>
        {userInfo && (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.top}>
              <About
                title={userInfo.customer_company.name}
                address={userInfo.customer_company.address || ""}
                login={userInfo.username}
                company={userInfo.customer_company}
                avatar={{
                  name: userInfo.customer_company.name,
                  phone: `${userInfo?.customer_company?.id}`,
                  size: 104,
                  isDefault: true,
                }}
              />
            </View>
            <View style={[styles.bottom, { paddingBottom: bottom }]}>
              <DeleteUser
                title="заказчика"
                user={userInfo}
                callback={handleDeleteUser}
              />
            </View>
          </ScrollView>
        )}
      </StatusContainer>
      <ToastUI
        params={{
          isVisible: !!toast,
          ...toast,
          bottomOffset: bottom,
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
  contentContainerStyle: {
    flexGrow: 1,
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

export default React.memo(ACProfile);
