"use client";
import { cn } from "@/app/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "./ui/input";

const ProjectGrid = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};

const SkeletonOne = () => {
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
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      {/* Column 1 */}
      <div className="space-y-2">
        <motion.div
          variants={variants}
          initial="initial"
          whileHover="animate"
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full h-4 rounded-full dark:bg-black text-white placeholder:text-lg focus:outline-none placeholder:pl-2"
          />
        </motion.div>
        <motion.div
          variants={variantsSecond}
          initial="initial"
          whileHover="animate"
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
        >
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full  h-4 rounded-full dark:bg-black text-white placeholder:text-lg  placeholder:pl-2 focus:outline-none"
          />
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        </motion.div>
        <motion.div
          variants={variants}
          initial="initial"
          whileHover="animate"
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full h-4 rounded-full dark:bg-black text-white placeholder:text-lg placeholder:pl-2 focus:outline-none"
          />
        </motion.div>
      </div>

      {/* Column 2 */}
      <div className="space-y-2">
        <motion.div
          variants={variants}
          initial="initial"
          whileHover="animate"
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full bg-gray-100 h-4 rounded-full dark:bg-black text-white placeholder:text-lg focus:outline-none placeholder:pl-2"
          />
        </motion.div>

        <motion.div
          variants={variantsSecond}
          initial="initial"
          whileHover="animate"
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
        >
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full bg-gray-100 h-4 rounded-full  dark:bg-black text-white placeholder:pl-2 placeholder:text-lg focus:outline-none"
          />
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        </motion.div>
        <motion.div
          variants={variants}
          initial="initial"
          whileHover="animate"
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full bg-gray-100 h-4 rounded-full dark:bg-black text-white placeholder:pl-2 placeholder:text-lg focus:outline-none"
          />
        </motion.div>
      </div>
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
    className: "md:col-span-3",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Description",
    description: (
      <textarea
        placeholder="Write here..."
        className="w-full h-[15rem] p-4 bg-transparent outline-none  text-white placeholder:text-lg placeholder:text-gray-400 text-lg"
      />
    ),
    className: "md:col-span-3 h-[30rem] ",
  },
];
export default ProjectGrid;
