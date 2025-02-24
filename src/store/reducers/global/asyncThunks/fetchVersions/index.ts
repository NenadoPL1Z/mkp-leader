import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, IS_IOS } from "@app/lib/constants";
import { getVersion } from "react-native-device-info";
import type { VersionsDetails, VersionGlobal } from "../../type";
import type { Store } from "@app/store/store";

const currentVersion = getVersion();

export const fetchVersions = createAsyncThunk<VersionGlobal, void, Store>(
  "user/fetchUserMe",
  async (_, { extra: api }) => {
    const response = await api.get<VersionsDetails>("/versions", {
      baseURL: BASE_URL,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    const platformVersion = IS_IOS
      ? response.data.app_store_version
      : response.data.google_play_version;
    const isActual = currentVersion === platformVersion;

    return {
      isActual,
      currentVersion,
      details: response.data,
    };
  },
);
