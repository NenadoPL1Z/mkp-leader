import { Provider } from "react-redux";
import { store } from "@app/store/store";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "@app/theme/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Init } from "./components/Init";
import type { ChildrenProps } from "@app/types/general";

//? 1 - STORE
//? 2 - INIT LOGIC
//? 3 - THEME
//? 4 - Save area (IOS)
//? 5 - GESTURE

export const GeneralProvider = ({ children }: ChildrenProps) => {
  return (
    <Provider store={store}>
      <Init />
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {children}
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};
