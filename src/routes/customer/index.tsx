import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabBarScreenOptions } from "@app/lib/constants/screen";
import NavigationLayout from "@app/layout/NavigationLayout";
import CRequests from "./stacks/CRequests";
import CProfile from "./stacks/CProfile";
import { CustomerRootSN } from "./types";
import type { CustomerRootSPL } from "./types";

const NativeStack = createBottomTabNavigator<CustomerRootSPL>();

const CustomerRootStack = () => {
  return (
    <NavigationLayout>
      <NativeStack.Navigator
        tabBar={() => null}
        initialRouteName={CustomerRootSN.REQUESTS}
        screenOptions={tabBarScreenOptions}>
        <NativeStack.Screen
          name={CustomerRootSN.REQUESTS}
          component={CRequests}
        />
        <NativeStack.Screen
          name={CustomerRootSN.PROFILE}
          component={CProfile}
        />
      </NativeStack.Navigator>
    </NavigationLayout>
  );
};

export default React.memo(CustomerRootStack);
