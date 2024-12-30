import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Typography from "@app/ui/Typography";
import { styles } from "./styles";
import type { Option } from "@app/types/general";

type Props = {
  value: Option;
  options: Option[];
  colors: string[];
  onSelect: (data: Option) => void;
};

const duration = 350;

const SwitchUI = ({ value, options, colors, onSelect }: Props) => {
  const firstAnim = useRef(true);
  const findIndex = options.findIndex((item) => item.value === value?.value);

  const left = useSharedValue(`${findIndex}%`);
  const textOpacity = useSharedValue(1);

  const elementWidth = Math.ceil(100 / options.length);
  const offsetLeft = Math.ceil(elementWidth * findIndex);
  const color = colors[findIndex];

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${elementWidth}%`,
    left: left.value as never,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    left.value = withTiming(`${offsetLeft}%`, {
      duration: firstAnim.current ? 0 : duration,
    });
    textOpacity.value = withTiming(1, { duration: duration / 0.4 });
    firstAnim.current = false;
  }, [value]);

  return (
    <View style={styles.root}>
      <View style={styles.option}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            onPress={() => {
              textOpacity.value = withTiming(0, { duration: 0 });
              onSelect(item);
            }}>
            <Typography
              fontSize={17}
              lineHeight={20}
              fontWeight="400">
              {item.label}
            </Typography>
          </TouchableOpacity>
        ))}
        <Animated.View style={[styles.active, animatedStyle]}>
          <Animated.Text
            style={[styles.activeText, textAnimatedStyle, { color }]}>
            {value.label}
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default React.memo(SwitchUI);
