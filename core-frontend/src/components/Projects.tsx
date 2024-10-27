import axios from "axios";
import { useState, useEffect } from "react";

const ProjectList = () => {
  interface Project {
    id: number;
    title: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
