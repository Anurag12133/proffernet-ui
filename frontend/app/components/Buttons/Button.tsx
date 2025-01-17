"use client";
import React from "react";
import { HoverBorderGradient } from "@/app/components/ui/hover-border-gradient";
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <div className=" flex justify-center text-center animate-bounce hover:animate-none">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-background bg-white text-white  items-center space-x-2"
        onClick={onClick}
      >
        <span>{label}</span>
      </HoverBorderGradient>
    </div>
  );
};

export default Button;
