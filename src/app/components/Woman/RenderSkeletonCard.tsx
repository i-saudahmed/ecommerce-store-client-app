import React from "react";

const RenderSkeletonCard = ({ key }: { key: string | number }) => {
  return (
    <div
      className="border p-4 rounded-lg h-[400px] sm:h-[450px] md:h-[500px]"
      key={key}
    >
      <div className="w-full sm:w-[200px] h-[150px] sm:h-[200px] rounded-lg mx-auto bg-gray-200 animate-pulse" />
      <div className="w-[100px] h-[20px] rounded-full mt-4 bg-gray-200 animate-pulse" />
      <div className="w-full h-[40px] rounded-md mt-2 bg-gray-200 animate-pulse" />
      <div className="w-[60px] h-[20px] rounded-full mt-2 bg-gray-200 animate-pulse" />
    </div>
  );
};

export default RenderSkeletonCard;
