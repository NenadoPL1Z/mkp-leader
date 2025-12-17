import React from "react";
import { TouchableOpacity, View } from "react-native";
import { PrevIcon } from "@app/assets/icons/dist";
import { useNavigation } from "@react-navigation/native";
import Typography from "@app/ui/Typography";
import HeaderRight from "@app/ui/HeaderUI/HeaderRight";
import { Colors } from "@app/theme/colors";
import { LinearGradient } from "react-native-linear-gradient";
import { styles } from "./index.styles";
import type { HeaderUIProps } from "./types";

const HeaderUI = ({
  title = "",
  isBack = true,
  isOverLinear = false,
  onBack,
  children,
  right = {},
}: HeaderUIProps) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {isBack && (
          <TouchableOpacity
            style={styles.leftPress}
            onPress={onBack ? onBack : goBack}>
            <PrevIcon color={Colors.GRAY_TEN} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.middle}>
        <Typography
          style={styles.middleText}
          numberOfLines={1}
          fontWeight="600"
          variant="h2"
          color={Colors.WHITE}>
          {title}
        </Typography>
        {isOverLinear && (
          <View style={styles.linearContainer}>
            <LinearGradient
              style={styles.linear}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                "linear-gradient(#FFFFFF 56.97%, rgba(0, 41, 58, 0) 100%)",
                Colors.DARK_SECONDARY_TWO,
                Colors.DARK_SECONDARY_TWO,
              ]}
            />
          </View>
        )}
      </View>
      {!children && (
        <View
          style={[
            styles.right,
            right?.variant === "edit" || right?.variant === "text"
              ? styles.rightAuto
              : {},
          ]}>
          <HeaderRight {...right} />
        </View>
      )}
      {children && children}
    </View>
  );
};

export default React.memo(HeaderUI);
