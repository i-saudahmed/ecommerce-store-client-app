import useApiStore from "@/Zustand/Store";
import React, { useEffect, useState } from "react";

const useFetchData = (limit: number, sortBy: string, Category: string) => {
  const { data, loading, error, fetchData } = useApiStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchData(
      Category === "all"
        ? `https://dummyjson.com/products/search?limit=${limit}&skip=${
            (page - 1) * 9
          }&q=${search}&sortBy=${sortBy}`
        : `https://dummyjson.com/products/category/${Category}?limit=${limit}&skip=${
            (page - 1) * 9
          }&sortBy=${sortBy}`
    );
  }, [page, search, fetchData, sortBy, Category]);
  return {
    data,
    loading,
    error,
    page,
    setPage,
    hasMore,
    search,
    setSearch,
  };
};

export default useFetchData;
