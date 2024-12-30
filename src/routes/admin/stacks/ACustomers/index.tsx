import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import ACEdit from "@app/routes/admin/stacks/ACustomers/screens/ACEdit";
import ACNew from "./screens/ACNew";
import ACHome from "./screens/ACHome";
import { ACustomersSN } from "./types";
import ACProfile from "./screens/ACProfile";
import ACAddress from "./screens/ACAddress";
import type { ACustomersSPL } from "./types";

const NativeStack = createNativeStackNavigator<ACustomersSPL>();

const ACustomers = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={ACustomersSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={ACustomersSN.HOME}
        component={ACHome}
      />
      <NativeStack.Screen
        name={ACustomersSN.PROFILE}
        component={ACProfile}
      />
      <NativeStack.Screen
        name={ACustomersSN.EDIT}
        component={ACEdit}
      />
      <NativeStack.Screen
        name={ACustomersSN.NEW}
        component={ACNew}
      />
      <NativeStack.Screen
        name={ACustomersSN.ADDRESS}
        component={ACAddress}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(ACustomers);
