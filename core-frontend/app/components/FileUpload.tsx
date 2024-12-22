"use client";
import React, { useCallback } from "react";
import { FileUpload } from "@/app/components/ui/file-upload";
import { useProjectContext } from "../contexts/ProjectContext";

const UploadFile = () => {
  const { files, setFiles } = useProjectContext();

  const handleFileUpload = useCallback(
    (newFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [setFiles]
  );

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export default UploadFile;
