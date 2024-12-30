import AsyncStorage from "@react-native-async-storage/async-storage";

import type { AsyncStorageKeysType, MultiAsyncStorageKeysType } from "./types";

const getItemAsyncStorage = async (key: AsyncStorageKeysType) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

const setItemAsyncStorage = async (
  key: AsyncStorageKeysType,
  value: string,
) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch {
    return null;
  }
};

const removeItemAsyncStorage = async (key: AsyncStorageKeysType) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch {
    return null;
  }
};

const multiGetItemAsyncStorage = async (keys: AsyncStorageKeysType[]) => {
  try {
    return await AsyncStorage.multiGet(keys);
  } catch {
    return null;
  }
};

const multiSetItemAsyncStorage = async (keys: MultiAsyncStorageKeysType[]) => {
  try {
    return await AsyncStorage.multiSet(keys);
  } catch {
    return null;
  }
};

const multiRemoveItemAsyncStorage = async (keys: AsyncStorageKeysType[]) => {
  try {
    return await AsyncStorage.multiRemove(keys);
  } catch {
    return null;
  }
};

const clearAsyncStorage = async () => {
  try {
    return await AsyncStorage.clear();
  } catch {
    return null;
  }
};

export const asyncStorage = {
  getItemAsyncStorage,
  setItemAsyncStorage,
  removeItemAsyncStorage,
  clearAsyncStorage,
  multiGetItemAsyncStorage,
  multiSetItemAsyncStorage,
  multiRemoveItemAsyncStorage,
};
