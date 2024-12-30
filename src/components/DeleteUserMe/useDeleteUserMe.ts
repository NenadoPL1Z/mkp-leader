import { useToggle } from "@app/hooks/useToggle";
import { useToastLocal } from "@app/hooks/useToastLocal";

export const useDeleteUserMe = () => {
  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse,
  } = useToggle();
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const handleClose = () => {
    onHideToast();
    handleToggleFalse();
  };

  const onSuccess = () => {
    handleClose();
    onShowToast({ text1: "Заявка на удаление аккаунта отправлена" });
  };

  return {
    isOpen,
    toast,

    handleOpen,
    handleClose,
    onHideToast,

    onSuccess,
  };
};
