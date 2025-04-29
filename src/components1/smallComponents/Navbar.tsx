"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/Men" },
    { name: "Women", path: "/Woman" },
    { name: "LocalAPI", path: "/LocalAPI" },
    { name: "Contact", path: "/Contact" },
  ];

  // const handleNavigation = (path: string) => {
  //   router.push(path);
  // };

  return (
    <>
      <div className={`hidden md:flex space-x-4 text-gray-500`}>
        <ul className="flex space-x-4">
          {navItems.map((curElem, curIndex) => (
            <li className="list-none" key={curIndex}>
              <Link
                href={curElem.path}
                className={`px-4 py-2 hover:underline decoration-red-500 decoration-2 transition-all duration-200 ${
                  pathname === curElem.path
                    ? "underline decoration-red-500 decoration-2 font-medium text-gray-800"
                    : ""
                } active:underline active:decoration-red-500 active:decoration-2 active:font-medium active:text-gray-800`}
              >
                {curElem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
