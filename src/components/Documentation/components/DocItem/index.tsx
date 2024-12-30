import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import DocHeader from "@app/components/Documentation/components/DocHeader";
import ScreenContainer from "@app/containers/ScreenContainer";
import DocFooter from "@app/components/Documentation/components/DocFooter";
import DocMain from "@app/components/Documentation/components/DocMain";
import { WebView } from "react-native-webview";
import { IS_IOS } from "@app/lib/constants";

type Props = {
  title: string;
  uri: string;
};

const DocItem = ({ title, uri }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={[styles.container, styles.shadow]}>
        <Typography
          variant="h4"
          fontSize={15}
          lineHeight={20}
          fontWeight="400"
          color={Colors.TEXT}
          fontFamily={Font.TEXT}>
          {title}
        </Typography>
      </TouchableOpacity>
      <Modal
        animationType={IS_IOS ? "slide" : "none"}
        visible={isVisible}>
        <ScreenContainer>
          <DocHeader onClose={() => setIsVisible(false)} />
          <DocMain isPadding={false}>
            <WebView
              source={{ uri }}
              style={styles.webview}
            />
          </DocMain>
          <DocFooter />
        </ScreenContainer>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
  },
  shadow: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  webview: {
    flex: 1,
    marginBottom: 16,
  },
});

export default React.memo(DocItem);
