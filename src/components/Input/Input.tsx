import { InputProps } from "@/types/InputProps";

const Input: React.FC<InputProps> = ({
  label,
  classes,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className={`${classes} flex flex-col space-y-4`}>
      <label htmlFor={label} className="capitalize color-ari-black w-min">
        {label}
      </label>
      <div>
        <input
          id={label}
          className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full"
          placeholder={placeholder}
          {...register(label, { required: true })}
        />
        {error && error.type === "required" && (
          <span role="alert" className="pt-1 text-red-500">
            This field is required
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
