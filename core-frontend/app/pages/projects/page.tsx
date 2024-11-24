"use client";
import UploadFile from "@/app/components/FileUpload";
import ProjectGrid from "@/app/components/ProjectGrid";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-4 h-screen bg-black gap-2 p-4 relative">
      {/* Main Project Section */}
      <div className="col-span-3 flex flex-col rounded-xl p-6 overflow-hidden shadow-lg">
        {/* Title and Publish Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-grow text-center">
            {editingTitle ? (
              <motion.input
                type="text"
                placeholder="Enter project title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleTitleSubmit}
                className="text-center text-xl font-semibold p-3 rounded-3xl shadow-md border  bg-black text-white outline-none w-[20rem]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              />
            ) : (
              <motion.h1
                onClick={handleTitleClick}
                className="text-3xl font-bold cursor-pointer text-white transition-transform hover:scale-105"
              >
                {title || "Untitled Project"}
              </motion.h1>
            )}
          </div>
          <button className="px-6 py-2 bg-white text-black rounded-lg font-bold transition-transform transform hover:scale-105">
            Publish
          </button>
        </div>

        {/* Project Grid */}
        <div className="flex-grow rounded-lg p-4 ">
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
