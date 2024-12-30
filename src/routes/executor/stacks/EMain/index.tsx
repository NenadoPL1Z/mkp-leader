import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import EMHome from "./screens/EMHome";
import { EMainSN } from "./types";
import EMRequests from "./screens/EMRequests";
import type { ERMainSPL } from "./types";

const NativeStack = createNativeStackNavigator<ERMainSPL>();

const EMain = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={EMainSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={EMainSN.HOME}
        component={EMHome}
      />
      <NativeStack.Screen
        name={EMainSN.REQUESTS}
        component={EMRequests}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(EMain);
