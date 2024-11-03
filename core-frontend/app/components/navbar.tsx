const Navbar = () => {
  return (
    <nav className="shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-indigo-600">
              Proffernet
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-lg font-bold">
            <a
              href="#"
              className="text-white hover:text-indigo-600 transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-indigo-600 transition duration-300"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-white hover:text-indigo-600 transition duration-300"
            >
              Contributions
            </a>
            <a
              href="#"
              className="text-white hover:text-indigo-600 transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className="md:hidden">
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-300"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-300"
        >
          About
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-300"
        >
          Services
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-300"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
