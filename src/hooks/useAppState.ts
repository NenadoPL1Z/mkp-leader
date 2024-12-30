import { AppState } from "react-native";
import { useEffect, useRef, useState } from "react";
import type { AppStateStatus } from "react-native";

export const useAppState = () => {
  const prevState = useRef<AppStateStatus>(AppState.currentState);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState<AppStateStatus>(
    appState.current,
  );
  const isActive = appStateVisible === "active";
  const isInactive = appStateVisible === "inactive";
  const isBackground = appStateVisible === "background";

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      prevState.current = appState.current;
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    prevState: prevState.current,
    appState: appState.current,
    appStateVisible,

    isActive,
    isInactive,
    isBackground,
  };
};
