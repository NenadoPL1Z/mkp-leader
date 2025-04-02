import React, { useCallback } from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import TabBar from "@app/components/TabBar";
import { AdminRootSN } from "@app/routes/admin/types";
import HeaderUI from "@app/ui/HeaderUI";
import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import { useAMHome } from "@app/routes/admin/stacks/AMain/screens/AMHome/useAMHome";
import EmptyContainer from "@app/containers/EmptyContainer";
import AboutCardCompany from "@app/components/AboutCard/variant/AboutCardCompany";
import { styles } from "./styles";
import type { AMHomeScreenProps } from "@app/routes/admin/stacks/AMain/types";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<RequestCompanyModel>;

const AMHome = (props: AMHomeScreenProps) => {
  const { setCardRef, onPress } = useAMHome(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <AboutCardCompany
        key={item.id}
        {...item}
        onPress={onPress}
      />
    );
  }, []);

  return (
    <TabBar activeRouteName={AdminRootSN.MAIN}>
      <ScreenContainer>
        <HeaderUI
          title="Заявки"
          isBack={false}
          right={{ variant: "logout" }}
        />
        <View style={styles.middle}>
          <PaginationList
            config={{
              url: Api.service.companies,
              setCardRef,
            }}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={renderItem}
            empty={{
              Component: () => <EmptyContainer title="Заявки ещё не созданы" />,
            }}
          />
        </View>
      </ScreenContainer>
    </TabBar>
  );
};

export default React.memo(AMHome);
