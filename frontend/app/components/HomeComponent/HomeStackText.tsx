import React from "react";
import { Cover } from "@/app/components/ui/cover";

const StackText = () => {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white font-['Poppins']">
        Collaborate to Create <br /> and make a <Cover>Synergy</Cover>
      </h1>
    </div>
  );
};

export default StackText;
