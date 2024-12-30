import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@app/ui/Typography";
import { Size } from "@app/lib/constants/size";

type Props = {
  title: string;
};

const BottomSheetTitle = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Typography
        fontSize={15}
        lineHeight={20}
        fontWeight="600">
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: Size.SCREEN_PADDING,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.memo(BottomSheetTitle);
