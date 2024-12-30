import React from "react";

import UserAccess from "./components/UserAccess";
import UserInit from "./components/UserInit";
import LoadingInit from "./components/LoadingInit";
import NetInfoInit from "./components/NetInfoInit";
import StatusBarInit from "./components/StatusBarInit";

const InitLayout = () => {
  return (
    <>
      <StatusBarInit />
      <LoadingInit />
      <NetInfoInit />
      <UserInit />
      <UserAccess />
    </>
  );
};

export default React.memo(InitLayout);
