import React from "react";
import { useTopBarProps } from "@app/hooks/useTopBarProps";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopBarBadge from "@app/ui/BadgeUI/variant/TopBarBadge";
import { useCRHTopBar } from "./useCRHTopBar";
import CRClosed from "./screens/CRClosed";
import CRWork from "./screens/CRWork";
import CRQuality from "./screens/CRQuality";
import CRNew from "./screens/CRNew";
import { CRTopBarNamespace } from "./types";
import type { CRHTopBarProps } from "@app/routes/customer/stacks/CRequests/types";
import type { CRTopBarStackParamList } from "./types";

const Tab = createMaterialTopTabNavigator<CRTopBarStackParamList>();

const CRHTopBar = (props: CRHTopBarProps) => {
  const { screenOptions, containerProps } = useTopBarProps();
  const { counters, tabProps } = useCRHTopBar(props);

  return (
    <Tab.Navigator
      {...containerProps}
      screenOptions={{
        ...screenOptions,
        tabBarScrollEnabled: true,
      }}
      initialRouteName={N_NEW}>
      <Tab.Screen
        name={N_NEW}
        options={setBadge("Новые", counters[N_NEW])}>
        {(props) => (
          <CRNew
            {...props}
            {...tabProps(N_NEW)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_WORK}
        options={setBadge("В работе", counters[N_WORK])}>
        {(props) => (
          <CRWork
            {...props}
            {...tabProps(N_WORK)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_QUALITY}
        options={setBadge("Контроль качества", counters[N_QUALITY])}>
        {(props) => (
          <CRQuality
            {...props}
            {...tabProps(N_QUALITY)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={N_CLOSED}
        options={setBadge("Закрытые", counters[N_CLOSED], true)}>
        {(props) => (
          <CRClosed
            {...props}
            {...tabProps(N_CLOSED)}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const N_NEW = CRTopBarNamespace.NEW;
const N_WORK = CRTopBarNamespace.WORK;
const N_QUALITY = CRTopBarNamespace.QUALITY;
const N_CLOSED = CRTopBarNamespace.CLOSED;

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

export default React.memo(CRHTopBar);