import React, { useMemo } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "@app/theme/colors";
import KeyboardContainer from "../KeyboardContainer";
import type { ChildrenProps } from "@app/types/general";

type Props = ChildrenProps<
  Partial<{
    isAvoid: boolean;
    isSaveArea: boolean;
    top: number;
    bottom: number;
  }>
>;

const ScreenContainer = (props: Props) => {
  const { isAvoid = false, isSaveArea = true, top, bottom } = props;

  const SafeArea = useMemo(
    () => (isSaveArea ? SafeAreaView : View),
    [isSaveArea],
  );
  const Avoid = useMemo(() => {
    return isAvoid ? KeyboardContainer : React.Fragment;
  }, [isAvoid]);

  return (
    <SafeArea style={[styles.root, { paddingTop: top, paddingBottom: bottom }]}>
      <Avoid>{props.children}</Avoid>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});

export default React.memo(ScreenContainer);
