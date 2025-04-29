"use client";
import React, { useEffect, useState } from "react";
import useLocalApiStore from "@/Zustand/LocalStore";
import { Product } from "@/Zustand/LocalStore";
import Link from "next/link";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   category: string;
// }

const SectionFour = () => {
  const { fetchProducts } = useLocalApiStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts({
        category: 'Furniture',
        limit: 6,
        sortBy: 'price'
      });
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-[10%] py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="text-blue-500">Popular</span> in Furniture
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
          >
            <div className="w-32 h-32 mr-6 overflow-hidden rounded-lg">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-blue-500">
                  ${product.price}
                </p>
                <Link
                  href={`/LocalAPI/${product.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFour;
