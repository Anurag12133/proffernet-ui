import React from "react";
import { BackgroundLines } from "./components/ui/background-lines";
import Button from "./components/button";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Proffernet
          <br />
          "Where learning meets real-world impact"
        </h2>
        <br />
        <div>
          <Button />
        </div>
      </BackgroundLines>
    </div>
  );
}
