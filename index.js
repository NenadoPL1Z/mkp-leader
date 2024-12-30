import { AppRegistry } from "react-native";

import "./src/lib/helpers";

import App from "./src/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
