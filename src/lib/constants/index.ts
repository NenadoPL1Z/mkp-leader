import { BASE_URL_DEV, BASE_URL_PATH, BASE_URL_PROD } from "@env";
import { Platform } from "react-native";

export const IS_DEV = __DEV__;
export const IS_PROD = !IS_DEV;
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const BASE_URL = IS_DEV ? BASE_URL_DEV : BASE_URL_PROD;
export const API_URL = BASE_URL + BASE_URL_PATH;

export const TIMEOUT = 40000;
export const TIMEOUT_FILES = 60000 * 15;
export const PAGE_LIMIT = 100;
