import { InputProps } from "@/types/InputProps";

const Input: React.FC<InputProps> = ({
  label,
  classes,
  placeholder,
  register,
  error,
  required,
  minLength,
  maxLength,
  pattern,
}) => {
  return (
    <div className={`${classes} flex flex-col space-y-4`}>
      <label htmlFor={label} className="capitalize color-ari-black w-min">
        {label}
      </label>
      <div>
        <input
          id={label}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          {...register(label, { required, minLength, maxLength, pattern })}
          className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full"
        />
        {error && error.type === "required" && (
          <span role="alert" className="pt-1 text-red-500">
            This field is required
          </span>
        )}
        {error && error.type === "maxLength" && (
          <span role="alert" className="pt-1 text-red-500">
            Max length exceeded
          </span>
        )}
        {error && error.type === "minLength" && (
          <span role="alert" className="pt-1 text-red-500">
            Min length not met
          </span>
        )}
        {error && error.type === "pattern" && (
          <span role="alert" className="pt-1 text-red-500">
            Invalid input
          </span>
        )}
        {error && error.type === "validate" && (
          <span role="alert" className="pt-1 text-red-500">
            Invalid input
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
