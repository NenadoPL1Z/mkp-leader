import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import CPHome from "./screens/CPHome";
import { CProfileSN } from "./types";
import type { CProfileSPL } from "./types";

const NativeStack = createNativeStackNavigator<CProfileSPL>();

const CProfile = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={CProfileSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={CProfileSN.HOME}
        component={CPHome}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(CProfile);
