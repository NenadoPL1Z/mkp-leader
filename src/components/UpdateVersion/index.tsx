import React from "react";
import { Text, View } from "react-native";
import type { VersionGlobal } from "@app/store/reducers/global/type.ts";

const UpdateVersion = ({ details }: VersionGlobal) => {
  return (
    <View>
      <Text>{JSON.stringify(details)}</Text>
    </View>
  );
};

export default React.memo(UpdateVersion);
