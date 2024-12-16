import React, { useState, useCallback } from "react";
import { useProjectContext } from "@/app/contexts/ProjectContext";

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
        console.log("Updated techStacks:", [...tech_stacks, techStack.trim()]);
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
      console.log("Updated techStacks after removal:", tech_stacks);
    },
    [setTechStacks, tech_stacks]
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
        <span className="text-gray-800 dark:text-gray-200 group-hover:text-white cursor-pointer">
          x
        </span>
      </button>
    )
  );

  return (
    <div>
      <div className="relative">
        <label className="input">
          <input
            className="input__field"
            type="text"
            placeholder="Add a tech stack"
            value={techStack}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <span className="input__label">Tech Stack</span>
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
