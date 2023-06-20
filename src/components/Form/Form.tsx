"use client";

import { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";

import ChooseFile from "@/components/ChooseFile";
import Input from "@/components/Input";
import Select from "@/components/Select/Select";

import {
  secret_validation,
  delimiter_validation,
  type_validation,
} from "@/utils/patterns";

enum TypeEnum {
  XML = "XML",
  JSON = "JSON",
  TXT = "TXT",
}

export type Inputs = {
  secret: string;
  delimiter: string;
  type: TypeEnum;
  origin: FileList;
  destiny: FileList;
};

const Form = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [originText, setOriginText] = useState<string>("");
  const [destinyFile, setDestinyFile] = useState<Blob>();
  const [destinyText, setDestinyText] = useState<string>("");
  const [destinyType, setDestinyType] = useState<TypeEnum>();
  const [destinyName, setDestinyName] = useState<string>("destiny");
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const options = [
    { value: TypeEnum.XML, label: TypeEnum.XML },
    { value: TypeEnum.JSON, label: TypeEnum.JSON },
    { value: TypeEnum.TXT, label: TypeEnum.TXT },
  ];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError("");
    const fromType = data.origin[0].type;
    const toType = data.type;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

    let url = `${API_URL}/file-parser`;

    if (fromType === "text/plain" && toType === TypeEnum.JSON) {
      url += "/txt-to-json";
      setDestinyType(TypeEnum.JSON);
    } else if (fromType === "text/plain" && toType === TypeEnum.XML) {
      url += "/txt-to-xml";
      setDestinyType(TypeEnum.XML);
    } else if (fromType === "text/xml" && toType === TypeEnum.TXT) {
      url += "/xml-to-txt";
      setDestinyType(TypeEnum.TXT);
    } else if (fromType === "application/json" && toType === TypeEnum.TXT) {
      url += "/json-to-txt";
      setDestinyType(TypeEnum.TXT);
    } else {
      setError(
        `You can't convert file type ${fromType} to file type ${toType}`
      );
      return;
    }

    const formData = new FormData();

    formData.append("file", data.origin[0]);
    formData.append("secret", data.secret);
    formData.append("separator", data.delimiter);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const dotIndex = data.origin[0].name.indexOf(".");
      setDestinyName(data.origin[0].name.substring(0, dotIndex));

      const file = await res.blob();
      setDestinyFile(file);

      const text = await file.text();
      setDestinyText(text);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleDownload = () => {
    if (!destinyFile) return;

    setIsDownloading(true);

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(destinyFile);
    link.download = destinyName;

    if (destinyType === TypeEnum.JSON) link.download += ".json";
    else if (destinyType === TypeEnum.XML) link.download += ".xml";
    else if (destinyType === TypeEnum.TXT) link.download += ".txt";

    link.click();

    setIsDownloading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-6 gap-12 w-full"
    >
      <Input
        classes="col-span-2"
        label="secret"
        placeholder="Enter your secret"
        pattern={secret_validation}
        register={register}
        required
        error={errors.secret}
      />
      <Input
        classes="col-span-2"
        label="delimiter"
        placeholder="Enter your delimiter"
        register={register}
        required
        error={errors.delimiter}
        pattern={delimiter_validation}
      />
      <Select
        name="type"
        classes="col-span-2"
        options={options}
        label="convert to type (XML, JSON, TXT)"
        placeholder="Select your type"
        register={register}
        error={errors.type}
        pattern={type_validation}
        required
      />
      <ChooseFile
        register={register}
        placeholder="Select your type"
        name="origin"
        label="Origin file"
        setText={setOriginText}
        text={originText}
        accept={".txt, .xml, .json"}
        error={errors.origin}
        validate={(fileList) =>
          fileList[0].type === "text/plain" ||
          fileList[0].type === "application/json" ||
          fileList[0].type === "application/xml" ||
          fileList[0].type === "text/xml"
        }
      />
      <div className="col-span-3 flex flex-col space-y-4">
        <label htmlFor="destiny" className="capitalize color-ari-black">
          Destiny file
        </label>
        <button
          type="button"
          className="bg-ari-gray rounded border border-solid border-ari-black w-fit h-[30.8px] px-2"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          Save as
        </button>
        <div className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full min-h-[200px] whitespace-normal break-words">
          {destinyText}
        </div>
      </div>
      <input
        className="bg-ari-gray p-2 rounded border border-solid border-ari-black"
        type="submit"
      />
      {error && (
        <span className="col-span-5 text-end pt-1 text-red-500">{error}</span>
      )}
    </form>
  );
};

export default Form;
