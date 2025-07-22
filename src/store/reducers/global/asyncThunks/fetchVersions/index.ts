import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, IS_IOS } from "@app/lib/constants";
import { getVersion } from "react-native-device-info";
import type { VersionsDetails, VersionGlobal } from "../../type";
import type { Store } from "@app/store/store";

const currentVersion = getVersion();

export const fetchVersions = createAsyncThunk<VersionGlobal, void, Store>(
  "global/fetchVersions",
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get<VersionsDetails>("/versions", {
        baseURL: BASE_URL,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });

      const actualVersion = IS_IOS
        ? response.data.app_store_version
        : response.data.google_play_version;

      const isActual = currentVersion === actualVersion;

      return {
        isActual,
        actualVersion,
        currentVersion,
        details: response.data,
      };
    } catch {
      return rejectWithValue({
        isActual: true,
        actualVersion: "2.0.0",
        currentVersion: "2.0.0",
        details: {
          google_play_version: "",
          google_play_url: "",
          app_store_version: "",
          app_store_url: "",
        },
      });
    }
  },
);
