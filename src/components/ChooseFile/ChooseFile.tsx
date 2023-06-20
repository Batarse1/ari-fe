import ChooseFileProps from "@/types/ChooseFileProps";

const ChooseFile: React.FC<ChooseFileProps> = ({
  name,
  label,
  placeholder,
  register,
  setText,
  text,
  accept,
  error,
  validate,
  classes,
}) => {
  const handleOnChangeOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      if (typeof text === "string") setText(text);
    };

    reader.readAsText(file);
  };

  return (
    <div className={`${classes} flex flex-col space-y-4`}>
      <label htmlFor={name} className="capitalize color-ari-black w-fit">
        {label}
      </label>
      <input
        id={name}
        className="w-fit"
        type="file"
        placeholder={placeholder}
        accept={accept}
        {...register(name, {
          required: true,
          validate: validate,
        })}
        onChange={handleOnChangeOrigin}
      />
      <div className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full min-h-[200px] whitespace-normal break-words">
        {text}
      </div>
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
  );
};

export default ChooseFile;
