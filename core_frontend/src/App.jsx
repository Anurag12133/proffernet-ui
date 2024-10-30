import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [projects, setProject] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setdescription] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await fetch("http://127.0.0.1:8000/api/projects/");
      const response = await data.json();
      setProject(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const addProject = async () => {
    const projectData = {
      title: title,
      description: description,
    };
    try {
      const data = await fetch("http://127.0.0.1:8000/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      const response = await data.json();
      setProject((prev) => [...prev, response]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        Projects
        {projects.map((project) => (
          <div>
            <div>Title: {project.title}</div>
            <div>{project.description}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <button onClick={addProject}>Add</button>
      </div>
    </>
  );
}

export default App;
