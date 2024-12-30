import React, { useMemo } from "react";
import { useAppSelector } from "@app/store/hooks";
import AdminRootStack from "./routes/admin";
import CustomerRootStack from "./routes/customer";
import ExecutorRootStack from "./routes/executor";

const AppRootStack = () => {
  const isAdmin = useAppSelector((state) => state.user.user.is_admin);
  const isExecutor = useAppSelector((state) => state.user.user.is_executor);
  const isCustomer = useAppSelector((state) => state.user.user.is_customer);

  const isAdminStack = useMemo(() => {
    return Boolean(isAdmin);
  }, [isAdmin]);

  const isExecutorStack = useMemo(() => {
    return Boolean(!isAdminStack && isExecutor);
  }, [isAdminStack, isExecutor]);

  const isCustomerStack = useMemo(() => {
    return Boolean(!isAdminStack && !isExecutorStack && isCustomer);
  }, [isAdminStack, isExecutorStack, isCustomer]);

  return (
    <>
      {isAdminStack && <AdminRootStack />}
      {isExecutorStack && <ExecutorRootStack />}
      {isCustomerStack && <CustomerRootStack />}
    </>
  );
};

export default React.memo(AppRootStack);
