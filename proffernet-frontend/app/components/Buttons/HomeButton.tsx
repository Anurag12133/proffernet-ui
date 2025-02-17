"use client";
import { useRouter } from "next/navigation";
import { FaLongArrowAltLeft } from "react-icons/fa";

const HomeButton = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/");
  };
  return (
    <button
      className="px-4 py-0.5  flex gap-2 border-2 border-white dark:border-white  text-white transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(0,0,0)] cursor-pointer"
      onClick={handleButtonClick}
    >
      <FaLongArrowAltLeft className="mt-1" /> Home
    </button>
  );
};

export default HomeButton;
