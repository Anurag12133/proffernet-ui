"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import UploadFile from "@/app/components/FileUpload";
import ProjectGrid from "@/app/components/ProjectGrid";

const InputField = ({ placeholder, value, onChange, onKeyPress }: any) => (
  <div className="flex items-center justify-center h-10 space-x-4 mb-4 w-full">
    <input
      className="border rounded-3xl bg-black placeholder-stone-300 text-white px-4 py-2 w-full max-w-lg placeholder:text-lg"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  </div>
);

const ProjectCard = ({ index }: any) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 mb-5 mx-auto">
      <div
        className={`h-64 mr-5 flex items-center justify-center text-black font-bold relative overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl rounded-xl ${
          image ? "" : "border-2 border-dashed border-gray-50"
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={`Uploaded for project ${index}`}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transform transition duration-300">
              <MdCloudUpload className="text-white font-bold text-5xl" />
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [description, setDescription] = useState("");
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(true);
  const [techStack, setTechStack] = useState("");
  const [techStackList, setTechStackList] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleTechStackChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTechStack(event.target.value);
  };

  const handleTechStackKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && techStack.trim()) {
      setTechStackList([...techStackList, techStack.trim()]);
      setTechStack("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTechStackList(techStackList.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="grid grid-cols-4 h-screen bg-black gap-1 relative">
      <div className="col-span-3 m-4 rounded-xl px-10 py-10 mb-10 mt-8 relative">
        <button className="absolute top-5 right-5 w-24 h-10 bg-white rounded-full font-bold transform transition duration-300 hover:scale-105 hover:shadow-lg mt-4">
          Publish
        </button>
        <ProjectGrid />
      </div>

      <div
        className="col-span-1 m-5 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {[...Array(8)].map((_, index) => (
          <UploadFile />
        ))}
      </div>
    </div>
  );
};

export default Projects;
