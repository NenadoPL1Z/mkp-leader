import React from "react";
import { StyleSheet, View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";
import SortIcon from "@app/assets/icons/dist/SortIcon";
import { Colors } from "@app/theme/colors";
import type { SortButtonProps } from "./types";

const SortButton = (props: SortButtonProps) => {
  return (
    <View style={styles.container}>
      <ButtonUI
        {...props}
        variant="rounded">
        <SortIcon
          style={styles.icon}
          color={props?.disabled ? Colors.GRAY_TEN : Colors.WHITE}
        />
        {props.title}
      </ButtonUI>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 4,
  },
});

export default React.memo(SortButton);
