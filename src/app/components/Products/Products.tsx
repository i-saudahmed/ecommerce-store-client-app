"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components1/ui/skeleton";
import { PaginationDemo } from "../ui/PaginationDemo";
import { getProducts } from "../../../components1/smallComponents/Api";
import HalfRating from "@/components1/ui/Rating";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity: number;
  rating: number;
}

const Products = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  const addToCart = (product: Product, newQuantity: number) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = existingCart.findIndex(
      (item: Product) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      if (newQuantity === 0) {
        existingCart.splice(existingProductIndex, 1);
      } else {
        existingCart[existingProductIndex].quantity = newQuantity;
      }
    } else {
      const newProduct = { ...product, quantity: newQuantity };
      existingCart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setData((prevData) =>
      prevData.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const fetchData = async (page: number) => {
    setLoading(true);
    const response = await getProducts(page);
    console.log("response data of product", response.products);
    setData(
      response.products.map((product: Omit<Product, "quantity">) => ({
        ...product,
        quantity: 0,
      }))
    );
    setTotalPages(Math.ceil(response.total / 9));
    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleProductClick = (productId: number) => {
    router.push(`/Men/${productId}`);
  };

  return (
    <>
      <div className="px-[10%] py-5">
        <h2 className="text-5xl font-bold mb-5 text-center">All Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className="border p-4 rounded-lg" key={item}>
                  <Skeleton className="w-[200px] h-[200px] rounded-lg mx-auto" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full mt-4" />
                  <Skeleton className="w-full h-[40px] rounded-md mt-2" />
                  <Skeleton className="w-[60px] h-[20px] rounded-full mt-2" />
                </div>
              ))}
            </>
          ) : (
            data.map((curProduct, index) => (
              <div
                key={`${curProduct.id}-${index}`}
                className="border p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-[400px] sm:h-[470px] flex flex-col justify-between w-full gap-2"
              >
                <div
                  onClick={() => {
                    handleProductClick(curProduct.id);
                  }}
                >
                  <img
                    src={curProduct.thumbnail}
                    alt="Product"
                    className="w-full sm:w-[200px] h-[150px] object-cover mx-auto rounded-lg"
                  />
                  <h3 className="mt-4 mb-2 font-bold text-lg sm:text-xl md:text-sm line-clamp-1 text-gray-800 hover:text-blue-600 transition-colors tracking-tight">
                    {curProduct.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base my-3 line-clamp-2 leading-relaxed tracking-wide">
                    {curProduct.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium text-sm text-gray-700">
                      Rating:
                    </span>
                    <HalfRating value={curProduct.rating} />
                  </div>
                  <p className="text-blue-600 text-lg md:text-xl font-semibold tracking-tight">
                    ${curProduct.price.toFixed(2)}
                  </p>

                  {curProduct.quantity > 0 && (
                    <div className="flex items-center gap-3 sm:gap-5 border p-1 rounded-lg font-bold">
                      <button
                        className="px-2 sm:px-4 text-gray-700 hover:text-blue-600 text-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (curProduct.quantity > 0) {
                            addToCart(curProduct, curProduct.quantity - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="text-gray-800 text-base">
                        {curProduct.quantity}
                      </span>
                      <button
                        className="px-2 sm:px-4 text-gray-700 hover:text-blue-600 text-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(curProduct, curProduct.quantity + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className={`w-full px-3 sm:px-4 py-2.5 rounded-lg mt-4 flex items-center gap-2 justify-center font-semibold text-base transition-all ${
                      curProduct.quantity > 0
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-black hover:bg-gray-800 text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (curProduct.quantity === 0) {
                        addToCart(curProduct, 1);
                      }
                    }}
                  >
                    <img
                      src="/add-to-cart.png"
                      width={20}
                      height={20}
                      className="bg-white rounded-lg p-1"
                      alt="Cart icon"
                    />
                    <span>
                      {curProduct.quantity > 0 ? "Edit" : "Add to Cart"}
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <PaginationDemo
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Products;
