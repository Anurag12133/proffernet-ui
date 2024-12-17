"use client";
import React, { useState } from "react";
import { FileUpload } from "@/app/components/ui/file-upload";
import { useProjectContext } from "../contexts/ProjectContext";

const UploadFile = () => {
  const { setFiles } = useProjectContext();

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export default UploadFile;
