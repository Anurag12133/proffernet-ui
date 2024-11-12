import React from "react";
import Flip from "@/app/components/ui/flip-words";
import ThreeDCard from "@/app/components/CardComponent";

const FlipWords = () => {
  const words = ["better", "cute", "beautiful", "modern"];

  return (
    <div className="relative h-screen bg-black bg-section-image bg-cover bg-center filter grayscale brightness-20 ">
      {/* Very dark overlay for an almost black effect with a hint of image shadow */}
      <div className="absolute inset-0 bg-black opacity-95"></div>

      {/* Content */}
      <div className="relative h-[20rem] flex justify-center items-center px-4 pr-[48rem] pt-[10rem]">
        <div className="text-4xl mx-auto font-normal text-neutral-200 dark:text-neutral-300">
          Build
          <Flip words={words} /> <br />
          websites with Aceternity UI
        </div>
      </div>

      <div className="relative h-[30rem] text-center text-white flex justify-center gap-[15rem]">
        <ThreeDCard />
        <ThreeDCard />
      </div>
    </div>
  );
};

export default FlipWords;
