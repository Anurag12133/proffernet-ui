import CardsForProject from "@/app/components/CardsProject";

const projectList = () => {
  return (
    <div className="bg-black min-h-screen flex">
      {/* Sidebar (fixed height, no scrolling) */}
      <aside className="w-1/5 bg-black p-4 text-white h-screen sticky top-0 border-r border-gray-600 flex flex-col items-center justify-center  ">
        <h2 className="text-xl font-semibold mb-4">Searchbar</h2>
        <ul className="space-y-2 text-center">
          <li>Frontend</li>
          <li>Backend</li>
          <li>Full Stack </li>
          <li>Devops</li>
        </ul>
      </aside>

      {/* Main content (scrollable) */}
      <main className="w-4/5 p-4 h-screen overflow-y-auto">
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        <CardsForProject />
        {/* Add more CardsForProject components as needed */}
      </main>
    </div>
  );
};

export default projectList;
