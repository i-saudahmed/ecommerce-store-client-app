"use client";
import React, { useEffect, useState } from "react";
import RenderProductCard from "../Woman/RenderProductCard";
import useLocalApiStore from "@/Zustand/LocalStore";
import { Product } from "@/Zustand/LocalStore";

const Section2 = () => {
  const { fetchProducts } = useLocalApiStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts({
        category: 'Beauty',
        limit: 6,
        sortBy: 'title'
      });
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-[10%] py-4">
      <div>
        <div className="my-6">
          <h1 className="capitalize text-4xl font-bold flex justify-center items-center">
            Popular in Beauty
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {products.map((curProduct, index) => (
              <RenderProductCard
                key={`${curProduct.id}-${index}`}
                curProduct={curProduct}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
