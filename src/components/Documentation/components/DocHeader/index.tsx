import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PrevIcon from "@app/assets/icons/PrevIcon.svg";
import { Colors } from "@app/theme/colors";
import LogoIcon from "@app/assets/icons/Logo.svg";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import { getVersion } from "react-native-device-info";
import { Size } from "@app/lib/constants/size";

type Props = {
  onClose: () => void;
};

const DocHeader = ({ onClose }: Props) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerItem}
          onPress={onClose}>
          <PrevIcon
            width={24}
            height={24}
            style={{ color: Colors.GRAY_TEN }}
          />
        </TouchableOpacity>
        <LogoIcon />
        <View style={styles.headerItem} />
      </View>
      <View style={styles.version}>
        <Typography
          variant="h4"
          fontSize={15}
          lineHeight={20}
          fontFamily={Font.TEXT}
          fontWeight="400"
          color={Colors.GRAY_SEVEN}>
          Версия {getVersion()}
        </Typography>
      </View>
    </>
  );
};

const headerWidth = 24 + Size.SCREEN_PADDING * 2;

const styles = StyleSheet.create({
  header: {
    flex: 0,
    height: Size.HEADER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerItem: {
    width: headerWidth,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  version: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});

export default React.memo(DocHeader);
