"use client";
import React, { useEffect } from "react";
import { CarouselPlugin } from "../ui/AutoPlay";
import useApiStore from "@/Zustand/Store";
import InfiniteScroll from "react-infinite-scroll-component";
import RenderProductCard from "./RenderProductCard";
import { debounce } from "lodash";
import { Product } from "@/Zustand/LocalStore";

const Woman = () => {
  const {
    data,
    sortBy,
    category,
    loading,
    hasMore,
    setData,
    setSearch,
    setSortBy,
    setCategory,
    loadMoreData,
  } = useApiStore();

  const performSearch = async (search: string) => {
    setData([]);
    setSearch(search);
  };

  const handleSearch = debounce((value: string) => {
    performSearch(value);
  }, 500);

  useEffect(() => {
    setData([]);
    loadMoreData();
  }, []);

  const renderSkeletonCard = (key: string | number) => (
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

  const renderSortAndFilter = () => (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center justify-end gap-2">
        <span className="text-gray-500">Sort By</span>
        <select
          value={sortBy}
          className="border border-gray-300 rounded-2xl p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-[350px] px-4 py-2 border border-gray-300 rounded-full"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      <div className="flex items-center justify-end gap-2">
        <span className="text-gray-500">Categories</span>
        <select
          value={category}
          className="border border-gray-300 rounded-2xl text-center p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="smartphones">Smartphones</option>
          <option value="skin-care">Skin Care</option>
          <option value="mens-watches">Mens Watches</option>
        </select>
      </div>
    </div>
  );

  const renderPromoSection = () => (
    <div className="flex flex-row items-center justify-between px-24 bg-[#fcf3f2]">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-5xl font-bold text-orange-500">Flat 50% Off</h1>
        <h2 className="text-2xl py-4">
          <span className="text-orange-500">12</span> Hours{" "}
          <span className="text-orange-500">20</span> Minutes
        </h2>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full uppercase">
          Explore Now
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <CarouselPlugin />
      </div>
    </div>
  );

  return (
    <div className="px-[10%] py-4">
      {renderSortAndFilter()}
      {renderPromoSection()}

      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) =>
              renderSkeletonCard(`loader-${item}`)
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
                renderSkeletonCard(`skeleton-${index}`)
              )}
            </>
          ) : (
            data.map((curProduct: Product, index) => (
              <RenderProductCard
                key={`${curProduct._id}-${index}`}
                curProduct={curProduct as Product}
                index={index}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Woman;
