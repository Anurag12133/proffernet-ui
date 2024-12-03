"use client";
import React, { useState } from "react"; // Import useState to manage state
import UploadFile from "@/app/components/FileUpload";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import EditableTitle from "@/app/components/EditableTitle";
import "@/app/css/Input.css";
import { Textarea } from "@nextui-org/input";
import Button from "@/app/components/Button";

const Projects = () => {
  const [techStack, setTechStack] = useState(""); // State for input value
  const [techStacks, setTechStacks] = useState<string[]>([]); // State to store added tech stacks

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechStack(e.target.value); // Update the input field value
  };

  const [value, setValue] = React.useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techStack.trim() !== "") {
      // Prevent adding empty or whitespace tech stack
      setTechStacks((prevStacks) => [...prevStacks, techStack]);
      setTechStack(""); // Clear the input field
    }
  };

  const removeTechStack = (stackToRemove: string) => {
    setTechStacks((prevStacks) =>
      prevStacks.filter((stack) => stack !== stackToRemove)
    );
  };

  return (
    <div className="grid grid-cols-4 h-screen bg-black p-4 relative">
      <BackgroundBeams />

      <div className="col-span-3 flex flex-col rounded-xl p-6 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <EditableTitle />
          </div>

          <Button label="Submit" />
        </div>

        {/* Project Grid */}
        <div className="rounded-lg p-4 h-full ml-20 text-white">
          <div className="  ">
            {/* Input Box for Tech Stack */}
            <div className="relative">
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=""
                  value={techStack}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress} // Add key press handler to capture Enter key
                />
                <span className="input__label"> Tech Stack</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-2 px-3 py-1 border rounded-lg text-sm transition-all duration-300"
                >
                  {stack}
                  <span
                    className="text-gray-800 dark:text-gray-200 group-hover:text-white  cursor-pointer "
                    onClick={() => removeTechStack(stack)}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="description">
            <Textarea
              variant="bordered"
              placeholder="Enter your description"
              disableAnimation
              disableAutosize
              classNames={{
                base: "max-w-full",
                input: "resize-y min-h-[300px]",
              }}
            />
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="absolute top-0 bottom-0 left-[74%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />

      {/* Sidebar Section */}
      <div
        className="col-span-1 rounded-xl p-4 overflow-y-auto"
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
