"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { handleSignOut } from "@/app/actions/authActions";

export default function Navbar() {
  const { data: session } = useSession();
 console.log(session);
  return (
    <nav className="flex justify-evenly items-center py-2 px-10 bg-black ">
      <Link href="/" className="text-xl font-bold text-white ">
        Proffernet
      </Link>

      <Link href="/" className="text-white">
        Home
      </Link>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
            <h1 className="text-white">
                {session?.user?.name}
            </h1>
        </form>
      )}
    </nav>
  );
}
