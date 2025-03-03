import { StatusBar } from "react-native";
import { useAppSelector } from "@app/store/hooks";

export const StatusBarInit = () => {
  const { backgroundColor, statusBar } = useAppSelector(
    (state) => state.global.statusBar,
  );

  return (
    <StatusBar
      animated={true}
      showHideTransition="fade"
      backgroundColor={backgroundColor}
      barStyle={statusBar || "light-content"}
    />
  );
};
