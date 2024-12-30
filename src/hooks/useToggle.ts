import { useState } from "react";

export const useToggle = (initialToggle = false) => {
  const [isToggle, setIsToggle] = useState<boolean>(initialToggle);

  const handleToggle = () => {
    setIsToggle((prevState) => {
      return !prevState;
    });
  };

  const handleToggleState = (state: boolean) => {
    setIsToggle(state);
  };

  const handleToggleTrue = () => {
    setIsToggle(true);
  };

  const handleToggleFalse = () => {
    setIsToggle(false);
  };

  return {
    isToggle,
    handleToggle,
    handleToggleState,
    handleToggleTrue,
    handleToggleFalse,
  };
};
