import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useProjectContext } from "@/contexts/projectcontext";

const EditableTitle = () => {
  const [editingTitle, setEditingTitle] = useState(false);
  const { title, setTitle } = useProjectContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState("10ch"); 

  useEffect(() => {
    if (editingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTitle]);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(`${spanRef.current.scrollWidth + 10}px`); 
    }
  }, [title]);

  const handleBlur = () => {
    setEditingTitle(false);
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setEditingTitle(false);
      }
    },
    []
  );

  const handleClickTitle = React.useCallback(() => {
    setEditingTitle(true);
  }, []);

  const handleChangeTitle = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  return (
    <div className="flex items-center justify-center pl-[7rem]">
      <div className="flex flex-col items-center relative">
        {editingTitle ? (
          <div className="relative flex items-center">
            <div className="absolute left-1 h-[150%] w-[1px] bg-gray-300 -translate-x-2" />
            <motion.input
              ref={inputRef}
              type="text"
              value={title}
              onChange={handleChangeTitle}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="text-4xl font-['Poppins'] bg-transparent text-white outline-none pl-4 text-opacity-1"
              style={{
                minWidth: "10ch",
                width: inputWidth,
                backgroundImage:
                  "linear-gradient(to right, #888888, #ffffff, #888888)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            />
          </div>
        ) : (
          <motion.h1
            onClick={handleClickTitle}
            className="text-3xl font-['Poppins'] cursor-pointer text-center dark:border-white/[0.2] border-transparent border rounded-xl px-5 py-2 ml-[-20px] min-w-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #888888, #ffffff, #888888)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </motion.h1>
        )}

        <span
          ref={spanRef}
          className="absolute invisible whitespace-nowrap text-4xl font-['Poppins']"
        >
          {title || "Placeholder"}
        </span>
      </div>
    </div>
  );
};

export default EditableTitle;
