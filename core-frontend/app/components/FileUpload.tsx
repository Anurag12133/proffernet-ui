"use client";
import React, { useState } from "react";
import FileUpload from "@/app/components/ui/file-upload";
import { ProjectProvider } from "../contexts/ProjectContext";

const UploadFile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <ProjectProvider>
        <FileUpload onChange={handleFileUpload} />
      </ProjectProvider>
    </div>
  );
};

export default UploadFile;
