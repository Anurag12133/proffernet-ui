"use client";
import React, { useCallback, useState } from "react";
import Flip from "@/app/components/ui/flip-words";
import ThreeDCard from "@/app/components/CardComponent";
import { useRouter } from "next/navigation";
import "../../css/Loader.css";
const FlipWords = () => {
  const words = ["passion", "skill", "talent", "potential"];
  const BASE_URL = "http://localhost:3000/pages";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleButton = useCallback(
    (route: string) => {
      setLoading(true);
      const fullUrl = `${BASE_URL}/${route}`;
      router.push(fullUrl);
    },
    [router]
  );

  return (
    <div>
      <div className="relative h-screen bg-black bg-section-image bg-cover bg-center filter grayscale brightness-20 ">
        <div className="absolute inset-0 bg-black opacity-95"></div>
        <div className="p-5 mx-10 text-4xl  font-normal text-neutral-200 dark:text-neutral-300">
          Logo
        </div>

        <div className="relative h-[5rem] flex justify-center items-center px-4 pr-[25rem]">
          <div className="text-4xl mx-auto font-normal text-neutral-200 dark:text-neutral-300">
            Connecting <Flip words={words} /> <br />
            through contributions with Proffernet
          </div>
        </div>

        <div className="relative text-center text-white flex justify-center gap-[5rem]">
          <div
            onClick={() => handleButton("projectlist")}
            className="cursor-pointer"
          >
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black from-black to-grey-100 bg-opacity-75 z-50">
                <div className="loader"></div>
              </div>
            )}
            <ThreeDCard
              type="Contributor"
              tag="Contribute. Collaborate. Create Impact."
            />
          </div>

          <div
            onClick={() => handleButton("projects")}
            className="cursor-pointer"
          >
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black from-black to-grey-100 bg-opacity-75 z-50">
                <div className="loader"></div>
              </div>
            )}
            <ThreeDCard
              type="Volunteer"
              tag="Be the Catalyst: Publish Your Project and Inspire Change."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipWords;
