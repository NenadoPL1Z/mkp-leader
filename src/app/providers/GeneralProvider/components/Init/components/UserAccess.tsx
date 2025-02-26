import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { user } from "@app/store/reducers";
import { jwt } from "@app/lib/modules/asyncStorage/tokens";
import { getUpdateAccessToken } from "@app/lib/api/auth/thokens/getUpdateAccessToken";
import { Timing } from "@app/lib/constants/timing";
import { isNetworkError, isRefreshExist } from "@app/lib/functions/network";

export const UserAccess = () => {
  const tokenUpdateAt = useRef(0);

  const isAuth = useAppSelector(user.selectors.selectUserAuth);
  const netInfo = useAppSelector((state) => state.global.netInfo);
  const dispatch = useAppDispatch();

  const isNetworkConnected = useMemo(() => !!netInfo?.isConnected, [netInfo]);
  const isUpdateAccess = useMemo(
    () => isNetworkConnected && isAuth,
    [isNetworkConnected, isAuth],
  );

  //eslint-disable-next-line
  let firstTimeout: any = null;
  //eslint-disable-next-line
  let secondTimeout: any = null;

  const intervalUpdate = async () => {
    try {
      //? CHECK + GET REFRESH
      const { refresh_token } = await jwt.getAuthTokens();

      if (!refresh_token) {
        throw new Error("Bad refresh_token");
      }

      //? GET NEW TOKENS
      const response = await getUpdateAccessToken(refresh_token);
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

      tokenUpdateAt.current = Date.now();
      clearTimeout(secondTimeout);
      secondTimeout = setTimeout(intervalUpdate, Timing.ACCESS_LIFE_TIME);
    } catch (e) {
      if (isNetworkError(e)) {
        clearTimeout(secondTimeout);
        secondTimeout = setTimeout(intervalUpdate, Timing.Pooling);
      }
      if (isRefreshExist(e)) {
        clearTimeout(secondTimeout);
        await jwt.removeAuthTokens();
        dispatch(user.actions.session());
      }
    }
  };

  useEffect(() => {
    if (isUpdateAccess) {
      clearTimeout(firstTimeout);

      if (!tokenUpdateAt.current) {
        firstTimeout = setTimeout(intervalUpdate, Timing.ACCESS_LIFE_TIME);
      } else {
        intervalUpdate().finally();
      }
    }

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, [isUpdateAccess]);

  return null;
};
