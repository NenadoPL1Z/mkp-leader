import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabBarScreenOptions } from "@app/lib/constants/screen";
import NavigationLayout from "@app/layout/NavigationLayout";
import AProfile from "@app/routes/admin/screens/AProfile";
import { AdminRootSN } from "./types";
import ACustomers from "./stacks/ACustomers";
import AExecutors from "./stacks/AExecutors";
import AMain from "./stacks/AMain";
import type { AdminRootSPL } from "./types";

const Tab = createBottomTabNavigator<AdminRootSPL>();

const AdminRootStack = () => {
  return (
    <NavigationLayout>
      <Tab.Navigator
        tabBar={() => null}
        initialRouteName={AdminRootSN.MAIN}
        screenOptions={tabBarScreenOptions}>
        <Tab.Screen
          name={AdminRootSN.EXECUTORS}
          component={AExecutors}
        />
        <Tab.Screen
          name={AdminRootSN.MAIN}
          component={AMain}
        />
        <Tab.Screen
          name={AdminRootSN.Profile}
          component={AProfile}
        />
        <Tab.Screen
          name={AdminRootSN.CUSTOMER}
          component={ACustomers}
        />
      </Tab.Navigator>
    </NavigationLayout>
  );
};

export default React.memo(AdminRootStack);
