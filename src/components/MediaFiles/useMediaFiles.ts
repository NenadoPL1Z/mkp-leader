import { useState } from "react";
import { useToggle } from "@app/hooks/useToggle";
import type { SwiperOnChange } from "@app/ui/Swiper/types";

export const useMediaFiles = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse: handleClose,
  } = useToggle();

  const onPress = (index: number) => {
    handleOpen();
    setSlideIndex(index);
  };

  const handleChangeIndex: SwiperOnChange = (index) => {
    setSlideIndex(index);
  };

  return {
    slideIndex,
    handleChangeIndex,

    isOpen,
    handleOpen,
    handleClose,

    onPress,
  };
};
