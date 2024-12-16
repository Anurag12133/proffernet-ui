import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface ProjectContextType {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  tech_stacks: string[];
  setTechStacks: React.Dispatch<React.SetStateAction<string[]>>;
  handleSave: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState("Title Here..");
  const [description, setDescription] = useState("");
  const [tech_stacks, setTechStacks] = useState<string[]>([]);

  const handleSave = async () => {
    if (tech_stacks.length === 0) {
      console.error("Tech stacks are required.");
      return; // Prevent submission if techStacks is empty
    }

    try {
      const payload = {
        title,
        description,
        tech_stacks,
      };

      console.log("Payload being sent:", payload); // Debugging line

      const response = await axios.post(
        "http://127.0.0.1:8000/project/create/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Project created successfully");
        setTitle(""); // Reset title
        setDescription(""); // Reset description
        setTechStacks([]); // Reset techStacks
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        tech_stacks,
        setTechStacks,
        handleSave,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
