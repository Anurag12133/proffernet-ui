"use client";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

const InputField = ({ placeholder, value, onChange, onKeyPress }: any) => (
  <div className="flex items-center justify-center h-10 space-x-4 mb-4">
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
  const [image, setImage] = React.useState<string | null>(null);

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
  const [isEditing, setIsEditing] = useState(true); // Start with input field visible

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setIsEditing(false); // Switch to display title after pressing Enter
    }
  };

  const handleTitleClick = () => {
    setIsEditing(true); // Switch to input mode if title is clicked
  };

  return (
    <div className="grid grid-cols-4 h-screen bg-black gap-1 relative">
      <div className="col-span-3 m-4 border rounded-xl px-10 py-10 mb-10 mt-8 relative">
        <button className="absolute top-5 right-5 w-24 h-10 bg-white rounded-full font-bold transform transition duration-300 hover:scale-105 hover:shadow-lg mt-4">
          Publish
        </button>

        <div className="flex justify-center items-center space-x-4 mb-4">
          {isEditing ? (
            <InputField
              placeholder="Write Title..."
              value={title}
              onChange={handleTitleChange}
              onKeyPress={handleTitleKeyPress}
            />
          ) : (
            <h1
              className="font-bold text-white font-mono text-3xl cursor-pointer "
              onClick={handleTitleClick}
            >
              {title || "Project Title"} {/* Default text if title is empty */}
            </h1>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-white font-mono text-3xl">
            Description:
          </h1>
        </div>
      </div>

      <div
        className="col-span-1 m-5 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {[...Array(8)].map((_, index) => (
          <ProjectCard key={index} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
