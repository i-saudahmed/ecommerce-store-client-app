"use client";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useApiStore from "@/Zustand/Store";
import RenderProductCard from "../Woman/RenderProductCard";
import RenderSkeletonCard from "../Woman/RenderSkeletonCard";

const Men = () => {
  const {
    data,
    setData,
    search,
    setSearch,
    loading,
    setPage,
    fetchData,
    hasMore,
    loadMoreData,
  } = useApiStore();

  useEffect(() => {
    setData([]);
    setPage(1);
    fetchData(
      `https://dummyjson.com/products/search?limit=9&skip=0&q=${search}`
    );
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-[10%] py-3">
      <div className="mb-3">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) =>
              RenderSkeletonCard({ key: `loader-${item}` })
            )}
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }} className="p-4">
            <b>You have reached the end</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item, index) =>
                RenderSkeletonCard({ key: `skeleton-${index}` })
              )}
            </>
          ) : (
            data.map((curProduct, index) => (
              <RenderProductCard
                key={`${curProduct.id}-${index}`}
                curProduct={curProduct}
                index={index}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Men;
