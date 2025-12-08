import ButtonUI from "@app/ui/ButtonUI";
import { Colors } from "@app/theme/colors.ts";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText.tsx";
import { useState } from "react";
import type { RetryCodeProps } from "./types";

export const RetryCode = ({ onSubmit }: RetryCodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRetrySubmitCode = () => {
    setIsLoading(true);
    onSubmit(() => {
      setIsLoading(false);
      setIsOpen(false);
    });
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
          title: "Отправить",
        }}
        cancelButtonProps={{
          disabled: isLoading,
          title: "Оставить",
        }}
        isBackdoorClose={!isLoading}>
        <PopupText>
          Предыдущий код восстановления перестанет действовать. Отправить новый
          код восстановления ?
        </PopupText>
      </PopupUI>
    </>
  );
};
