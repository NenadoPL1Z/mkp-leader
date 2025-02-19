import React from "react";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import { EMRequestsSN } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RIComments from "@app/routes/screens/RIComments";
import EMRHome from "./screens/EMRHome";
import EMRInfo from "./screens/EMRInfo";
import type { EMRequestsSPL } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";

const NativeStack = createNativeStackNavigator<EMRequestsSPL>();

const EMRequests = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={EMRequestsSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={EMRequestsSN.HOME}
        component={EMRHome}
      />
      <NativeStack.Screen
        name={EMRequestsSN.INFO}
        component={EMRInfo}
      />
      <NativeStack.Screen
        name={EMRequestsSN.INFO}
        component={EMRInfo}
      />
      <NativeStack.Screen
        name={EMRequestsSN.COMMENTS}
        component={RIComments}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(EMRequests);
