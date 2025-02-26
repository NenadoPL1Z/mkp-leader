import React, { useCallback } from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import TabBar from "@app/components/TabBar";
import { ExecutorRootSN } from "@app/routes/executor/types";
import HeaderUI from "@app/ui/HeaderUI";
import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import { useEMHome } from "@app/routes/executor/stacks/EMain/screens/EMHome/useEMHome";
import AboutCardCompany from "@app/components/AboutCard/variant/AboutCardCompany";
import { styles } from "./styles";
import type { ListRenderItem } from "react-native";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { EMHomeScreenProps } from "../../types";

type RenderItem = ListRenderItem<RequestCompanyModel>;

const EMHome = (props: EMHomeScreenProps) => {
  const { setCardRef, onPress } = useEMHome(props);
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
    <TabBar activeRouteName={ExecutorRootSN.MAIN}>
      <ScreenContainer>
        <HeaderUI
          title="Заявки"
          isBack={false}
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
              Component: EmptyContainer,
            }}
          />
        </View>
      </ScreenContainer>
    </TabBar>
  );
};

export default React.memo(EMHome);
