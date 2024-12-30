import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

type Props = Pick<ServicesDetailModel, "emergency"> & {
  isPaddingLeft?: boolean;
};

const RIEmergency = ({ emergency, isPaddingLeft = true }: Props) => {
  if (!emergency) {
    return null;
  }
  return (
    <View style={[styles.container, !isPaddingLeft && styles.resetPaddingLeft]}>
      <Typography
        variant="h3"
        fontSize={17}
        lineHeight={20}
        fontWeight="600"
        style={styles.text}
        color={Colors.ERROR}>
        Срочная заявка
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingLeft: 15,
  },
  resetPaddingLeft: {
    paddingLeft: 0,
  },
  text: {},
});

export default React.memo(RIEmergency);
