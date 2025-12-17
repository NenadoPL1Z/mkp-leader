import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { useAppDispatch } from "@app/store/hooks";
import { loading } from "@app/store/reducers";
import { Portal } from "@app/theme/portal";

import { useStatusBar } from "@app/hooks/useStatusBar.ts";
import { Colors } from "@app/theme/colors.ts";
import type { ChildrenProps } from "@app/types/general";

const NavigationLayout = ({ children }: ChildrenProps) => {
  const dispatch = useAppDispatch();

  const onReady = () => {
    dispatch(loading.actions.navigation());
  };

  useStatusBar(true, {
    backgroundColor: Colors.WHITE,
    statusBar: "light-content",
  });

  return (
    <NavigationContainer onReady={onReady}>
      <PortalProvider>
        {children}
        <PortalHost name={Portal.MAIN} />
      </PortalProvider>
    </NavigationContainer>
  );
};

export default React.memo(NavigationLayout);
