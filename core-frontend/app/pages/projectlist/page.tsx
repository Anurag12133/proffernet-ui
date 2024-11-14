import CardsForProject from "@/app/components/CardsProject";
import { IoIosArrowForward } from "react-icons/io";

const projectList = () => {
  return (
    <div className="bg-black min-h-screen flex">
      <aside className="w-1/5 bg-black p-4 text-white h-screen sticky top-0 border-r border-gray-600 flex flex-col items-center justify-center">
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

      <main className="w-4/5 p-4 h-screen overflow-y-auto">
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
      </main>
    </div>
  );
};

export default projectList;
