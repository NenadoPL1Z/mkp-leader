import React from "react";
import { TouchableOpacity, View } from "react-native";
import AvatarUI from "@app/ui/AvatarUI";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import BadgeUI from "@app/ui/BadgeUI";
import { Colors } from "@app/theme/colors.ts";
import { styles } from "./styles";
import type { AboutCardProps } from "./types";

const AboutCard = ({
  containerStyle,
  title,
  subtitle,
  avatar,
  badge,
  onPress,
  marginBottom,
  children,
  isShadow = true,
  isTouch = true,
  isPadding = true,
  isDisplayMark = false,
  titleProps,
}: AboutCardProps) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.root,
        isShadow && styles.shadow,
        !isPadding && styles.resetPadding,
        { marginBottom: marginBottom ?? styles.root.marginBottom },
        containerStyle,
      ]}
      activeOpacity={isTouch ? undefined : 1}>
      <View style={styles.left}>
        <AvatarUI {...avatar} />
      </View>
      <View style={styles.right}>
        <View style={[styles.rightTop, !!badge && styles.rightTopMax]}>
          {isDisplayMark && (
            <View style={styles.rightTopLeft}>
              <BadgeUI size={12} />
            </View>
          )}
          <View style={styles.rightTopMiddle}>
            <Typography
              numberOfLines={1}
              fontFamily={Font.TEXT}
              fontSize={15}
              lineHeight={20}
              fontWeight="600"
              color={Colors.WHITE}
              {...titleProps}>
              {title}
            </Typography>
          </View>
        </View>
        <Typography
          numberOfLines={1}
          variant="h4"
          color={Colors.WHITE}>
          {subtitle}
        </Typography>
      </View>
      {children && <View style={styles.children}>{children}</View>}
    </TouchableOpacity>
  );
};

export default React.memo(AboutCard);
