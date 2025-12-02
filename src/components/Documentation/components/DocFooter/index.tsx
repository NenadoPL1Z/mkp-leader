import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DocFooter = () => {
  const { bottom } = useSafeAreaInsets();
  return (
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
