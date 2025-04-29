"use client";
import { getProductById } from "@/components1/smallComponents/Api";
import { Skeleton } from "@/components1/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import HalfRating from "@/components1/ui/Rating";
import { FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

interface Product {
  _id: string;
  // availableInStock: boolean;
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

const LocalProductPage = () => {
  const params = useParams();
  console.log(params, "params");
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  let timout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        setLoading(true);
        try {
          const data = await getProductById(params.id as string);
          if (data) {
            if (timout) {
              clearTimeout(timout);
            }
            timout = setTimeout(() => {
              console.log(data, "params data");
              setProduct(data);
              setSelectedImage(data.thumbnail);
            }, 10);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="px-[10%] py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-full md:w-1/2 h-[400px] rounded-lg" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-8 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Products</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-sm">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-[400px] object-contain rounded-lg shadow-sm"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <img
                src={product.thumbnail}
                onClick={() => setSelectedImage(product.thumbnail)}
                alt={product.title}
                className={`w-full h-20 object-cover rounded-md cursor-pointer transition-all ${selectedImage === product.thumbnail
                  ? "ring-2 ring-blue-500"
                  : "hover:opacity-80"
                  }`}
              />
              {/* {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  onClick={() => setSelectedImage(image)}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-md cursor-pointer transition-all ${
                    selectedImage === image
                      ? "ring-2 ring-blue-500"
                      : "hover:opacity-80"
                  }`}
                />
              ))} */}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
              </div>

              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="w-20 font-semibold text-gray-700">
                    Brand
                  </span>
                  <span className="text-gray-600">{product.brand}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 font-semibold text-gray-700">
                    Category
                  </span>
                  <span className="text-gray-600">{product.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 font-semibold text-gray-700">
                    Rating
                  </span>
                  <HalfRating value={product.rating} />
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.rating}/5)
                  </span>
                </div>
              </div>

              <div className="text-2xl font-bold text-blue-600 mb-6">
                ${product.price}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 bg-gray-50 p-3 rounded-md">
                  <h2 className="text-base font-medium">
                    Available Stock:
                    <span className="text-red-500 font-bold">
                      {product.stock}
                    </span>
                  </h2>
                  <Button />
                </div>

                <button className="w-full py-3 rounded-lg flex items-center gap-2 justify-center bg-black hover:bg-gray-800 transition-colors text-white text-base font-semibold">
                  <FaShoppingCart className="text-current" size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalProductPage;
