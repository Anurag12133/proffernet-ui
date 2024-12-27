"use client";
import React from "react";
import { HoverBorderGradient } from "@/app/components/ui/hover-border-gradient";
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <div className=" flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black  border border-none dark:text-white flex items-center space-x-2"
        onClick={onClick}
      >
        <span>{label}</span>
      </HoverBorderGradient>
    </div>
  );
};

export default Button;
