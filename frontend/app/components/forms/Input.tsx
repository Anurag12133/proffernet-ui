import { ChangeEvent } from "react";
import Link from "next/link";

interface Props {
  labelId: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children: React.ReactNode;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
  placeholder?: string;
}

export default function Input({
  labelId,
  type,
  onChange,
  value,
  link,
  required = false,
  placeholder,
}: Props) {
  return (
    <div>
      <div className="flex justify-between align-center">
        {link && (
          <div className="text-sm">
            <Link className="font-semibold text-white" href={link.linkUrl}>
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      <div className="">
        <input
          id={labelId}
          className="block w-full h-[2rem] rounded-md  text-white shadow-sm   dark:border-white/[0.2] border-transparent border  placeholder:text-gray-400  bg-black sm:text-sm sm:leading-6"
          name={labelId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
