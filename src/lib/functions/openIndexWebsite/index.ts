import { Linking, Vibration } from "react-native";
import { INDEX_WEBSITE } from "@env";

const VIBRATION_TIMING = 100;

export const openIndexWebsite = () => {
  try {
    Vibration.vibrate(VIBRATION_TIMING);
    setTimeout(() => {
      Linking.openURL(INDEX_WEBSITE || "https://index-studio.ru");
    }, VIBRATION_TIMING);
  } catch {
    Linking.openURL(INDEX_WEBSITE || "https://index-studio.ru");
  }
};
