import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";
import { loading, user } from "@app/store/reducers";
import { getUpdateAccessToken } from "@app/lib/api/auth/thokens/getUpdateAccessToken";
import { fetchUserMe } from "@app/store/reducers/user/asyncThunks/fetchUserMe";
import { isNetworkError, isRefreshExist } from "@app/lib/functions/network";
import { Timing } from "@app/lib/constants/timing";
import type { Nullable } from "@app/types/general";

export const UserInit = () => {
  const isAuth = useAppSelector(user.selectors.selectUserAuth);
  const netInfo = useAppSelector((state) => state.global.netInfo);
  const dispatch = useAppDispatch();

  const isUnknownAuth = useMemo(() => typeof isAuth === typeof null, [isAuth]);
  const isNetworkConnected = useMemo(() => netInfo?.isConnected, [netInfo]);
  const timeout: Nullable<NodeJS.Timeout> = null;

  const loadingAuth = () => {
    dispatch(loading.actions.auth());
  };

  const loadingNotAuth = () => {
    dispatch(loading.actions.auth());
    dispatch(loading.actions.navigation());
  };

  const rejectInit = () => {
    dispatch(user.actions.auth(false));
    loadingNotAuth();
  };

  //? INIT LOGIC
  const init = async () => {
    try {
      //? GET OLD TOKENS
      const oldTokens = await jwt.getAuthTokens();
      const isOldTokens = oldTokens.access_token && oldTokens.refresh_token;

      if (!isOldTokens) {
        throw new Error("Bad old tokens");
      }

      //? GET NEW TOKENS
      const response = await getUpdateAccessToken(oldTokens.refresh_token);
      const newTokens = response.data;
      const isNewTokens = newTokens.access_token && newTokens.refresh_token;

      if (!isNewTokens) {
        throw new Error("Bad new tokens");
      }

      //? SAVE NEW TOKENS
      await jwt
        .setAuthTokens({
          access_token: newTokens.access_token,
          refresh_token: newTokens.refresh_token,
        })
        //? ОТКЛЮЧАЕМ ВЕРХНИЙ TRY/CATCH, ЧТОБЫ ИДТИ ДАЛЬШЕ ПО ЛОГИКИ
        .catch();

      //? GET USER MODEL
      dispatch(
        fetchUserMe({
          access_token: newTokens.access_token,
          success: loadingAuth,
          reject: loadingNotAuth,
        }),
      );
    } catch (e) {
      //? NETWORK EXIST
      if (isNetworkError(e)) {
        setTimeout(init, Timing.Pooling);
        return;
      }
      //? REFRESH EXIST
      if (isRefreshExist(e)) {
        await jwt.removeAuthTokens();
        dispatch(user.actions.session());
      }

      rejectInit();
    }
  };

  //? USER INIT
  useEffect(() => {
    if (isUnknownAuth && isNetworkConnected) {
      init().finally();
    }
    //? CLEAR TIMEOUT
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isNetworkConnected]);

  return null;
};
