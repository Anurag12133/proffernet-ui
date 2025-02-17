"use client";
import React, { useCallback, useState } from "react";
import Flip from "@/app/components/ui/flip-words";
import ThreeDCard from "@/app/components/SelectionComponent/SelectionCardComonent";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Spinner from "../SpinnerComponent/Spinner";

const CategoryCards = () => {
  const words = ["passion", "skill", "talent", "potential"];

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleButton = useCallback(
    (route: string) => {
      setLoading(true);
      const fullUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/pages/${route}`;
      router.push(fullUrl);
    },
    [router]
  );

  return (
    <div className="relative h-screen bg-black bg-cover bg-center filter grayscale brightness-20 ">
      <div className="relative h-[5rem] flex justify-center items-center px-4 pr-[30rem]">
        <div className="text-4xl mx-auto font-normal text-neutral-200 dark:text-neutral-300 mt-[15rem]">
          Connecting <Flip words={words} /> <br />
          through contributions with Proffernet
        </div>
      </div>

      <div className="relative text-center text-white flex justify-center gap-[5rem] mt-[5rem]">
        <div
          onClick={() => handleButton("projectlist")}
          className="cursor-pointer"
        >
          {loading && (
         <Spinner/>
          )}
          <ThreeDCard
            type="Contributor"
            tag="Contribute. Collaborate. Create Impact."
          />
        </div>

        <div onClick={() => handleButton("project")} className="cursor-pointer">
          {loading && (
          <Spinner/>
          )}
          <ThreeDCard
            type="Volunteer"
            tag="Be the Catalyst: Publish Your Project and Inspire Change."
          />
        </div>
      </div>
      <div className="flex items-center justify-center mr-[45rem]">
  <div className="text-center  rounded-lg shadow-lg">
    <h2 className="text-l font-sans font-semibold text-white">Continue to the Dashboard  <span>
      <Button className="ml-3" onClick={() => handleButton("dashboard")}>
        Dashboard
      </Button>
    </span></h2>
   
  </div>
</div>

    </div>
  );
};

export default CategoryCards;
