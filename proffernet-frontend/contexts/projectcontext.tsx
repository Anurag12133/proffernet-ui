import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useToast } from "@/lib/use-toast";

interface ProjectContextType {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  project_type: string;
  setProjectType: (value: string) => void;
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
  const [project_type, setProjectType] = useState("");
  const [tech_stacks, setTechStacks] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const { toast } = useToast();

  const handleSave = async () => {
    if (tech_stacks.length < 2) {
      console.error("At least two tech stacks are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("project_type", project_type);
      formData.append("tech_stacks", JSON.stringify(tech_stacks));

      files.forEach((file) => {
        formData.append("file", file);
      });

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/project/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        const projectId = response.data.id; 
        localStorage.setItem("projectId", projectId);
        toast({
          title: "Success",
          description: `Project created successfully! ID: ${projectId}`,
          variant: "default",
        });
        setTitle("Title Here...");
        setDescription("");
        setProjectType("");
        setTechStacks([]);
        setFiles([]);
        toast({
          title: "Success",
          description: "Project created successfully",
          variant: "default",

        })
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
        project_type,
        setProjectType,
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
