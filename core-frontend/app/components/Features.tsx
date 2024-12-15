import React from "react";
import { Timeline } from "@/app/components/ui/timeline";

const Features = () => {
  const data = [
    {
      title: "Collaborations",
      content: (
        <div>
          <div className="grid grid-cols-2 "></div>
        </div>
      ),
    },
    {
      title: "Growth, Learning",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ),
    },
    {
      title: "Networking",
      content: <div></div>,
    },
  ];
  return (
    <div className="w-full h-[10rem]">
      <Timeline data={data} />
    </div>
  );
};

export default Features;
