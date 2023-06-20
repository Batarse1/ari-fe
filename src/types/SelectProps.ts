import { type FieldError, type UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  classes?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export type { SelectProps };
