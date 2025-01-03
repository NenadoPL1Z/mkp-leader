import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative({
    devTools: true,
    asyncStorage: true,
    networking: { ignoreUrls: /symbolicate/ },
    editor: false,
    overlay: false,
  })
  .connect();
