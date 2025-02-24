import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { loading } from "@app/store/reducers";
import { hide } from "react-native-bootsplash";

const LoadingInit = () => {
  const netInfo = useAppSelector((state) => state.global.netInfo);

  const isCheckVersion = useAppSelector(loading.selectors.selectVersion);
  const isCheckAuth = useAppSelector(loading.selectors.selectAuth);
  const isNavigation = useAppSelector(loading.selectors.selectNav);

  const dispatch = useAppDispatch();

  const isHideBootSplash = Boolean(
    isCheckVersion && isCheckAuth && isNavigation && netInfo?.isConnected,
  );

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
