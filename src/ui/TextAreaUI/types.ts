import type { TextFieldProps } from "@app/ui/TextField/types.ts";
import type { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface TextAreaUIProps extends TextFieldProps, Partial<IChildren> {}
