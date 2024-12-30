import { useEffect } from "react";
import { useAppDispatch } from "@app/store/hooks";
import { changeStatusBar } from "@app/store/reducers";
import { Colors } from "@app/theme/colors.ts";
import type { StatusBarGlobal } from "@app/store/reducers/global/type.ts";

type UseStatusBar = (
  isChange: boolean | null | undefined | string | number,
  props: StatusBarGlobal,
) => void;

export const useStatusBar: UseStatusBar = (isChange, props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isChange) {
      dispatch(changeStatusBar(props));
    }

    return () => {
      dispatch(
        changeStatusBar({
          backgroundColor: Colors.WHITE,
          statusBar: "dark-content",
        }),
      );
    };
  }, [isChange]);
};
