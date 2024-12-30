import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import AENew from "@app/routes/admin/stacks/AExecutors/screens/AENew";
import AEProfile from "./screens/AEProfile";
import AEHome from "./screens/AEHome";
import { AExecutorsSN } from "./types";
import AEEdit from "./screens/AEEdit";
import type { AExecutorsSPL } from "./types";

const NativeStack = createNativeStackNavigator<AExecutorsSPL>();

const AExecutors = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={AExecutorsSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={AExecutorsSN.HOME}
        component={AEHome}
      />
      <NativeStack.Screen
        name={AExecutorsSN.NEW}
        component={AENew}
      />
      <NativeStack.Screen
        name={AExecutorsSN.PROFILE}
        component={AEProfile}
      />
      <NativeStack.Screen
        name={AExecutorsSN.EDIT}
        component={AEEdit}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(AExecutors);
