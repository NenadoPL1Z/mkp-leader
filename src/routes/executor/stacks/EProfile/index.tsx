import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import EPHome from "./screens/EPHome";
import { EProfileSN } from "./types";
import type { EProfileSPL } from "./types";

const NativeStack = createNativeStackNavigator<EProfileSPL>();

const EProfile = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={EProfileSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={EProfileSN.HOME}
        component={EPHome}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(EProfile);
