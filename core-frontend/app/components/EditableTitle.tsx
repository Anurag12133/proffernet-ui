import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const EditableTitle = () => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when editing
  useEffect(() => {
    if (editingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTitle]);

  const handleBlur = () => {
    setEditingTitle(false);
  };

  return (
    <div className="flex items-center justify-center pl-[7rem]">
      <div className="flex flex-col items-center relative">
        {editingTitle ? (
          <div className="relative flex items-center">
            {/* Vertical Line */}
            <div className="absolute left-1 h-[150%] w-[1px] bg-gray-300 -translate-x-2" />

            <motion.input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditingTitle(false);
                }
              }}
              onBlur={handleBlur}
              className="text-4xl font-['Poppins'] w-[24rem] bg-transparent text-white outline-none pl-4 text-opacity-1"
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
          </div>
        ) : (
          <motion.h1
            onClick={() => setEditingTitle(true)}
            className="text-4xl font-['Poppins']  cursor-pointer text-center"
            style={{
              backgroundImage:
                "linear-gradient(to right, #888888, #ffffff, #888888)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title || "Title..."}
          </motion.h1>
        )}
      </div>
    </div>
  );
};

export default EditableTitle;
