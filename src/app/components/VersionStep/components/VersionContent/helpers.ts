import { IS_IOS } from "@app/lib/constants";
import { Linking } from "react-native";
import type { VersionsDetails } from "@app/store/reducers/global/type.ts";

export const openStore = ({
  app_store_url,
  google_play_url,
}: VersionsDetails) => {
  const webUrl = IS_IOS ? app_store_url : google_play_url;
  Linking.openURL(webUrl);
};
