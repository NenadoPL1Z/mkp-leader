import type { ExecutorModelRequired } from "@app/lib/models/ExecutorModel";

export type ExecutorForm = Omit<ExecutorModelRequired, "id">;
