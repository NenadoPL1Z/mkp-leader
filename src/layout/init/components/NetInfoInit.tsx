import React, { useEffect } from "react";

import { networkAddEventListener } from "@app/lib/modules/network";
import { useAppDispatch } from "@app/store/hooks";
import { changeNetInfo } from "@app/store/reducers/global/global";

const NetInfoInit = () => {
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

export default React.memo(NetInfoInit);
