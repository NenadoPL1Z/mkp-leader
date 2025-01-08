import { TouchableOpacity, View } from "react-native";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import ToastUI from "@app/ui/ToastUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText.tsx";
import { useMarginBottom } from "@app/hooks/useMarginBottom.ts";
import { StarIcon, StarOutlineFilledIcon } from "@app/assets/icons/dist";
import { useSelectExecutorDefault } from "./useSelectExecutorDefault.ts";
import type { SelectExecutorDefaultProps } from "./types.ts";

export const SelectExecutorDefault = (props: SelectExecutorDefaultProps) => {
  const { isDefaultExecutor } = props;
  const { bottom } = useMarginBottom();

  const {
    isOpen,
    toast,
    isLoading,
    handleOpen,
    handleClose,
    onHideToast,
    onSuccess,
  } = useSelectExecutorDefault(props);

  return (
    <View>
      <TouchableOpacity
        touchSoundDisabled={isDefaultExecutor}
        onPress={handleOpen}>
        <View>
          {isDefaultExecutor ? <StarIcon /> : <StarOutlineFilledIcon />}
        </View>
      </TouchableOpacity>
      <PopupUI
        visible={isOpen}
        onSuccess={onSuccess}
        onClose={handleClose}
        successButtonProps={{ loading: isLoading, title: "Измнеить" }}
        cancelButtonProps={{ disabled: isLoading }}
        isBackdoorClose={!isLoading}
        ModalChildren={() => (
          <ToastUI
            params={{
              ...toast,
              isVisible: !!toast,
              bottomOffset: bottom,
              onHide: onHideToast,
            }}
          />
        )}>
        <PopupText>
          Вы уверены, что хотите изменить дежурного исполнителя?
        </PopupText>
      </PopupUI>
    </View>
  );
};
