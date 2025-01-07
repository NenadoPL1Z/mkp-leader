import React from "react";
import { StyleSheet, View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";
import SortIcon from "@app/assets/icons/SortIcon.svg";
import { Colors } from "@app/theme/colors";
import type { SortButtonProps } from "./types";

const SortButton = (props: SortButtonProps) => {
  return (
    <View style={styles.container}>
      <ButtonUI
        {...props}
        variant="rounded">
        <SortIcon
          style={{
            marginRight: 4,
            color: props?.disabled ? Colors.GRAY_TEN : Colors.WHITE,
          }}
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
});

export default React.memo(SortButton);
