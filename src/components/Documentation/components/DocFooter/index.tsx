import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { openIndexWebsite } from "@app/lib/functions/openIndexWebsite";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DocFooter = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.footer, { paddingBottom: bottom ? 0 : 10 }]}>
      <Typography
        variant="h4"
        fontWeight="400"
        fontSize={15}
        lineHeight={20}
        style={styles.footerItem}
        color={Colors.GRAY_ELEVEN}>
        © ООО «МКП Лидер»
      </Typography>
      <Typography
        variant="h4"
        fontWeight="400"
        fontSize={15}
        lineHeight={20}
        color={Colors.GRAY_ELEVEN}>
        Разработано{" "}
        <Typography
          variant="h4"
          fontWeight="400"
          fontSize={15}
          lineHeight={20}
          color={Colors.GRAY_ELEVEN}
          style={styles.url}
          onPress={openIndexWebsite}>
          INDEX studio
        </Typography>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  footerItem: {
    marginBottom: 8,
  },
  url: {
    textDecorationLine: "underline",
  },
});

export default React.memo(DocFooter);
