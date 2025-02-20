import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nativeScreenOptions } from "@app/lib/constants/screen";
import RICAddComment from "./screens/RICAddComment";
import RICHome from "./screens/RICHome";
import { RICommentsSN } from "./types";
import type { RICommentsSPL } from "./types";

const NativeStack = createNativeStackNavigator<RICommentsSPL>();

const RICComments = () => {
  return (
    <NativeStack.Navigator
      initialRouteName={RICommentsSN.HOME}
      screenOptions={nativeScreenOptions}>
      <NativeStack.Screen
        name={RICommentsSN.HOME}
        component={RICHome}
      />
      <NativeStack.Screen
        name={RICommentsSN.ADD_COMMENT}
        component={RICAddComment}
      />
    </NativeStack.Navigator>
  );
};

export default React.memo(RICComments);
