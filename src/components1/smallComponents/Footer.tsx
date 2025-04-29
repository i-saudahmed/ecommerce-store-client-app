import Link from "next/link";
import React from "react";

const Section6 = () => {
  return (
    <div className="px-[10%] bg-[#f1f1f1]">
      <div className="flex items-center flex-col justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-14 h-14" alt="logo" />
          <div>
            <h1 className=" hidden md:block text-4xl font-semibold text-gray-800">
              SHOPPER
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 my-6 text-gray-600">
          <Link href="/">Company</Link>
          <Link href="/">Products</Link>
          <Link href="/">Offices</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg">
            <img
              src="/instagram_icon.png"
              className="w-6 h-6"
              alt="instagram"
            />
          </div>
          <div className="bg-white p-2 rounded-lg">
            <img
              src="/pintester_icon.png"
              className="w-6 h-6"
              alt="pintester"
            />
          </div>
          <div className="bg-white p-2 rounded-lg">
            <img src="/whatsapp_icon.png" className="w-6 h-6" alt="whatsapp" />
          </div>
        </div>
        <div className="text-gray-600 text-sm mt-10 mb-4">
          Copyright &copy; - 2025 All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Section6;
