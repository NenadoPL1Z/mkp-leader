import { useAppSelector } from "@app/store/hooks";
import AdminRootStack from "../../../routes/admin";
import CustomerRootStack from "../../../routes/customer";
import ExecutorRootStack from "../../../routes/executor";

export const RootStack = () => {
  const isAdmin = useAppSelector((state) => state.user.user.is_admin);
  const isCustomer = useAppSelector((state) => state.user.user.is_customer);
  const isExecutor = useAppSelector((state) => state.user.user.is_executor);

  const isAdminStack = isAdmin;
  const isCustomerStack = !isAdminStack && isCustomer;
  const isExecutorStack = !isAdminStack && !isCustomerStack && isExecutor;

  return (
    <>
      {isAdminStack && <AdminRootStack />}
      {isCustomerStack && <CustomerRootStack />}
      {isExecutorStack && <ExecutorRootStack />}
    </>
  );
};
