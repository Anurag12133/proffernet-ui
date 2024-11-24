"use client";
import React from "react";
import { HoverBorderGradient } from "@/app/components/ui/hover-border-gradient";

const Button = () => {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span> Get Started</span>
      </HoverBorderGradient>
    </div>
  );
};

export default Button;
