import React from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import TabBar from "@app/components/TabBar";
import { ExecutorRootSN } from "@app/routes/executor/types";
import { StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT_IS_SMAL, Size } from "@app/lib/constants/size";
import { useAppSelector } from "@app/store/hooks";
import { user } from "@app/store/reducers";
import HeaderUI from "@app/ui/HeaderUI";
import About from "@app/components/About";
import DeleteUserMe from "@app/components/DeleteUserMe";

const EPHome = () => {
  const userInfo = useAppSelector(user.selectors.selectUserInfo);
  const name = userInfo.name || "";
  const phone = userInfo.phone || "";

  return (
    <TabBar activeRouteName={ExecutorRootSN.PROFILE}>
      <ScreenContainer>
        <HeaderUI
          isBack={false}
          right={{ variant: "logout" }}
        />
        <View style={styles.container}>
          <View style={styles.top}>
            <About
              title={name}
              phone={phone}
              login={userInfo.username}
              avatar={{
                name,
                phone,
                size: 104,
                avatarProps: {},
              }}
            />
          </View>
          <View style={styles.bottom}>
            <DeleteUserMe />
          </View>
        </View>
      </ScreenContainer>
    </TabBar>
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

export default React.memo(EPHome);
