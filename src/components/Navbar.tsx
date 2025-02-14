"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="bg-black p-4">
      <div className=" flex justify-between items-center bg-black px-6 py-3 rounded-lg">
        {/* Left Section: Logo */}
        <div>
          <Link href="/">
            <img
              src="https://t4.ftcdn.net/jpg/03/05/59/03/360_F_305590383_7JYA2Ww9bMbeYWoqIZiwu03iC115MM1K.jpg"
              alt="Logo"
              className="h-8 cursor-pointer"
            />
          </Link>
        </div>

        {/* Middle Section: Navbar Links */}
        <ul className="flex space-x-8 text-white font-medium">
          <li>
            <Link href="/agency">Agency</Link>
          </li>
          <li>
            <Link href="/guard">Guard</Link>
          </li>
          <li>
            <Link href="/police">Police</Link>
          </li>
          <li>
            <Link href="/user">User</Link>
          </li>
        </ul>

        {/* Right Section: Auth Buttons */}
        <div>
          {!isLoggedIn ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleAuth}
            >
              Sign In
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={handleAuth}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
