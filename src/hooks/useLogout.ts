import { useAppDispatch } from "@app/store/hooks";
import { useToggle } from "@app/hooks/useToggle";
import { useStatus } from "@app/hooks/useStatus";
import { deleteAuthTokens } from "@app/lib/api/auth/thokens/deleteAuthTokens";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";
import { user } from "@app/store/reducers";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse,
  } = useToggle();

  const { isLoading, handleLoadingStatus, handleClearStatus } = useStatus({
    isLoading: false,
  });

  const handleClose = () => {
    handleToggleFalse();
  };

  const onSuccess = () => {
    handleLoadingStatus();
    deleteAuthTokens().finally(async () => {
      handleClearStatus();
      handleClose();
      await jwt.removeAuthTokens();
      dispatch(user.actions.logout());
    });
  };

  return {
    isOpen,
    isLoading,

    handleOpen,
    handleClose,

    onSuccess,
  };
};
