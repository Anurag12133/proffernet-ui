import React, { createContext, useContext, useState } from "react";

interface ProjectContextType {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  techStacks: string[];
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
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("techStacks", JSON.stringify(techStacks));

      files.forEach((file) => {
        formData.append("files", file); // Ensure this matches the key expected in Django
      });

      console.log(formData);

      const response = await fetch("http://127.0.0.1:8000/project/create/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Project created successfully");
        setTitle(""); // Reset title
        setDescription(""); // Reset description
        setTechStacks([]); // Reset techStacks
        setFiles([]); // Reset files
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
        techStacks,
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
