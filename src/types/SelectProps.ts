import { type FieldError, type UseFormRegister } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  classes?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export type { SelectProps };
