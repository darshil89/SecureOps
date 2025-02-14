"use client";
import { useState } from "react";
import Link from "next/link";
import { NavbarProps } from "@/types/Navbar";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = ({ data }: { data: NavbarProps }) => {

  const session = useSession();

  const handleSignIn = async () => {
    await signIn("google");
  };

  const path = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
    <header className="py-4 bg-black sm:py-6" x-data="{expanded: false}">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <Link href="/" className="flex">
                <Image
                  width={100}
                  height={100}
                  src="/assets/logo.png"
                  alt="logo"
                />
              </Link>
            </div>

            <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
              {session && (
                <>
                {data.link.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-base font-normal ${
                      path === item.href
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {data.value[index].value}
                  </Link>
                ))}
                </>
              )}
            </nav>
            {session && (
              <>
                <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                  <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  <button
                    onClick={handleSignOut}
                    className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header></>
  );
};

export default Navbar;
