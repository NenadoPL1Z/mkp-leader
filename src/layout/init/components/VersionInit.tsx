import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { fetchVersions } from "@app/store/reducers/global/asyncThunks/fetchVersions";
import { loading } from "@app/store/reducers";

const VersionInit = () => {
  const { details } = useAppSelector((state) => state.global.version);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVersions());
  }, []);

  useEffect(() => {
    if (details) dispatch(loading.actions.version());
  }, [details]);

  return null;
};

export default React.memo(VersionInit);
