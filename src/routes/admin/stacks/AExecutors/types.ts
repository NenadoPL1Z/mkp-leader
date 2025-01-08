import type {
  ExecutorModel,
  ExecutorModelRequired,
} from "@app/lib/models/ExecutorModel";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AExecutorsSN {
  HOME = "Home",
  NEW = "New",

  PROFILE = "Profile",
  EDIT = "Edit",
}

type Callback<T = ExecutorModelRequired> = {
  user: T;
  toast: string;
  callback: () => void;
};

export type ExecutorProfileCallback = (data: Callback) => void;
export type ExecutorProfileDeleteCallback = (
  data: Omit<Callback<ExecutorModelRequired>, "toast">,
) => void;
export type ExecutorNewAddCallback = (data: Callback<ExecutorModel>) => void;

type Edit = ExecutorModelRequired & {
  callbackChange: ExecutorProfileCallback;
};

export type ExecutorDefaultProfile = {
  executorDefaultId: number;
  callbackEditExecutorDefaultId: (id: number) => void;
};

type Profile = ExecutorModel &
  ExecutorDefaultProfile & {
    callbackEdit: (user: ExecutorModel) => void;
    callbackDelete: ExecutorProfileDeleteCallback;
  };

type NewExecutor = {
  callbackAdd: ExecutorNewAddCallback;
};

export type AExecutorsSPL = {
  [AExecutorsSN.HOME]: undefined;
  [AExecutorsSN.PROFILE]: Profile;
  [AExecutorsSN.NEW]: NewExecutor;
  [AExecutorsSN.EDIT]: Edit;
};

export type AEHomeProps = NativeStackScreenProps<
  AExecutorsSPL,
  AExecutorsSN.HOME
>;

export type AENewProps = NativeStackScreenProps<
  AExecutorsSPL,
  AExecutorsSN.NEW
>;

export type AEProfileProps = NativeStackScreenProps<
  AExecutorsSPL,
  AExecutorsSN.PROFILE
>;

export type AEEditProps = NativeStackScreenProps<
  AExecutorsSPL,
  AExecutorsSN.EDIT
>;
