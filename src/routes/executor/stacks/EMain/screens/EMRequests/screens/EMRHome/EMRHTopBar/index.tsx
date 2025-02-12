import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTopBarProps } from "@app/hooks/useTopBarProps";
import TopBarBadge from "@app/ui/BadgeUI/variant/TopBarBadge";
import EMRHQuality from "./screens/EMRHQuality";
import EMRHClosed from "./screens/EMRHClosed";
import EMRHRefused from "./screens/EMRHRefused";
import EMRHWork from "./screens/EMRHWork";
import { useEMRHTopBar } from "./useEMRHTopBar";
import { EMRHTopBarNamespace } from "./types";
import type { EMRequestsHomeProps } from "../../../types";
import type { EMRHTopBarStackParamList } from "./types";

const Tab = createMaterialTopTabNavigator<EMRHTopBarStackParamList>();

const EMRHTopBar = (props: EMRequestsHomeProps) => {
  const { screenOptions, containerProps } = useTopBarProps();
  const { counters, tabProps } = useEMRHTopBar(props);

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
          <EMRHWork
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
          <EMRHQuality
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
          <EMRHClosed
            {...props}
            {...tabProps(N_CLOSED)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_REFUSED}
        options={setBadge("Отказ", counters[N_REFUSED], true)}
        initialParams={props}>
        {(props) => (
          <EMRHRefused
            {...props}
            {...tabProps(N_REFUSED)}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const N_WORK = EMRHTopBarNamespace.WORK;
const N_QUALITY = EMRHTopBarNamespace.QUALITY;
const N_CLOSED = EMRHTopBarNamespace.CLOSED;
const N_REFUSED = EMRHTopBarNamespace.REFUSED;

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
export default React.memo(EMRHTopBar);
