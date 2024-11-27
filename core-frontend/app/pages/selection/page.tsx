import React from "react";
import Flip from "@/app/components/ui/flip-words";
import ThreeDCard from "@/app/components/CardComponent";

const FlipWords = () => {
  const words = ["passion", "skill", "talent", "potential"];

  return (
    <div className="relative h-screen bg-black bg-section-image bg-cover bg-center filter grayscale brightness-20 ">
      <div className="absolute inset-0 bg-black opacity-95"></div>
      <div className=" p-5 mx-10 text-pink-300 ">Logo</div>
      <div className="relative h-[15rem] flex justify-center items-center px-4 pr-[25rem] ">
        <div className="text-4xl mx-auto font-normal text-neutral-200 dark:text-neutral-300">
          Connecting
          <Flip words={words} /> <br />
          through contributions with Proffernet
        </div>
      </div>

      <div className="relative h-[20rem] text-center text-white flex justify-center gap-[5rem]">
        <ThreeDCard
          type={"Contributor"}
          tag={"Contribute. Collaborate. Create Impact."}
        />
        <ThreeDCard
          type={"Volunteer"}
          tag={"Be the Catalyst: Publish Your Project and Inspire Change."}
        />
      </div>
    </div>
  );
};

export default FlipWords;
