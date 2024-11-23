import React from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/Hero-section";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-black">
        <HeroSection />
      </div>
    </div>
  );
}
