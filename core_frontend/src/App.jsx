import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    try {
      const data = await fetch("http://127.0.0.1:8000/api/projects/");
      const response = await data.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>Projects</div>
    </>
  );
}

export default App;
