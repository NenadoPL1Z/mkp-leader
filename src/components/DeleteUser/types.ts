import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { ExecutorModelRequired } from "@app/lib/models/ExecutorModel";
import type { UserModel } from "@app/lib/models/UserModel";

export type DeleteUserProps = {
  disabled?: boolean;
  title: string;
  user: UserModel | ExecutorModelRequired | CustomerDetailModel;
  callback: () => void;
};
