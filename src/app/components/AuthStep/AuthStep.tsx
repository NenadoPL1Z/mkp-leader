import { Modal, StyleSheet, View } from "react-native";
import { useAppSelector } from "@app/store/hooks";
import { loading, user } from "@app/store/reducers";
import { useStatusBar } from "@app/hooks/useStatusBar.ts";
import { Colors } from "@app/theme/colors.ts";
import { AuthContent } from "./components";
import type { ChildrenProps } from "@app/types/general";

export const AuthStep = ({ children }: ChildrenProps) => {
  const isCheckAuth = useAppSelector(loading.selectors.selectAuth);
  const isAuth = useAppSelector(user.selectors.selectUserAuth);
  const userId = useAppSelector((state) => state.user.user.id);
  const isActualVersion = useAppSelector(
    (state) => state.global.version.isActual,
  );

  const isBooleanAuth = typeof isAuth === "boolean";

  const isDisplayAuth = Boolean(
    isActualVersion && isCheckAuth && isBooleanAuth && !isAuth,
  );

  const isDisplayApp = Boolean(
    isActualVersion &&
      isCheckAuth &&
      isBooleanAuth &&
      isAuth &&
      userId &&
      !isDisplayAuth,
  );

  useStatusBar(isDisplayAuth, {
    backgroundColor: Colors.PRIMARY,
    statusBar: "light-content",
  });

  return (
    <View style={styles.container}>
      {isDisplayApp && children}
      <Modal
        animationType="slide"
        visible={isDisplayAuth}>
        <AuthContent />
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
