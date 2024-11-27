import CardsForProject from "@/app/components/CardsProject";
import { IoIosArrowForward } from "react-icons/io";

const projectList = () => {
  return (
    <div className="bg-black min-h-screen flex relative">
      <aside className="w-1/5 bg-black p-4 text-white h-screen sticky top-0 flex flex-col items-center justify-center z-10">
        <ul className="space-y-5 text-left animate-fadeIn">
          {["Frontend", "Backend", "Full Stack", "DevOps"].map(
            (item, index) => (
              <li
                key={item}
                className="flex items-center cursor-pointer transform transition duration-300 ease-out hover:scale-105 hover:translate-x-2 opacity-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <IoIosArrowForward className="mr-2" /> {item}
              </li>
            )
          )}
        </ul>
      </aside>

      <div className="absolute top-0 bottom-0 left-[20%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />

      <main className="w-4/5 h-screen overflow-y-auto">
        <CardsForProject TechStack="Frontend" />
        <CardsForProject TechStack="Backend" />
        <CardsForProject TechStack="Devops" />
        <CardsForProject TechStack="Full Stack" />
      </main>
    </div>
  );
};

export default projectList;
