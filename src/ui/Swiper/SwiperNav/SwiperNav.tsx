import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import { Size } from "@app/lib/constants/size";
import HeaderUI from "@app/ui/HeaderUI";
import Typography from "@app/ui/Typography";
import { ZIndex } from "@app/theme/zIndex";

type SwiperNavProps = {
  current: number;
  max: number;
  isNavigation: boolean;
  onClose: () => void;
};

const SwiperNav = ({ current, max, isNavigation, onClose }: SwiperNavProps) => {
  return (
    <View style={styles.root}>
      <HeaderUI onBack={onClose}>
        {isNavigation && (
          <View style={styles.navContainer}>
            <View style={styles.nav}>
              <Typography
                fontSize={15}
                lineHeight={20}
                fontWeight="400"
                color={Colors.WHITE}>
                {current + 1} из {max}
              </Typography>
            </View>
          </View>
        )}
      </HeaderUI>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: ZIndex.OVER,
  },
  navContainer: {
    height: "100%",
    justifyContent: "center",
  },
  nav: {
    minWidth: 65,
    height: 32,
    paddingVertical: 6,
    paddingHorizontal: 11,
    marginRight: Size.SCREEN_PADDING,

    alignItems: "center",

    backgroundColor: Colors.RGBA_GRAY,
    borderRadius: 80,
  },
});

export default React.memo(SwiperNav);
