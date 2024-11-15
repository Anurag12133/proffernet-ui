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
    <div className="grid grid-cols-4 h-screen bg-black gap-1 relative">
      <div className="col-span-3 m-4 rounded-xl px-10 mt-10 relative">
        {/* Flex container for title and button */}
        <div className="flex items-center justify-between  w-full ">
          {/* Title Input or Display */}
          <div className="flex-grow text-center ">
            {editingTitle ? (
              <motion.input
                type="text"
                placeholder="Enter project title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleTitleSubmit}
                className="text-center text-xl font-semibold p-3 rounded-3xl shadow-lg border border-neutral-500 dark:border-neutral-600 bg-white dark:bg-black text-black dark:text-white outline-none w-[20rem]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              />
            ) : (
              <motion.h1
                onClick={handleTitleClick}
                className="text-3xl font-bold cursor-pointer text-black dark:text-white transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {title || "Untitled Project"}
              </motion.h1>
            )}
          </div>

          {/* Publish Button */}
          <button className="px-6 py-2 bg-white border-2 border-transparent bg-clip-border text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 ">
            Publish
          </button>
        </div>

        {/* Project Grid */}
        <div>
          <ProjectGrid />
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-[74%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />

      <div
        className="col-span-1 m-5 overflow-y-auto"
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
