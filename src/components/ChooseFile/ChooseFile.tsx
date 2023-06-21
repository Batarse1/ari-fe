import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import a11yLight from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-light";

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
  const [type, setType] = useState<
    "text/plain" | "application/json" | "application/xml" | "text/xml"
  >("text/plain");

  const handleOnChangeOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (
      file.type === "text/plain" ||
      file.type === "application/json" ||
      file.type === "application/xml" ||
      file.type === "text/xml"
    ) {
      setType(file.type);
    } else {
      setType("text/plain");
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      if (typeof text === "string") setText(text);
    };

    reader.readAsText(file);
  };

  const language = {
    "text/plain": "plaintext",
    "application/json": "json",
    "application/xml": "xml",
    "text/xml": "xml",
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
      <div className="border border-solid border-ari-black rounded">
        <SyntaxHighlighter
          language={language[type]}
          style={a11yLight}
          customStyle={{
            borderRadius: "0.25rem",
            minHeight: "200px",
          }}
          showLineNumbers
        >
          {text}
        </SyntaxHighlighter>
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
