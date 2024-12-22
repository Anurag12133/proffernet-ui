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
  const techStacksArray: string[] = [];

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
    project.tech_stacks.forEach((tech) => {
      if (!techStacksArray.includes(tech)) {
        techStacksArray.push(tech);
      }
    });
    const imageUrls = project.files
      ?.map((file) => {
        if (typeof file === "object" && file?.file) {
          return `http://127.0.0.1:8000${
            file.file.startsWith("/") ? file.file : `/${file.file}`
          }`;
        } else if (typeof file === "string") {
          return `http://127.0.0.1:8000${
            file.startsWith("/") ? file : `/${file}`
          }`;
        }
        return null;
      })
      .filter(Boolean);

    const defaultImageUrl =
      "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return {
      category: "Title",
      title: project.title,
      src: imageUrls?.[0] || defaultImageUrl,
      content: (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <div className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span>
              <h1 className="font-bold text-neutral-700 dark:text-neutral-200 mb-2">
                Description
              </h1>
              <h2 className="font-thin text-neutral-300 text-xl">
                {project.description || "No description available"}
              </h2>
            </span>
          </div>
          <div className="text-neutral-600 dark:text-white text-base md:text-2xl font-sans max-w-3xl mx-auto m-5 font-bold">
            Tech Stacks:
          </div>
          <div className="flex flex-row justify-center gap-2 mb-4">
            {project.tech_stacks.map((tech, index) => (
              <span
                key={index}
                className="text-neutral-200 px-2 py-1 rounded-full text-sm"
              >
                {tech}
                {index < project.tech_stacks.length - 1 && ","}
              </span>
            ))}
          </div>
          <div className="flex flex-row justify-center  gap-2">
            {imageUrls?.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl || defaultImageUrl}
                alt={`${project.title} image ${index + 1}`}
                width={600}
                height={400}
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-xl"
              />
            )) || (
              <Image
                src={defaultImageUrl}
                alt={project.title}
                width={600}
                height={400}
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
              />
            )}
          </div>
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
