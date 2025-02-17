"use client";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 h-screen">
      {/* Circle loader */}
      <div className="relative w-11 h-11 animate-pathCircle">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="32" className="stroke-current text-path"></circle>
        </svg>
      </div>

      {/* Triangle loader */}
      <div className="relative w-12 h-11 animate-pathTriangle ml-4">
        <svg viewBox="0 0 86 80" className="w-full h-full">
          <polygon points="43 8 79 72 7 72" className="stroke-current text-path"></polygon>
        </svg>
      </div>

      {/* Rect loader */}
      <div className="relative w-11 h-11 animate-pathRect ml-4">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <rect x="8" y="8" width="64" height="64" className="stroke-current text-path"></rect>
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
