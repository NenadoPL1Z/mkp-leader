import { IS_DEV } from "@app/lib/constants";
import AppVersion from "@app/AppVersion.tsx";
import AppAuth from "./AppAuth";
import AppRootStack from "./AppRootStack";
import AppProvider from "./AppProvider";

if (IS_DEV) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("../reactotron.config.js");
}

const App = () => {
  return (
    <AppProvider>
      <AppVersion>
        <AppAuth>
          <AppRootStack />
        </AppAuth>
      </AppVersion>
    </AppProvider>
  );
};

export default App;
