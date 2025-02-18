import React, { useState, useCallback } from "react";
import { useProjectContext } from "@/contexts/projectcontext";

const ProjectStack = () => {
  const { tech_stacks, setTechStacks } = useProjectContext();
  const [techStack, setTechStack] = useState("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTechStack(e.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && techStack.trim() !== "") {
        setTechStacks((prevStacks) => [...prevStacks, techStack.trim()]);
        setTechStack("");
      }
    },
    [techStack, setTechStacks]
  );

  const removeTechStack = useCallback(
    (stackToRemove: string) => {
      setTechStacks((prevStacks) =>
        prevStacks.filter((stack) => stack !== stackToRemove)
      );
    },
    [setTechStacks]
  );

  const TechStackItem = React.memo(
    ({ stack, onRemove }: { stack: string; onRemove: () => void }) => (
      <button
        type="button"
        className="relative flex items-center gap-2 px-3 py-1 border rounded-lg text-sm transition-all duration-300"
        onClick={onRemove}
        tabIndex={0}
      >
        {stack}
        <span className="text-gray-800 dark:text-gray-200 group-hover:text-white cursor-pointer dark:border-white/[0.2] border-transparent border">
          x
        </span>
      </button>
    )
  );

  TechStackItem.displayName = "TechStackItem";

  return (
    <div>
     <div className="relative mt-4">
  <label className="relative block">
    <input
      type="text"
      placeholder=" "
      value={techStack}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      className="peer w-full p-4 bg-transparent text-white outline-none border-transparent transition-all duration-200 ease-in-out focus:border-white/[0.2] rounded-xl dark:border-white/[0.2] border focus:ring-0"
    />
    <span className="absolute left-4 top-4 transform transition-all duration-300 ease text-white font-medium bg-black px-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-1.5rem] peer-focus:scale-90">
      Tech Stack
    </span>
  </label>
</div>



      <div className="flex flex-wrap gap-2 mt-4">
        {tech_stacks.map((stack) => (
          <TechStackItem
            key={stack}
            stack={stack}
            onRemove={() => removeTechStack(stack)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectStack;
