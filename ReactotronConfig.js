import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure() // controls connection & communication settings
  .useReactNative({
    asyncStorage: true,
    networking: { ignoreUrls: /symbolicate/ },
    editor: false, // there are more options to editor
    overlay: false, // just turning off overlay
  }) // add all built-in react native plugins
  .connect(); // let's connect!
