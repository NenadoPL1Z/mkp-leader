import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import RIComments from "@app/routes/screens/RIComments";
import { AMRequestsSN } from "./types";
import AMRHome from "./screens/AMRHome";
import AMRInfo from "./screens/AMRInfo";
import AMRExecutor from "./screens/AMRExecutor";
import type { AMRequestsSPL } from "./types";

const NativeStack = createNativeStackNavigator<AMRequestsSPL>();

const AMRequests = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={AMRequestsSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={AMRequestsSN.HOME}
        component={AMRHome}
      />
      <NativeStack.Screen
        name={AMRequestsSN.INFO}
        component={AMRInfo}
      />
      <NativeStack.Screen
        name={AMRequestsSN.EXECUTOR}
        component={AMRExecutor}
      />
      <NativeStack.Screen
        name={AMRequestsSN.COMMENTS}
        component={RIComments}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(AMRequests);
