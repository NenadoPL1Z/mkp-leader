import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabBarScreenOptions } from "@app/lib/constants/screen";
import NavigationLayout from "@app/layout/NavigationLayout";
import EMain from "./stacks/EMain";
import EProfile from "./stacks/EProfile";
import { ExecutorRootSN } from "./types";
import type { ExecutorRootSPL } from "./types";

const Tab = createBottomTabNavigator<ExecutorRootSPL>();

const ExecutorRootStack = () => {
  return (
    <NavigationLayout>
      <Tab.Navigator
        tabBar={() => null}
        initialRouteName={ExecutorRootSN.MAIN}
        screenOptions={tabBarScreenOptions}>
        <Tab.Screen
          name={ExecutorRootSN.MAIN}
          component={EMain}
        />
        <Tab.Screen
          name={ExecutorRootSN.PROFILE}
          component={EProfile}
        />
      </Tab.Navigator>
    </NavigationLayout>
  );
};

export default React.memo(ExecutorRootStack);
