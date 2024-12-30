import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import AMRequests from "./screens/AMRequests";
import AMHome from "./screens/AMHome";
import { AMainSN } from "./types";
import type { AMainSPL } from "./types";

const NativeStack = createNativeStackNavigator<AMainSPL>();

const AMain = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={AMainSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={AMainSN.HOME}
        component={AMHome}
      />
      <NativeStack.Screen
        name={AMainSN.REQUESTS}
        component={AMRequests}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(AMain);
