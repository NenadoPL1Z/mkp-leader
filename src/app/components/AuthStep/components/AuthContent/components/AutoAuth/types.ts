import type { UseFormReturn } from "react-hook-form";
import type { AuthForm } from "@app/lib/models/form/AuthForm.ts";

export type AutoAuthProps = {
  methods: UseFormReturn<AuthForm>;
  onSubmit: () => void;
};
