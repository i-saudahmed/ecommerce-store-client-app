"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  description: string;
}

const Carts = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);
    const length = storedCartItems.length;
    console.log("Cart Items:", cartItems); // Use this data to display in the cart page
    console.log("Cart Items:", length); // Use this data to display in the cart page
  }, []);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    updateCart(updatedCart);
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));
    toast({ title: "Item removed from cart" });
  };

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const calculateTotalWithTax = () => {
    const salesTax = 50;
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return (subtotal + salesTax).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500">Add items to your cart to see them here</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-100"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-grow space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-lg font-medium text-blue-600">
                  ${item.price}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-100 rounded-l-md"
                    >
                      <FiMinus className="text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-16 text-center border-x p-2 focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-100 rounded-r-md"
                    >
                      <FiPlus className="text-gray-600" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Total Items</span>
                <span className="font-medium">{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Sales Tax</span>
                <span className="font-medium">$50.00</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${calculateTotalWithTax()}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mt-6">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
