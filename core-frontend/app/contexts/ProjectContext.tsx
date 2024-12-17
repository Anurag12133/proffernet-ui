import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface ProjectContextType {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  tech_stacks: string[];
  setTechStacks: React.Dispatch<React.SetStateAction<string[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
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
  const [files, setFiles] = useState<File[]>([]);

  const handleSave = async () => {
    if (tech_stacks.length === 0) {
      console.error("Tech stacks are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tech_stacks", JSON.stringify(tech_stacks));

      files.forEach((file) => {
        formData.append("files", file);
      });

      console.log("FormData being sent:", formData);

      const response = await axios.post(
        "http://127.0.0.1:8000/project/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Project created successfully");
        setTitle("");
        setDescription("");
        setTechStacks([]);
        setFiles([]);
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
        files,
        setFiles,
        handleSave,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
