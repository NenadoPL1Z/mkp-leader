import { IS_DEV } from "@app/lib/constants";
import { GeneralProvider } from "./providers/GeneralProvider";
import { RootStack, VersionStep, AuthStep } from "./components";

if (IS_DEV) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("../../reactotron.config.js");
}

export const App = () => (
  <GeneralProvider>
    <VersionStep>
      <AuthStep>
        <RootStack />
      </AuthStep>
    </VersionStep>
  </GeneralProvider>
);
