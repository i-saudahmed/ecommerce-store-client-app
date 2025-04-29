import React from "react";

const Section5 = () => {
  return (
    <div className="px-[10%] pt-5">
      <div className="flex flex-col items-center justify-center gap-4 bg-[#fbe9ff] py-14">
        <h1 className="text-4xl font-bold text-[#534c54] capitalize ">
          Get Exclusive Offers on your Mail
        </h1>
        <p className="text-xl text-gray-500">
          Subscribe to our newsletter and stay updated
        </p>
        <div className="flex items-center justify-center w-[500px]">
          <input
            type="email"
            className="w-full border-2 border-gray-500 rounded-full px-6 py-3"
            placeholder="Your email address"
          />
          <button className="bg-black text-white px-8 py-4 text-sm rounded-full -ml-32 transition-colors hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section5;
