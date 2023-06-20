import { SelectProps } from "@/types/SelectProps";

const Select: React.FC<SelectProps> = ({
  classes,
  name,
  label,
  options,
  placeholder,
  register,
  error,
  required,
  pattern,
}) => {
  return (
    <div className={`${classes} flex flex-col space-y-4`}>
      <label htmlFor={name} className="capitalize color-ari-black">
        {label}
      </label>
      <div>
        <select
          className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full"
          defaultValue={placeholder}
          {...register(name, { required, pattern })}
        >
          <option value={placeholder} disabled hidden>
            {placeholder}
          </option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {error && error.type === "required" && (
          <span role="alert" className="pt-1 text-red-500">
            This field is required
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

export default Select;
