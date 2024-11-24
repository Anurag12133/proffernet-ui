const Navbar = () => {
  return (
    <div className="px-8 flex h-16 items-center max-w-[88rem] mx-auto">
      {/* Left side: Logo and Title */}
      <div className="mr-4 hidden md:flex">
        <a
          className="flex items-center justify-center space-x-2 text-2xl font-bold py-6 text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
          href="/"
        >
          <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800 text-white flex items-center justify-center rounded-md text-sm antialiased">
            <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
            <div className="text-sm text-emerald-500 relative z-20"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black dark:text-white font-sans">Proffernet</h1>
          </div>
        </a>
      </div>

      {/* Mobile Logo */}
      <a
        className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:rn:"
        data-state="closed"
        href="/"
      >
        <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800 text-white flex items-center justify-center rounded-md text-sm antialiased">
          <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
          <div className="text-sm text-emerald-500 relative z-20">
            <img
              alt="Logo"
              loading="lazy"
              width="50"
              height="50"
              decoding="async"
              srcSet="/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo.png&amp;w=128&amp;q=75 2x"
              src="/_next/image?url=%2Flogo.png&amp;w=128&amp;q=75"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6 text-sm font-medium xl:flex">
        <a
          className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1 text-gray-400"
          href="/components"
        >
          Home
        </a>
        <a
          className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1 text-gray-400"
          target="_blank"
          href="/pages/projectlist"
        >
          Projects
        </a>

        <a
          className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1 text-gray-400"
          href="/showcase"
        >
          Contributions
        </a>
      </nav>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
        <a
          target="__blank"
          className="transition-colors hover:text-foreground/80 text-foreground/60 mr-3 text-sm font-medium text-gray-400"
          href="https://discord.gg/ftZbQvCdN7"
        >
          <span className="hidden sm:block">Discord</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 dark:text-neutral-500 text-neutral-500 block sm:hidden"
          >
            <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
            <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
            <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"></path>
            <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
          </svg>
        </a>
        <a
          target="__blank"
          className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium text-gray-400"
          href="https://twitter.com/mannupaaji"
        >
          Github
        </a>
        <button className="py-2 px-4 ml-2 rounded-md bg-blue-500 text-white text-sm font-medium ring-offset-background hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
