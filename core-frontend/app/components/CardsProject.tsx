import axios from "axios";
import Image from "next/image";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";

interface File {
  file: string;
}

interface ProjectType {
  id: number;
  title: string;
  description: string;
  project_type: string;
  tech_stacks: string[];
  files: string[] | File[];
}

const CardsForProject = async ({ TechStack }: { TechStack: string }) => {
  const projects: ProjectType[] = [];

  try {
    const fetchData = await axios.get(
      "http://127.0.0.1:8000/project/projectlist"
    );
    projects.push(...fetchData.data);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  const filteredProjects = projects.filter(
    (project) => project.project_type === TechStack
  );

  const data = filteredProjects.map((project) => {
    const firstFile = project.files?.[0];
    let imageUrl =
      "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    if (typeof firstFile === "object" && firstFile?.file) {
      imageUrl = `http://127.0.0.1:8000${
        firstFile.file.startsWith("/") ? firstFile.file : `/${firstFile.file}`
      }`;
    } else if (typeof firstFile === "string") {
      imageUrl = `http://127.0.0.1:8000${
        firstFile.startsWith("/") ? firstFile : `/${firstFile}`
      }`;
    }

    return {
      category: "Project",
      title: project.title,
      src: imageUrl,
      content: (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {project.description || "No description available"}
            </span>
          </p>

          <Image
            src={imageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ),
    };
  });

  const cards = data.map((card, index) => (
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {TechStack}
      </h2>
      <Carousel items={cards} />
    </div>
  );
};

export default CardsForProject;
