"use client";
import React from "react";
import HeroSlider from "./HomeSlider";

const TextLink = () => {
  return (
    <div className="flex justify-center items-center h-[60rem] flex-col px-4">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        From Code to Collaboration: Write Code in React, Django &{"     "}
        Node and More.
      </p>
      <div className="">
        <HeroSlider />
      </div>
    </div>
  );
};

export default TextLink;
