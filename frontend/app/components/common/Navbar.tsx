"use client";

import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import { NavLink } from "@/app/components/common";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);

        dispatch(setLogout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  };

  const isSelected = (path: string) => (pathname === path ? true : false);

  const AvatarDropdownMenu = () => (
    <DropdownMenu >
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 mt-3 text-white dark:border-white/[0.2] border-transparent border bg-black">
        <DropdownMenuItem asChild>
          <Link href="/pages/dashboard" className="w-full cursor-pointer">
          Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pages/project" className="w-full cursor-pointer">
          Publish
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pages/projectlist" className="w-full cursor-pointer">
          Contribute
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:text-red-400 cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const authLinks = (isMobile: boolean) => (
    <>
      {isMobile ? (
        <div className="px-2">
          <Link href="/pages/dashboard" className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md">
            Dashboard
          </Link>
          <Link href="/pages/project" className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md">
            Publish
          </Link>
          <Link href="/pages/projectlist" className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md">
            Contribute
          </Link>
          <NavLink isMobile={isMobile} onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      ) : (
        <AvatarDropdownMenu />
      )}
    </>
  );

  const guestLinks = (isMobile: boolean) => (
    <>
      <NavLink
        isSelected={isSelected("/auth/login")}
        isMobile={isMobile}
        href="/auth/login"
      >
        Login
      </NavLink>
    </>
  );

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 py-2 lg:px-8">
            <div className="relative flex  items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className="text-white font-bold">
                    Proffernet{" "}
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isAuthenticated ? authLinks(false) : guestLinks(false)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {isAuthenticated ? authLinks(true) : guestLinks(true)}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
