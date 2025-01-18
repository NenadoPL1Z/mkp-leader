import { useNavigation } from "@react-navigation/native";
import { AdminRootSN } from "@app/routes/admin/types";
import { CustomerRootSN } from "@app/routes/customer/types";
import { ExecutorRootSN } from "@app/routes/executor/types";
import { useRole } from "@app/hooks/useRole";
import {
  ExecutorsIcon,
  ClientIcon,
  HomeIcon,
  ProfileIcon,
} from "@app/assets/icons/dist";
import type { UseRole } from "@app/lib/models/UserModel";
import type { TabBarItem, TabBarItemCallback } from "./types";

const tabBar: Record<
  UseRole,
  Omit<TabBarItem, "onPress" | "activeRouteName">[]
> = {
  admin: [
    { title: "Главная", routeName: AdminRootSN.MAIN, Icon: HomeIcon },
    { title: "Заказчики", routeName: AdminRootSN.CUSTOMER, Icon: ClientIcon },
    {
      title: "Исполнители",
      routeName: AdminRootSN.EXECUTORS,
      Icon: ExecutorsIcon,
    },
    { title: "Профиль", routeName: AdminRootSN.Profile, Icon: ProfileIcon },
  ],
  executor: [
    {
      title: "Заявки",
      routeName: ExecutorRootSN.MAIN,
      Icon: ExecutorsIcon,
    },
    { title: "Профиль", routeName: ExecutorRootSN.PROFILE, Icon: ProfileIcon },
  ],
  customer: [
    {
      title: "Заявки",
      routeName: CustomerRootSN.REQUESTS,
      Icon: ExecutorsIcon,
    },
    { title: "Профиль", routeName: CustomerRootSN.PROFILE, Icon: ProfileIcon },
  ],
};

export const useTabBar = () => {
  const role = useRole();
  const data = tabBar[role];

  const navigation = useNavigation();

  const onPress: TabBarItemCallback = (routName) => {
    navigation.navigate(routName as never);
  };

  return {
    data,
    onPress,
  };
};
