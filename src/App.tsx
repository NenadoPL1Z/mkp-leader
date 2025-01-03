import React from "react";
import { IS_DEV } from "@app/lib/constants";
import AppAuth from "./AppAuth";
import AppRootStack from "./AppRootStack";
import AppProvider from "./AppProvider";

if (IS_DEV) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("../ReactotronConfig.js");
}

const App = () => {
  return (
    <AppProvider>
      <AppAuth>
        <AppRootStack />
      </AppAuth>
    </AppProvider>
  );
};

export default App;
