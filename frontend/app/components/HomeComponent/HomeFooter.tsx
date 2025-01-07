const Footer = () => {
  return (
    <div>
      <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-10  dark:bg-brand">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start">
          {/* Logo and Information Section */}
          <div>
            <div className="mr-4 md:flex mb-4">
              <a
                className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10 py-0"
                href="/"
              >
                <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800 text-white flex items-center justify-center rounded-md text-sm antialiased">
                  <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
                  <div className="text-sm text-emerald-500 relative z-20"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-black dark:text-white font-sans">
                    Proffernet
                  </h1>
                </div>
              </a>
            </div>

            <div className="mt-2">
              Building in public at{" "}
              <a
                className="dark:text-sky-500 font-medium text-neutral-600"
                target="__blank"
                href="https://github.com/Anurag12133"
              >
                @Anurag-Rajput
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
            {/* Second Column */}
            <div className="flex justify-center space-y-4 flex-col mt-4">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                target="__blank"
                href="https://linkedin.com/in/anurag--rajput"
              >
                Linkedin
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                target="__blank"
                href="https://github.com/Anurag12133"
              >
                Github
              </a>
            </div>

            {/* Third Column */}
            <div className="flex justify-center space-y-4 flex-col mt-4">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                target="__blank"
                href="/"
              >
                Proffernet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
