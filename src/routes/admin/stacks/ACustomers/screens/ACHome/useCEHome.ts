import { useRef } from "react";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { ACustomersSN } from "@app/routes/admin/stacks/ACustomers/types";
import { useSearch } from "@app/hooks/useSearch";
import type { CustomerModel } from "@app/lib/models/CustomerModel";
import type {
  ACHomeProps,
  CustomerProfileDeleteCallback,
  CustomerNewAddCallback,
} from "@app/routes/admin/stacks/ACustomers/types";
import type {
  PaginationFilterRef,
  PaginationSetCardRef,
} from "@app/components/PaginationList/types";

export const useCEHome = ({ navigation }: ACHomeProps) => {
  //? REFS
  const setCardRef = useRef<PaginationSetCardRef<CustomerModel>>(null);
  const filterRef = useRef<PaginationFilterRef>(null);

  //? STATES
  const { resetRef, query, handleChangeSearch } = useSearch();
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const callbackEdit = (userModel: CustomerModel) => {
    if (setCardRef.current) {
      setCardRef.current((prevState) => {
        const result: CustomerModel[] = [];
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i].id === userModel.id) {
            result.push(userModel);
            continue;
          }
          result.push(prevState[i]);
        }
        return result;
      });
    }
  };

  const callbackDelete: CustomerProfileDeleteCallback = ({
    user,
    callback,
  }) => {
    if (filterRef.current) {
      filterRef.current(user.id);
    }
    callback();
    onShowToast({ text1: `Заказчик "${user.customer_company.name}" удален` });
  };

  const callbackAdd: CustomerNewAddCallback = ({ user, callback }) => {
    if (setCardRef.current) {
      setCardRef.current((prevState) => [user, ...prevState]);
    }
    callback();
    onShowToast({ text1: `Заказчик "${user.customer_company.name}" добавлен` });
    return;
  };

  const handlePushNew = () => {
    navigation.navigate(ACustomersSN.NEW, {
      callbackAdd,
    });
  };

  const handlePushProfile = (model: CustomerModel) => {
    navigation.navigate(ACustomersSN.PROFILE, {
      ...model,
      callbackEdit,
      callbackDelete,
    });
  };

  return {
    setCardRef,
    filterRef,
    resetRef,

    query,
    handleChangeSearch,

    toast,
    onHideToast,

    handlePushProfile,
    handlePushNew,
  };
};
