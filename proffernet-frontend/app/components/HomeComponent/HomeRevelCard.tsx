"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/app/components/ui/text-reveal-card";

const RevealCard = () => {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10]  rounded-2xl w-full">
      <TextRevealCard
        text="Collaborative Projects."
        revealText=" Endless Possibilities."
      >
        <TextRevealCardTitle>
          Where Students Meet Opportunities.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          &quot;Great things are never done by one person. They’re done by a team of
          people.&quot;
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
};

export default RevealCard;
