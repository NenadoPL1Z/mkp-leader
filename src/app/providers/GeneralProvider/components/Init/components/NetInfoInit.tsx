import { useEffect } from "react";
import { networkAddEventListener } from "@app/lib/modules/network";
import { useAppDispatch } from "@app/store/hooks";
import { changeNetInfo } from "@app/store/reducers/global/global";

export const NetInfoInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = networkAddEventListener((state) => {
      dispatch(changeNetInfo(state));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};
