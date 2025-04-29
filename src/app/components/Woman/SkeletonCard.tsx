import React from "react";

const SkeletonCard = ({ key }: { key: string | number }) => {
  return (
    <div
      key={key}
      className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Skeleton for Product Image */}
      <div className="relative h-56">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
        <div className="absolute top-2 right-2 bg-gray-200 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
          {/* Placeholder for stock */}
          <div className="w-12 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Skeleton for Product Info */}
      <div className="p-4">
        {/* Skeleton for Title */}
        <div className="w-3/4 h-6 bg-gray-200 rounded-md animate-pulse" />

        {/* Skeleton for Name */}
        <div className="w-1/2 h-4 bg-gray-200 rounded-md mt-2 animate-pulse" />

        {/* Skeleton for Description */}
        <div className="w-full h-12 bg-gray-200 rounded-md mt-2 animate-pulse" />

        {/* Skeleton for Price and Rating */}
        <div className="flex justify-between items-center mt-4">
          <div>
            {/* Skeleton for Discounted Price */}
            <div className="w-12 h-6 bg-gray-200 rounded-md animate-pulse" />
            {/* Skeleton for Original Price */}
            <div className="w-10 h-4 bg-gray-200 rounded-md mt-1 animate-pulse" />
          </div>
          {/* Skeleton for Rating */}
          <div className="w-10 h-4 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Skeleton for Category */}
        <div className="w-1/3 h-4 bg-gray-200 rounded-md mt-2 animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;