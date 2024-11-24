import React from "react";
import { Spotlight } from "@/app/components/ui/Spotlight";
import HeroText from "./Hero-text";
import RevealCard from "./Hero-revelcard";
import Footer from "./Footer";
import HeroSlider from "./Hero-Slider";
import TextLink from "./HeroTextLink";
import ConnectCompo from "./ConnectComp";
import { FaReact } from "react-icons/fa6";
import AiIndex from "./Ai-index";

const HeroSection = () => {
  return (
    <div>
      <div className="h-[50rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.029] relative overflow-hidden">
        <Spotlight
          className="-top-50 left-0 md:left-60 md:-top-10"
          fill="white"
        />
        <div className="relative z-20 grid grid-cols-4 gap-5 w-full max-w-6xl px-8">
          <div className="flex items-start justify-start col-span-2 w-full overflow-hidden ">
            <HeroText />
          </div>

          <div className="flex flex-col col-span-2 w-full">
            <div className="tile col-span-full mt-4 h-[20rem]">
              <RevealCard />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="tile  col-span-1 h-[10rem]"></div>
              <div className="tile  col-span-1 h-[10rem]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[50rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96]  relative overflow-hidden">
        <div className="grid grid-cols-2 gap-20 w-full max-w-6xl px-8 mt-8">
          {/* Left column for components, centered */}
          <div className="flex justify-center items-center mb-[20rem] ">
            <TextLink />
          </div>

          {/* Right column for text, centered */}
          <div className="flex justify-center items-center  ">
            <HeroSlider />
          </div>
        </div>
      </div>
      <div className="h-[50rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96]  relative overflow-hidden">
        <div className="grid grid-cols-2 gap-20 w-full max-w-6xl px-8 mt-8">
          {/* Left column for components, centered */}
          <div className="flex justify-center items-center mb-[20rem] ">
            <ConnectCompo />
          </div>

          {/* Right column for text, centered */}
          <div className="flex justify-center items-center  "></div>
        </div>
      </div>
      <div className="">
        <AiIndex />
      </div>

      <div className="mt-20 mx-10">
        <Footer />
      </div>
    </div>
  );
};

export default HeroSection;
