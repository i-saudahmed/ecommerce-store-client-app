import React from "react";

const SectionThree = () => {


  return (
    <div className="px-[10%] py-10 my-10 bg-[#fcecff]">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col  gap-4">
          <h1 className="font-bold text-6xl w-[60%] capitalize leading-[80px]">
            Exclusive offers for you
          </h1>
          <p className="text-xl capitalize">Only on best seller products</p>
          <button className="bg-red-500 text-white px-8 py-2 rounded-full flex items-center w-fit">
            Check now
          </button>
        </div>
        <div>
          <img src="/exclusive_image.png" className="w-96 h-[450px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
