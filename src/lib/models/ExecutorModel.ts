export type ExecutorId = number;
export interface Executor<T> {
  id: ExecutorId;
  name: T;
  password?: string;
  phone: T;
  username: T;
}

export type ExecutorModel = Executor<string>;
export type ExecutorModelRequired = Required<Executor<string>>;
