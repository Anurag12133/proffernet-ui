import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDropDownLine } from "react-icons/ri";

const ProjectDropDown = () => {
  const [selectedType, setSelectedType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const projectTypes = ["Frontend", "Backend", "Fullstack", "DevOps"];

  return (
    <div className="relative w-64">
      <motion.div
        className="flex items-center justify-between w-full p-2 text-custom-gray bg-black border border-transaparent  dark:border-white/[0.2] rounded-lg shadow-sm cursor-pointer  focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {selectedType || "Enter project type"}

        <RiArrowDropDownLine
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full  border border-gray-300 rounded-lg shadow-lg bg-black dark:border-white/[0.2] border-transparent"
          >
            {projectTypes.map((type) => (
              <motion.li
                key={type}
                className="p-3 text-white rounded-lg cursor-pointer hover:text-white"
                onClick={() => {
                  setSelectedType(type);
                  setIsOpen(false);
                }}
              >
                {type}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDropDown;
