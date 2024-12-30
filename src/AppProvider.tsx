import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "@app/store/store";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "@app/theme/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InitLayout from "@app/layout/init";
import type { ChildrenProps } from "@app/types/general";

//? 1 - STORE
//? 2 - INIT LOGIC
//? 3 - THEME
//? 4 - Save area (IOS)
//? 5 - GESTURE

const AppProvider = ({ children }: ChildrenProps) => {
  return (
    <Provider store={store}>
      <InitLayout />
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.flex}>
            {children}
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default React.memo(AppProvider);
