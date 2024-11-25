import React from "react";
import { Spotlight } from "@/app/components/ui/Spotlight";
import HeroText from "./Hero-text";
import RevealCard from "./Hero-revelcard";
import Footer from "./Footer";
import TextLink from "./HeroTextLink";

import AiIndex from "./Ai-index";
import StackText from "./StackText";

import Features from "./Features";
import Button from "./Button";
import BackgroundBoxes from "./Backgroundlight";

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
          </div>
        </div>
      </div>
      <div className=" w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.029] relative overflow-hidden mb-20">
        <div className="relative z-20 grid grid-cols-5  w-full max-w-6xl px-8 ">
          <div className="flex items-start justify-start col-span-3 w-full overflow-hidden ">
            <StackText />
          </div>

          <div className="flex flex-col col-span-2 w-full">
            <div className="grid grid-rows-2 grid-cols-3 gap-4 mt-[3rem] justify-center items-center">
              <img src="/icons/html.svg" alt="HTML" className="h-10 w-auto" />
              <img src="/icons/css.svg" alt="CSS" className="h-13 w-auto" />
              <img
                src="/icons/js.svg"
                alt="Javascript"
                className="h-10 w-auto"
              />
              <img src="/icons/react.svg" alt="React" className="h-10 w-auto" />
              <img
                src="/icons/django.svg"
                alt="Django"
                className="h-15 w-auto"
              />
              <img
                src="/icons/psql.svg"
                alt="PostgresSQL"
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[50rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96]  relative overflow-hidden mt-[15rem]">
        <div className="grid grid-cols-2 gap-20 w-full max-w-6xl px-8 mt-5 h-[60rem]">
          {/* Left column for components, centered */}
          <div className="flex justify-center  w-[35rem] ">
            <TextLink />
          </div>

          <div className="flex justify-center w-full mt-20">
            <Features />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-[10rem]">
        <AiIndex />
      </div>
      <div className="h-[40rem] w-full rounded-md flex flex-col items-center justify-center bg-black/[0.96] relative overflow-hidden">
        <BackgroundBoxes />
      </div>

      <div className=" mx-10">
        <Footer />
      </div>
    </div>
  );
};

export default HeroSection;
