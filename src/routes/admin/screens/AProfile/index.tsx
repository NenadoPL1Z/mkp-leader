import React from "react";
import { AdminRootSN } from "@app/routes/admin/types";
import TabBar from "@app/components/TabBar";
import HeaderUI from "@app/ui/HeaderUI";
import ScreenContainer from "@app/containers/ScreenContainer";
import About from "@app/components/About";
import { user } from "@app/store/reducers";
import { useAppSelector } from "@app/store/hooks";
import { StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT_IS_SMAL, Size } from "@app/lib/constants/size";
import DeleteUserMe from "@app/components/DeleteUserMe";

const select = user.selectors.selectUserInfo;

const AProfile = () => {
  const userInfo = useAppSelector(select);

  return (
    <TabBar activeRouteName={AdminRootSN.Profile}>
      <ScreenContainer>
        <HeaderUI
          right={{ variant: "logout" }}
          isBack={false}
        />
        <View style={styles.container}>
          <About
            title=""
            login={userInfo.username}
            avatar={{
              name: userInfo.username,
              phone: `${userInfo?.id}`,
              size: 104,
              isDefault: true,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <DeleteUserMe />
        </View>
      </ScreenContainer>
    </TabBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DEVICE_HEIGHT_IS_SMAL ? 50 : 77,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  bottom: {
    flex: 0,
    alignItems: "center",
  },
});

export default React.memo(AProfile);
