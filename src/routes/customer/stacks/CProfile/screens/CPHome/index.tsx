import React from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import { ScrollView, StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT_IS_SMAL, Size } from "@app/lib/constants/size";
import About from "@app/components/About";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import { useAppSelector } from "@app/store/hooks";
import { user } from "@app/store/reducers";
import TabBar from "@app/components/TabBar";
import { CustomerRootSN } from "@app/routes/customer/types";
import HeaderUI from "@app/ui/HeaderUI";
import DeleteUserMe from "@app/components/DeleteUserMe";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";

const CPHome = () => {
  const { top } = useMarginBottom();
  const select = user.selectors.selectUserInfo<CustomerDetailModel>;
  const userInfo = useAppSelector(select);

  return (
    <TabBar activeRouteName={CustomerRootSN.PROFILE}>
      <ScreenContainer
        isSaveArea={false}
        top={top}>
        <HeaderUI
          right={{ variant: "logout" }}
          isBack={false}
        />
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
                  phone: `${userInfo?.id}`,
                  size: 104,
                  isDefault: true,
                }}
              />
            </View>
            <View style={styles.bottom}>
              <DeleteUserMe />
            </View>
          </ScrollView>
        )}
      </ScreenContainer>
    </TabBar>
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
    flexGrow: 1,
    paddingTop: DEVICE_HEIGHT_IS_SMAL ? 50 : 77,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  bottom: {
    flex: 0,
  },
});

export default React.memo(CPHome);
