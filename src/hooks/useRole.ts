import { useAppSelector } from "@app/store/hooks";
import type { UseRole } from "@app/lib/models/UserModel";

export const useRole = (): UseRole => {
  const role = useAppSelector((state) => state.user.user.role);
  const isAdmin = useAppSelector((state) => state.user.user.is_admin);
  const isCustomer = useAppSelector((state) => state.user.user.is_customer);

  if (role) {
    return role.toLowerCase() as UseRole;
  }

  if (isAdmin) {
    return "admin";
  }

  if (isCustomer) {
    return "customer";
  }

  return "executor";
};
