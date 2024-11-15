"use client";
import React, { useRef, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

const ProjectGrid = () => {
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
    <div>
      <div className="relative flex justify-center items-center h-[3rem]">
        {/* Title Input or Display */}
        <div className="text-center">
          {editingTitle ? (
            <motion.input
              type="text"
              placeholder="Enter project title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleTitleSubmit}
              className="text-center text-3xl font-semibold p-3 rounded-lg shadow-lg border border-neutral-500 dark:border-neutral-600 bg-white dark:bg-black text-black dark:text-white outline-none w-[20rem]"
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
      </div>

      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-10">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

const SkeletonOne = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or default behavior
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
        setFocusedInput(index + 1);
      }
    }
  };

  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
    focused: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const focusedVariant = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const inputs = [0, 1, 2, 3, 4, 5]; // Representing the total number of input boxes

  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      {inputs.map((_, index) => (
        <motion.div
          key={index}
          variants={index === focusedInput ? focusedVariant : variants}
          initial="initial"
          whileHover="animate"
          animate={index === focusedInput ? "animate" : "initial"}
          className={`flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 ${
            index % 2 === 0
              ? "bg-white dark:bg-black"
              : "w-3/4 ml-auto bg-white dark:bg-black"
          }`}
        >
          {index % 2 === 0 && (
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          )}
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }} // Assign ref
            type="text"
            placeholder="Enter text..."
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full h-4 rounded-full dark:bg-black text-white placeholder:text-lg placeholder:pl-2 focus:outline-none"
          />
          {index % 2 !== 0 && (
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const items = [
  {
    title: "Tech Stack",
    description: (
      <span className="text-sm">
        Write Primary Tech Stack only used during Project.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-3 border-none",
  },
  {
    title: "Description",
    description: (
      <textarea
        placeholder="Write here..."
        className="w-full h-[20rem] p-1 bg-transparent outline-none text-white placeholder:text-lg placeholder:text-gray-400 text-lg"
      />
    ),
    className: "md:col-span-3 h-[25rem]",
  },
];

export default ProjectGrid;
