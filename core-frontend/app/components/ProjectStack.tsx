import React, { useState } from "react";
import { useProjectContext } from "@/app/contexts/ProjectContext";

const ProjectStack = () => {
    const { techStacks, setTechStacks } = useProjectContext();
    const [techStack, setTechStack] = useState("");

    console.log(techStacks);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTechStack(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && techStack.trim() !== "") {
            setTechStacks((prevStacks) => [...prevStacks, techStack]);
            setTechStack("");
        }
    };

    const removeTechStack = (stackToRemove: string) => {
        setTechStacks((prevStacks) =>
            prevStacks.filter((stack) => stack !== stackToRemove)
        );
    };

    return (
        <div>
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

                {/* Render techStacks from context */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {techStacks.map((stack, index) => (
                        <div
                            key={index}
                            className="relative flex items-center gap-2 px-3 py-1 border rounded-lg text-sm transition-all duration-300"
                        >
                            {stack}
                            <span
                                className="text-gray-800 dark:text-gray-200 group-hover:text-white cursor-pointer"
                                onClick={() => removeTechStack(stack)}
                            >
                x
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectStack;
