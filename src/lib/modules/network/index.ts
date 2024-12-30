import { addEventListener, fetch } from "@react-native-community/netinfo";
import type { NetInfoState } from "@react-native-community/netinfo";

//? TYPES
export type NetworkInfoState = NetInfoState;

//? CONSTANTS
export const networkAddEventListener = addEventListener;
export const fetchNetworkInfo = fetch;
