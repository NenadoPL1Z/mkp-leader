import React, { useCallback } from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import TabBar from "@app/components/TabBar";
import { AdminRootSN } from "@app/routes/admin/types";
import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList";
import ButtonUI from "@app/ui/ButtonUI";
import { Api } from "@app/lib/constants/api";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import PaginationSearch from "@app/components/PaginationSearch";
import AboutCardCustomer from "@app/components/AboutCard/variant/AboutCardCustomer";
import EmptyContainer from "@app/containers/EmptyContainer";
import { styles } from "./index.styles";
import { useCEHome } from "./useCEHome";
import type { ACHomeProps } from "@app/routes/admin/stacks/ACustomers/types";
import type { CustomerModel } from "@app/lib/models/CustomerModel";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<CustomerModel>;

const ACHome = (props: ACHomeProps) => {
  const {
    setCardRef,
    filterRef,
    resetRef,

    query,
    handleChangeSearch,

    toast,
    onHideToast,

    handlePushProfile,
    handlePushNew,
  } = useCEHome(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <AboutCardCustomer
        key={item.customer_company.id}
        {...item}
        onPress={handlePushProfile}
      />
    );
  }, []);

  return (
    <TabBar activeRouteName={AdminRootSN.CUSTOMER}>
      <ScreenContainer>
        <View style={styles.header}>
          <HeaderUI
            title="Заказчики"
            isBack={false}
            right={{ variant: "logout" }}
          />
        </View>
        <View style={styles.top}>
          <PaginationSearch
            placeholder="Заказчик"
            handleChangeSearch={handleChangeSearch}
          />
        </View>
        <View style={styles.middle}>
          <PaginationList
            config={{
              url: Api.users.customer.all,
              query,
              setCardRef,
              filterRef,
              resetRef,
            }}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={renderItem}
            empty={{
              Component: () => (
                <EmptyContainer
                  title="Заказчики не найдены"
                  Icon={null}
                />
              ),
            }}
          />
          <ToastUI
            params={{
              ...toast,
              isVisible: !!toast,
              onHide: onHideToast,
              bottomOffset: Size.BUTTON + 30,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <ButtonUI onPress={handlePushNew}>Создать заказчика</ButtonUI>
        </View>
      </ScreenContainer>
    </TabBar>
  );
};

export default React.memo(ACHome);
