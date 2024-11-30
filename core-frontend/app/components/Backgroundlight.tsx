"use client";
import React, {useState} from "react";
import { Boxes } from "@/app/components/ui/background-boxes";
import { cn } from "@/app/lib/utils";
import Button from "./Button";
import {useRouter} from "next/navigation";

const BackgroundBoxes = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);

        setTimeout(() => {
            router.push("http://localhost:3000/pages/signin");
        }, 500);
    };
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
      <button className="text-center mt-5 text-neutral-300 relative z-20" onClick={handleSubmit}>
        <Button />
      </button>
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black from-black to-grey-100 bg-opacity-75 z-50">
                <div className="loader"></div>
            </div>
        )}
    </div>
  );
};

export default BackgroundBoxes;
