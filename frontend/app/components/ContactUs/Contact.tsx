"use client";

import Link from "next/link";
import { RiVercelFill } from "react-icons/ri";

export default function ContactPage() {
  return (
    <div className="w-full h-[43.5rem] ">
      {/* Main Content */}
      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-black p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="max-w-md pt-24">
            <h1 className="text-white text-5xl md:text-6xl font-sans font-bold ml-10">
              We'd love to hear from you
            </h1>
            <img
              src="/contact.png"
              alt="contactimage"
              className="w-full h-70 mt-2 mr-10"
            />
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center space-x-4 text-white/50 text-sm ">
            <div className="flex space-x-0.5">
              <div className="w-1.5 h-1.5 rounded-full border border-white/50"></div>
              <div className="w-1.5 h-1.5 rounded-full border border-white/50"></div>
              <div className="w-1.5 h-1.5 rounded-full border border-white/50"></div>
            </div>
            <Link href="/" className="hover:text-white">
              Proffernet
            </Link>
            <span>·</span>
          </div>
        </div>

        <div className="absolute top-0 bottom-0 left-[50%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />

        {/* Right Section */}
        <div className="bg-black p-8 flex flex-col justify-between text-white">
          <div className="max-w-md mx-auto w-full pt-24">
            <div>
              <h2 className="text-2xl font-sans font-bold mb-8">Contact us</h2>
            </div>
            <div className="relative flex justify-start items-start w-full mt-2 ">
              <div className="h-px w-[90%] bg-gradient-to-r from-transparent via-gray-600 to-transparent dark:via-white/[0.2] border-0 z-0 mr-80" />
            </div>
            <div className="mt-12">
              <p className="text-xs uppercase mb-2">Linkedin</p>
              <a
                href="https://linkedin.com/in/anurag--rajput"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                linkedin.com/in/anurag--rajput
              </a>
            </div>
            <div className="mt-12">
              <p className="text-xs uppercase mb-2">Github</p>
              <a
                href="https://github.com/Anurag12133"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                github.com/Anurag12133
              </a>
            </div>

            <div className="mt-12">
              <p className="text-xs uppercase mb-2">Email us</p>
              <a
                href="mailto:devrookie16@gmail.com"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                devrookie16@gmail.com
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm text-black/50 mt-10">
            <a
              href="mailto:enquiries@glassmoon.co"
              className="hover:text-black transition-colors"
            ></a>
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-black transition-colors">
                <RiVercelFill className="mx-auto h-7 w-auto text-white/50 hover:text-gray-200 " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
