import { type SetStateAction } from "react";
import { type FieldError, type UseFormRegister } from "react-hook-form";

interface ChooseFileProps {
  name: string;
  accept: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError | undefined;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  setText: (value: SetStateAction<string>) => void;
  text: string;
  validate: (value: any) => boolean;
}

export default ChooseFileProps;
