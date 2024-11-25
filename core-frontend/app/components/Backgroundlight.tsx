"use client";
import React from "react";
import { Boxes } from "@/app/components/ui/background-boxes";
import { cn } from "@/app/lib/utils";
import Button from "./Button";

const BackgroundBoxes = () => {
  return (
    <div className="h-[35rem]   relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1
        className={cn(
          "md:text-6xl font-bold text-3xl text-white relative z-20"
        )}
      >
        Build Together, Grow Together
      </h1>
      <p className="text-center mt-5 text-neutral-300 relative z-20">
        <Button />
      </p>
    </div>
  );
};

export default BackgroundBoxes;
