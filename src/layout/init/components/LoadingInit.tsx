import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { loading } from "@app/store/reducers";
import { hide } from "react-native-bootsplash";

const LoadingInit = () => {
  const netInfo = useAppSelector((state) => state.global.netInfo);

  const isCheckAuth = useAppSelector(loading.selectors.selectAuth);
  const isNavigation = useAppSelector(loading.selectors.selectNav);

  const dispatch = useAppDispatch();

  const isHideBootSplash = useMemo(() => {
    return isCheckAuth && isNavigation && netInfo?.isConnected;
  }, [isCheckAuth, isNavigation, netInfo]);

  const handleHideSplash = () => {
    hide({ fade: true }).then(() => {
      dispatch(loading.actions.hideSplash());
    });
  };

  useEffect(() => {
    if (isHideBootSplash) {
      handleHideSplash();
    }
  }, [isHideBootSplash]);

  return null;
};

export default React.memo(LoadingInit);
