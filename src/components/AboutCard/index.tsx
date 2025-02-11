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
}: AboutCardProps) => {
  return (
    <TouchableOpacity
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
        <View style={styles.rightTop}>
          {!!badge?.counter && (
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
              fontWeight="600">
              {title}
            </Typography>
          </View>
          {!!badge && (
            <>
              <View style={styles.rightTopRight}>
                <BadgeUI
                  count={badge.counter_working}
                  isZero={true}
                />
              </View>
              <View style={styles.rightTopRight}>
                <BadgeUI
                  count={badge.counter_verifying}
                  isZero={true}
                  backgroundColor={Colors.GRAY_TWO}
                />
              </View>
            </>
          )}
        </View>
        <Typography
          numberOfLines={1}
          variant="h4">
          {subtitle}
        </Typography>
      </View>
      {children && <View style={styles.children}>{children}</View>}
    </TouchableOpacity>
  );
};

export default React.memo(AboutCard);
