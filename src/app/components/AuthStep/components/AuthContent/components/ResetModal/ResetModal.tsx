import { Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { styles } from "@app/app/components/AuthStep/components/AuthContent/index.styles.ts";
import { Colors, linear } from "@app/theme/colors.ts";
import { PrevIcon } from "@app/assets/icons/dist";
import Typography from "@app/ui/Typography";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import ToastUI from "@app/ui/ToastUI";
import Documentation from "@app/components/Documentation";
import { ResetForm } from "./components";
import type { ResetModalProps } from "./types";

const ICON_SIZE = 24;

export const ResetModal = ({ open, onClose }: ResetModalProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { toast, onShowToast, onHideToast } = useToastLocal();

  return (
    <Modal
      animationType="slide"
      visible={open}>
      <LinearGradient
        style={styles.container}
        colors={linear.authorization}>
        <SafeAreaView style={styles.wrapper}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            onPress={onClose}>
            <PrevIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={Colors.WHITE}
            />
            <Typography
              fontSize={16}
              lineHeight={16}
              color={Colors.WHITE}>
              Авторизация
            </Typography>
          </TouchableOpacity>
          <KeyboardContainer>
            <View
              style={{
                ...styles.top,
                marginTop: styles.top.marginTop - 16,
              }}>
              <Typography
                variant="h2"
                style={{
                  ...styles.title,
                  marginBottom: 0,
                  textAlign: "center",
                }}>
                Восстановление пароля
              </Typography>
              <ResetForm onShowToast={onShowToast} />
            </View>
          </KeyboardContainer>
          <View style={[styles.bottom, bottom === 0 && styles.bottomMargin]}>
            <Documentation />
          </View>
        </SafeAreaView>
        <ToastUI
          success={{
            contentContainerStyle: styles.toast,
            text1Style: styles.toastText,
          }}
          params={{
            ...toast,
            isVisible: Boolean(toast),
            onHide: onHideToast,
            position: "top",
            topOffset: top + 10,
          }}
        />
      </LinearGradient>
    </Modal>
  );
};
