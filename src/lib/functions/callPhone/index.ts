import { Linking } from "react-native";

export const callPhone = (phone: string) => {
  Linking.openURL(`tel:${phone}`);
};
