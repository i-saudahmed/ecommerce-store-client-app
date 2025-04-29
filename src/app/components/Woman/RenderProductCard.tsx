import React from "react";
import { useRouter } from "next/navigation";
import HalfRating from "../../../components1/ui/Rating";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Product } from "@/Zustand/LocalStore";

import useLocalApiStore from "@/Zustand/LocalStore";

interface RenderProductCardProps {
  curProduct: Product;
  index: number;
}

const RenderProductCard = ({ curProduct, index }: RenderProductCardProps) => {
  const router = useRouter();
  // const { setData } = useApiStore();
  const { setData } = useLocalApiStore();

  console.log(curProduct.thumbnail);

  const token = localStorage.getItem("accessToken");

  const addToCart = (product: Product, newQuantity: number) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = existingCart.findIndex(
      (item: Product) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      if (newQuantity === 0) {
        existingCart.splice(existingProductIndex, 1);
      } else {
        existingCart[existingProductIndex].quantity = newQuantity;
      }
    } else {
      existingCart.push({ ...product, quantity: newQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));

    setData((prevData) =>
      prevData.map((item) =>
        item._id === product._id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleProductClick = (productId: string) => {
    console.log(productId);
    router.push(`/LocalAPI/${productId}`);
  };
  const { toast } = useToast();

  return (
    <Link href={`/LocalAPI/${curProduct._id}`}>
      <div
        key={`${curProduct._id}-${index}`}
        className="bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer h-[450px] flex flex-col justify-between w-full p-6 group relative"
      >
        <div
          onClick={() => handleProductClick(curProduct._id)}
          className="space-y-4"
        >
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={curProduct.thumbnail}
              alt={curProduct.title}
              className="w-full h-[200px] object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {curProduct.rating} ★
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
              {curProduct.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-2">
              {curProduct.description}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-blue-600 font-bold text-xl">
                ${curProduct.price}
              </p>
              <HalfRating value={curProduct.rating} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 left-2 right-2 ">
          {curProduct.quantity > 0 ? (
            <div className="flex items-center justify-start gap-4 p-2 rounded-lg">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (curProduct.quantity > 0) {
                    addToCart(curProduct, curProduct.quantity - 1);
                  }
                }}
              >
                <FaMinus size={12} />
              </button>
              <span className="font-semibold text-lg">{curProduct.quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-blue-500 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(curProduct, curProduct.quantity + 1);
                }}
              >
                <FaPlus size={12} />
              </button>
            </div>
          ) : null}

          <button
            className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center gap-2 justify-center transition-all duration-300 ${
              curProduct.quantity > 0
                ? "bg-green-600 hover:bg-green-500"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            onClick={(e) => {
              e.stopPropagation();
              if (!token) {
                router.push("/Login");
              }
              if (token) {
                if (curProduct.quantity === 0) {
                  toast({
                    title: "Success",
                    description: "Item added successfully",
                  });
                  addToCart(curProduct, 1);
                }
              }
            }}
          >
            <FaShoppingCart className="text-white" size={16} />
            <span>{curProduct.quantity > 0 ? "Update Cart" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RenderProductCard;
