"use client";

import { getProductById } from "@/components1/smallComponents/Api";
import { Skeleton } from "@/components1/ui/skeleton";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button"; // Fixed import path for Button component
import HalfRating from "@/components1/ui/Rating";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  brand: string;
  category: string;
  stock: number;
  rating: number;
}

const MenProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(Number(params.id));
      // console.log(data);
      if (data) {
        setProduct(data);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="px-[10%] py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 h-[400px]" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="px-[10%] py-10">
      <button
        onClick={handleGoBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className=" object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className=" h-28 object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-[40%]">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </div>
          <div className="mb-6 flex items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <HalfRating value={product.rating} />
          </div>
          <p className="text-2xl text-blue-600 mb-4">${product.price}</p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-7">
              <h1>Quantity (Pieces)</h1>
              <Button />
            </div>

            <button className="w-full px-4 py-2 rounded-lg flex items-center gap-2 justify-center bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors text-white">
              <img
                src="/add-to-cart.png"
                width={20}
                height={20}
                className="bg-white rounded-lg p-1"
                alt=""
              />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenProductPage;
