import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import RIComments from "@app/routes/screens/RIComments";
import CRNew from "./screens/CRNew";
import CRInfo from "./screens/CRInfo";
import CRHome from "./screens/CRHome";
import { CRequestsSN } from "./types";
import type { CRequestsSPL } from "./types";

const NativeStack = createNativeStackNavigator<CRequestsSPL>();

const CRequests = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={CRequestsSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={CRequestsSN.HOME}
        component={CRHome}
      />
      <NativeStack.Screen
        name={CRequestsSN.INFO}
        component={CRInfo}
      />
      <NativeStack.Screen
        name={CRequestsSN.NEW}
        component={CRNew}
      />
      <NativeStack.Screen
        name={CRequestsSN.COMMENTS}
        component={RIComments}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(CRequests);
