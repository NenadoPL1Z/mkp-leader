import React from "react";
import ModalUI from "@app/ui/ModalUI/ModalUI.tsx";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import TouchableIconUI from "@app/ui/TouchableIconUI/TouchableIconUI.tsx";
import PrevIcon from "@app/assets/icons/PrevIcon.svg";
import { useStatusBar } from "@app/hooks/useStatusBar.ts";
import type { ModalUIProps } from "@app/ui/ModalUI/ModalUI.tsx";

export type ModalFullProps = ModalUIProps & {
  isClose?: boolean;
  backgroundColor?: string;
  onClose: () => void;
};

const ModalFull = ({
  onClose,
  children,
  isClose = false,
  backgroundColor = Colors.BLACK,
  ...props
}: ModalFullProps) => {
  useStatusBar(props.visible, {
    backgroundColor: Colors.BLACK,
    statusBar: "light-content",
  });

  return (
    <ModalUI
      {...props}
      onRequestClose={onClose}>
      <SafeAreaView style={[styles.safe, { backgroundColor }]}>
        {isClose && (
          <TouchableIconUI
            size={24}
            padding={10}
            Icon={PrevIcon}
            onPress={onClose}
            touchableProps={{
              style: { width: 48, paddingLeft: 15, marginTop: 10 },
            }}
          />
        )}
        <View style={styles.children}>{children}</View>
      </SafeAreaView>
    </ModalUI>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  children: { flex: 1 },
});

export default React.memo(ModalFull);
