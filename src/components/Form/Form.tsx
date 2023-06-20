"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "@/components/Input";

import { secret_validation, delimiter_validation } from "@/utils/patterns";

import Select from "../Select/Select";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      console.log("error");
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
      console.log(error);
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

  const handleOnChangeOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      if (typeof text === "string") setOriginText(text);
    };

    reader.readAsText(file);
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
        classes="col-span-2"
        label="convert to type (XML, JSON, TXT)"
        placeholder="Select your type"
        register={register}
        error={errors.type}
      />
      <div className="col-span-3 flex flex-col space-y-4">
        <label htmlFor="origin" className="capitalize color-ari-black w-fit">
          Origin file
        </label>
        <input
          id="origin"
          className="w-fit"
          type="file"
          placeholder="Select your type"
          {...register("origin")}
          onChange={handleOnChangeOrigin}
        />
        <div className="bg-ari-gray p-2 rounded border border-solid border-ari-black w-full min-h-[200px] whitespace-normal break-words">
          {originText}
        </div>
      </div>
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
    </form>
  );
};

export default Form;
