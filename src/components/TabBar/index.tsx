import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTabBar } from "@app/components/TabBar/useTabBar";
import TBItem from "@app/components/TabBar/TBItem";
import { styles } from "./index.styles";
import type { TabBarProps } from "@app/components/TabBar/types";

const TabBar = ({ activeRouteName, children }: TabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const { data, onPress } = useTabBar();

  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      <View style={[styles.root, { height: styles.root.height + bottom }]}>
        <View style={styles.wrapper}>
          {data.map((item, index) => (
            <TBItem
              key={item.title}
              title={item.title}
              activeRouteName={activeRouteName}
              routeName={item.routeName}
              Icon={item.Icon}
              onPress={onPress}
              isFist={index === 0}
              isLast={index === data.length - 1}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default React.memo(TabBar);
