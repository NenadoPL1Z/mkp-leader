import { Modal, StyleSheet, View } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import { useAppSelector } from "@app/store/hooks";
import { useStatusBar } from "@app/hooks/useStatusBar.ts";
import UpdateVersion from "@app/components/UpdateVersion";
import type { ChildrenProps } from "@app/types/general.ts";

export const VersionStep = ({ children }: ChildrenProps) => {
  const version = useAppSelector((state) => state.global.version);
  const { isActual } = version;

  const isDisplayApp = typeof isActual === "boolean" && isActual;
  const isDisplayUpdate = typeof isActual === "boolean" && !isActual;

  useStatusBar(isDisplayUpdate, {
    backgroundColor: Colors.PRIMARY,
    statusBar: "light-content",
  });

  return (
    <View style={styles.container}>
      {isDisplayApp && children}
      <Modal
        animationType="slide"
        visible={isDisplayUpdate}>
        <UpdateVersion {...version} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.MAIN,
  },
});
