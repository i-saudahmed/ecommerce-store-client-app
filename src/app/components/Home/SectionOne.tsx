import Link from "next/link";
import React from "react";

const SectionOne = () => {
  return (
    <div className="px-[10%] py-8 bg-[#fbeafd]">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl py-2 font-semibold">New Arrivals Only</h2>
          <h1 className="text-6xl font-bold flex flex-col items-start gap-2 justify-center">
            <div className="flex items-center gap-2">
              new
              <span>
                <img src="/hand_icon.png" className="w-14 h-14" alt="" />
              </span>
            </div>
            collections <div>for everyone</div>
          </h1>
          <Link href="/Men">
            <button className="flex items-center gap-2 px-6  py-2.5 my-5 bg-red-600 text-white rounded-full">
              Latest Collection <img src="/arrow.png" alt="" />
            </button>
          </Link>
        </div>
        <div>
          <img
            src="/hero_image.png"
            className="w-[500px] h-[400px] md:h-[600px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
