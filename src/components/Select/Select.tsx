import { SelectProps } from "@/types/SelectProps";

const Select: React.FC<SelectProps> = ({
  classes,
  label,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className={`${classes} flex flex-col space-y-4`}>
      <label htmlFor="type" className="capitalize color-ari-black">
        {label}
      </label>
      <div>
        <select
          className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full"
          defaultValue={placeholder}
          {...register("type")}
        >
          <option value={placeholder} disabled hidden>
            {placeholder}
          </option>
          <option value="XML">XML</option>
          <option value="JSON">JSON</option>
          <option value="TXT">TXT</option>
        </select>
        {error && error.type === "required" && (
          <span role="alert" className="pt-1 text-red-500">
            This field is required
          </span>
        )}
      </div>
    </div>
  );
};

export default Select;
