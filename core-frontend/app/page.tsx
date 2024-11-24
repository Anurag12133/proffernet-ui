import React from "react";
import Navbar from "./components/Navbar";
import HeroPage from "@/app/pages/hero/page";

export default function Home() {
  return (
    <div>
      <div className="bg-black w-full ">
        <Navbar />
      </div>
      <div className="bg-black">
        <HeroPage />
      </div>
    </div>
  );
}
