import React, { useState } from "react";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { Modal, StyleSheet } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import { BASE_URL } from "@app/lib/constants";
import { Api } from "@app/lib/constants/api.ts";
import DocHeader from "./components/DocHeader";
import DocFooter from "./components/DocFooter";
import DocMain from "./components/DocMain";
import DocItem from "./components/DocItem";

const Documentation = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="400"
        fontSize={15}
        lineHeight={20}
        color={Colors.WHITE}
        style={styles.aboutText}
        onPress={() => setIsVisible(true)}>
        О приложении
      </Typography>
      <Modal
        animationType="slide"
        visible={isVisible}>
        <ScreenContainer>
          <DocHeader onClose={() => setIsVisible(false)} />
          <DocMain>
            <DocItem
              title="Пользовательское соглашение"
              uri={BASE_URL + Api.docs.userAccept}
            />
            <DocItem
              title="Политика конфиденциальности"
              uri={BASE_URL + Api.docs.policy}
            />
          </DocMain>
          <DocFooter />
        </ScreenContainer>
      </Modal>
    </>
  );
};

export const styles = StyleSheet.create({
  aboutText: {
    marginBottom: 4,
  },
});

export default React.memo(Documentation);
