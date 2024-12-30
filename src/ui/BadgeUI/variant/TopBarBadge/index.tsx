import React from "react";
import { StyleSheet } from "react-native";
import BadgeUI from "@app/ui/BadgeUI";

type Props = { count: number; isLast?: boolean };

const TopBarBadge = ({ count, isLast }: Props) => {
  return (
    <BadgeUI
      style={[styles.badge, isLast && styles.right]}
      count={count}
      isDisplay={count > 0}
    />
  );
};

const styles = StyleSheet.create({
  badge: {},
  right: {
    marginRight: 8,
  },
});

export default React.memo(TopBarBadge);
