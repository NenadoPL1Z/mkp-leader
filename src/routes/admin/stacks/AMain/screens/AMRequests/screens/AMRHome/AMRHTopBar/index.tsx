import React from "react";
import { useTopBarProps } from "@app/hooks/useTopBarProps";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopBarBadge from "@app/ui/BadgeUI/variant/TopBarBadge";
import { Colors } from "@app/theme/colors.ts";
import AMRHWork from "./screens/AMRHWork";
import AMRHRefused from "./screens/AMRHRefused";
import AMRHQuality from "./screens/AMRHQuality";
import AMRHClosed from "./screens/AMRHClosed";
import { useAMRHTopBar } from "./useAMRHTopBar";
import { AMRHTopBarNamespace } from "./types";
import type { AMRequestsHomeProps } from "../../../types";
import type { AMRHTopBarStackParamList } from "./types";

const Tab = createMaterialTopTabNavigator<AMRHTopBarStackParamList>();

const AMRHTopBar = (props: AMRequestsHomeProps) => {
  const { screenOptions, containerProps } = useTopBarProps();
  const { counters, tabProps } = useAMRHTopBar(props);

  return (
    <Tab.Navigator
      {...containerProps}
      screenOptions={{
        ...screenOptions,
        tabBarScrollEnabled: true,
      }}
      initialRouteName={N_WORK}>
      <Tab.Screen
        name={N_WORK}
        options={setBadge("В работе", counters[N_WORK])}
        initialParams={props}>
        {(props) => (
          <AMRHWork
            {...props}
            {...tabProps(N_WORK)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_QUALITY}
        options={setBadge("Контроль качества", counters[N_QUALITY])}
        initialParams={props}>
        {(props) => (
          <AMRHQuality
            {...props}
            {...tabProps(N_QUALITY)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_CLOSED}
        options={setBadge("Закрытые", counters[N_CLOSED], true)}
        initialParams={props}>
        {(props) => (
          <AMRHClosed
            {...props}
            {...tabProps(N_CLOSED)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_REFUSED}
        options={setBadge("Отказы", counters[N_REFUSED])}
        initialParams={props}>
        {(props) => (
          <AMRHRefused
            {...props}
            {...tabProps(N_REFUSED)}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const N_WORK = AMRHTopBarNamespace.WORK;
const N_QUALITY = AMRHTopBarNamespace.QUALITY;
const N_CLOSED = AMRHTopBarNamespace.CLOSED;
const N_REFUSED = AMRHTopBarNamespace.REFUSED;

const setBadge = (title: string, counter: number, isLast: boolean = false) => {
  return {
    title,
    tabBarBadge: () => (
      <TopBarBadge
        isLast={isLast}
        count={counter}
      />
    ),
  };
};

export default React.memo(AMRHTopBar);
