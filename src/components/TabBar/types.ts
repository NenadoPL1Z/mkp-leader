import type { ExecutorRootSN } from "@app/routes/executor/types";
import type { CustomerRootSN } from "@app/routes/customer/types";
import type { ChildrenProps, SvgFC } from "@app/types/general";
import type { AdminRootSN } from "@app/routes/admin/types";

type RouteName = AdminRootSN | CustomerRootSN | ExecutorRootSN;

export type TabBarProps = ChildrenProps<{
  activeRouteName: RouteName;
}>;

export type TabBarItemCallback = (routName: RouteName) => void;

export type TabBarItem = Pick<TabBarProps, "activeRouteName"> & {
  title: string;
  routeName: RouteName;
  Icon: SvgFC;
  onPress: TabBarItemCallback;
  isFist?: boolean;
  isLast?: boolean;
};
