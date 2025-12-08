import ButtonUI from "@app/ui/ButtonUI";
import { Colors } from "@app/theme/colors.ts";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText.tsx";
import { useState } from "react";
import type { RetryCodeProps } from "./types";

export const RetryCode = ({
  onShowToast,
  setDisabledSubmitCode,
}: RetryCodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRetrySubmitCode = () => {
    setIsLoading(true);
    return;
  };

  return (
    <>
      <ButtonUI
        variant="text"
        buttonStyle={{ marginTop: 5 }}
        titleStyle={{ color: Colors.WHITE }}
        onPress={() => setIsOpen(true)}>
        Отправить новый код восстановления
      </ButtonUI>
      <PopupUI
        visible={isOpen}
        onSuccess={onRetrySubmitCode}
        onClose={() => setIsOpen(false)}
        successButtonProps={{
          loading: isLoading,
          title: "Отправить новый",
        }}
        cancelButtonProps={{
          disabled: isLoading,
          title: "Оставить текущий",
        }}
        isBackdoorClose={!isLoading}>
        <PopupText>
          Предыдущий код восстановления перестанет действовать?
        </PopupText>
      </PopupUI>
    </>
  );
};
