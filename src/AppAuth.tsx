import React, { useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useAppSelector } from "@app/store/hooks";
import { loading, user } from "@app/store/reducers";
import { useStatusBar } from "@app/hooks/useStatusBar.ts";
import { Colors } from "@app/theme/colors.ts";
import Auth from "./components/Auth";
import type { ChildrenProps } from "@app/types/general";

const AppAuth = ({ children }: ChildrenProps) => {
  const isCheckAuth = useAppSelector(loading.selectors.selectAuth);
  const isAuth = useAppSelector(user.selectors.selectUserAuth);
  const userId = useAppSelector((state) => state.user.user.id);

  const isBooleanAuth = useMemo(() => typeof isAuth === "boolean", [isAuth]);

  const isDisplayAuth = useMemo(() => {
    return Boolean(isCheckAuth && isBooleanAuth && !isAuth);
  }, [isCheckAuth, isAuth]);

  const isDisplayApp = useMemo(() => {
    return Boolean(
      isCheckAuth && isBooleanAuth && isAuth && userId && !isDisplayAuth,
    );
  }, [isCheckAuth, isAuth, isDisplayAuth, userId]);

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
        <Auth />
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

export default React.memo(AppAuth);
