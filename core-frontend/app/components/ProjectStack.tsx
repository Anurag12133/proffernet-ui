import React, { useState } from "react";
import { useProjectContext } from "@/app/contexts/ProjectContext";

const ProjectStack = () => {
  const { techStacks, setTechStacks } = useProjectContext();
  const [techStack, setTechStack] = useState("");

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTechStack(e.target.value);
    },
    []
  );

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && techStack.trim() !== "") {
        setTechStacks((prevStacks: string[]) => [...prevStacks, techStack]);
        setTechStack("");
      }
    },
    []
  );

  const removeTechStack = React.useCallback(
    (stackToRemove: string) => {
      setTechStacks((prevStacks: string[]) =>
        prevStacks.filter((stack: string) => stack !== stackToRemove)
      );
    },
    [setTechStacks]
  );

  const TechStackItem = ({
    stack,
    onRemove,
  }: {
    stack: string;
    onRemove: () => void;
  }) => (
    <button
      type="button"
      className="relative flex items-center gap-2 px-3 py-1 border rounded-lg text-sm transition-all duration-300"
      onClick={onRemove}
      onKeyDown={React.useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onRemove();
          }
        },
        [onRemove]
      )}
      tabIndex={0}
    >
      {stack}
      <span className="text-gray-800 dark:text-gray-200 group-hover:text-white cursor-pointer">
        x
      </span>
    </button>
  );

  return (
    <div>
      <div className="relative">
        <label className="input">
          <input
            className="input__field"
            type="text"
            placeholder=""
            value={techStack}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <span className="input__label">Tech Stack</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {techStacks.map((stack) => (
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
