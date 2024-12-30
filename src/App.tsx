import React from "react";
import AppAuth from "./AppAuth";
import AppRootStack from "./AppRootStack";
import AppProvider from "./AppProvider";

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
