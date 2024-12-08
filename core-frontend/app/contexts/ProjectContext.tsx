import React, { createContext, useContext, useState } from "react";

interface ProjectContextType {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  techStacks: string[];
  setTechStacks: (stacks: string[]) => void;
  files: File[];
  setFiles: (images: File[]) => void;
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
  const [title, setTitle] = useState("Write Title..");
  const [description, setDescription] = useState("");
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
