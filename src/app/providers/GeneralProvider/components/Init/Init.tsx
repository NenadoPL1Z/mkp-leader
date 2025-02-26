import {
  VersionInit,
  LoadingInit,
  StatusBarInit,
  UserInit,
  UserAccess,
  NetInfoInit,
} from "./components";

export const Init = () => {
  return (
    <>
      <StatusBarInit />
      <LoadingInit />
      <NetInfoInit />
      <VersionInit />
      <UserInit />
      <UserAccess />
    </>
  );
};
