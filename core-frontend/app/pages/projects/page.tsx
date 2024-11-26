"use client";
import UploadFile from "@/app/components/FileUpload";
import ProjectGrid from "@/app/components/ProjectGrid";
import { useState } from "react";
import { motion } from "framer-motion";
import { Background } from "@tsparticles/engine";
import { BackgroundBeams } from "@/app/components/ui/background-beams";

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
        <div className="flex items-center justify-between mb-2">
          {" "}
          {/* Reduced bottom margin */}
          <div className="flex-grow text-center">
            {editingTitle ? (
              <motion.input
                type="text"
                placeholder="Enter project title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditingTitle(false); // Switch to title view
                  }
                }}
                className="text-center text-2xl font-semibold p-2 w-[24rem] mx-auto bg-transparent text-white outline-none 
                 border-b-[3px] border-b-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #888888, #ffffff, #888888)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              />
            ) : (
              <motion.h1
                onClick={() => setEditingTitle(true)} // Switch back to input view
                className="text-4xl font-bold cursor-pointer text-white inline-block relative 
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] 
                 after:bg-gradient-to-r from-gray-300 via-white to-gray-300"
              >
                {title || "Untitled Project"}
              </motion.h1>
            )}
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
