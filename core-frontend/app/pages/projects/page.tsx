"use client";
import UploadFile from "@/app/components/FileUpload";
import ProjectGrid from "@/app/components/ProjectGrid";
import { useState } from "react";
import { motion } from "framer-motion";
import { Background } from "@tsparticles/engine";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import EditableTitle from "@/app/components/EditableTitle";

const Projects = () => {
  const [title, setTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(true);

  const handleTitleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setEditingTitle(false);
    }
  };

  const handleTitleClick = () => {
    setEditingTitle(true);
  };

  return (
    <div className="grid grid-cols-4 h-screen bg-black  p-4 relative">
      <BackgroundBeams />
      {/* Main Project Section */}
      <div className="col-span-3 flex flex-col rounded-xl p-6 overflow-hidden shadow-lg">
        {/* Title and Publish Button */}
        <div className="flex items-center justify-between mb-2 ">
          <div className="">
            {" "}
            <EditableTitle />
          </div>

          <button className="px-6 py-2 ">Publish</button>
        </div>

        {/* Project Grid */}
        <div className="rounded-lg p-4  h-[20rem]">
          <ProjectGrid />
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="absolute top-0 bottom-0 left-[74%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />

      {/* Sidebar Section */}
      <div
        className="col-span-1 rounded-xl p-4 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {[...Array(8)].map((_, index) => (
          <UploadFile key={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
