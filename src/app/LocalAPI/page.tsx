"use client";
import React, { useEffect } from "react";
import RenderSkeletonCard from "../components/Woman/RenderSkeletonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import useLocalApiStore from "@/Zustand/LocalStore";
import { debounce, sortBy } from "lodash";
import RenderProductCard from "../components/Woman/RenderProductCard";
import { CarouselPlugin } from "../components/ui/AutoPlay";

const LocalAPI = () => {
const {
    data,
    setSearch,
    hasMore,
    loadMoreData,
    setData,
    setSortBy,
    setCategory,
    sortBy,
    category,
  } = useLocalApiStore();

  useEffect(() => {
    setCategory("all");
    setSortBy("title");
  }, [setCategory, setSortBy]);

  console.log("data from zustand", data);

  useEffect(() => {
    // Only load initial data if there's no existing data
    if (data.length === 0) {
      loadMoreData();
    }
  }, []);

  const performSearch = (value: string) => {
    setData([]);
    setSearch(value);
  };

  const handleSearch = debounce((value: string) => {
    performSearch(value);
  }, 500);

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

  const renderSearchAndSort = () => (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Sort By
        </span>
        <div className="relative">
          <select
            value={sortBy}
            className="form-select appearance-none block w-32 pl-3 pr-8 py-1.5 text-sm font-normal text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-clip-padding bg-no-repeat border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200 ease-in-out cursor-pointer hover:border-blue-400 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-md mt-3 mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-[400px] px-4 py-3 pl-12 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400 transition-colors duration-200 group-hover:text-blue-500"
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
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Categories
        </span>
        <div className="relative">
          <select
            value={category}
            className="form-select appearance-none block w-40 pl-3 pr-8 py-1.5 text-sm font-normal text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-clip-padding bg-no-repeat border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200 ease-in-out cursor-pointer hover:border-blue-400 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Furniture">Furniture</option>
            <option value="Grocery">Grocery</option>
            <option value="Beauty">Beauty</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="px-[10%]">
        {/* <div className="flex justify-center items-center mt-6">
          <div className="relative w-full max-w-md mb-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2
               focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
              />
            </svg>
          </div>
        </div> */}
        {renderSearchAndSort()}
        {renderPromoSection()}
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) =>
                RenderSkeletonCard({ key: `loader-${item} as` })
              )}
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }} className="p-4">
              <b>You have reached the end</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
            {data.map((curProduct, index) => (
              <RenderProductCard
                key={`${curProduct._id}-${index}`}
                curProduct={curProduct}
                index={index}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default LocalAPI;
