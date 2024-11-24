import React from "react";
import { Spotlight } from "@/app/components/ui/Spotlight";
import HeroText from "./Hero-text";
import RevealCard from "./Hero-revelcard";
import Footer from "./Footer";
import HeroSlider from "./Hero-Slider";
import TextLink from "./HeroTextLink";
import ConnectCompo from "./ConnectComp";
import { FaReact } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div>
      <div className="h-[50rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.029] relative overflow-hidden">
        <Spotlight
          className="-top-50 left-0 md:left-60 md:-top-10"
          fill="white"
        />
        <div className="relative z-20 grid grid-cols-4 gap-8 w-full max-w-6xl px-8">
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
      <div className="relative mx-auto lg:max-w-none lg:px-8 md:px-4 max-w-[1100px] z-20 grid grid-cols-2 items-center gap-10 xl:gap-20 lg:gap-12">
        <h2 className="text-[36px] font-medium leading-dense tracking-extra-tight text-white xl:text-[32px] lg:text-[26px] sm:text-[22px]">
          Trusted in production by&nbsp;thousands of&nbsp;teams.
        </h2>

        <ul className="grid grid-cols-3 gap-8 xl:gap-12 lg:gap-8 sm:grid-cols-2 sm:gap-6">
          <li className="flex justify-center">
            <img
              className="h-7 w-auto xl:h-6 lg:h-5"
              src="/_next/static/svgs/React.svg"
              alt="Vercel V0"
              loading="lazy"
            />
          </li>
          <li className="flex justify-center">
            <img
              className="h-7 w-auto xl:h-6 lg:h-5"
              src="/_next/static/svgs/React.svg"
              alt="Zimmer Biomet"
              loading="lazy"
            />
          </li>
          <li className="flex justify-center">
            <img
              className="h-7 w-auto xl:h-6 lg:h-5"
              src="/_next/static/svgs/React.svg"
              alt="Retool"
              loading="lazy"
            />
          </li>
          <li className="flex justify-center">
            <img
              className="h-7 w-auto xl:h-6 lg:h-5"
              src="/_next/static/svgs/React.svg"
              alt="Boston Consulting Group"
              loading="lazy"
            />
          </li>
          <li className="flex justify-center">
            <img
              className="h-7 w-auto xl:h-6 lg:h-5"
              src="/_next/static/svgs/React.svg"
              alt="NerdWallet"
              loading="lazy"
            />
          </li>
          <li className="flex justify-center">
            <img
              className="h-7 w-auto xl:h-6 lg:h-5"
              src="/_next/static/svgs/React.svg"
              alt="mistral AI"
              loading="lazy"
            />
          </li>
        </ul>
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

      <div className="mt-20 mx-10">
        <Footer />
      </div>
    </div>
  );
};

export default HeroSection;
