"use client";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useApiStore from "@/Zustand/Store";
import { UserIcon } from "@heroicons/react/24/outline";

import ProfileButton from "./ProfileButton";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useApiStore();
  const { toast } = useToast();

  const loadCartData = () => {
    try {
      const cartData = JSON.parse(localStorage?.getItem("cart") || "[]");
      setCart(cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    // Load cart from localStorage and check auth token
    const loadCartAndAuth = () => {
      loadCartData();
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
      }
    };

    loadCartAndAuth();

    // Add event listener for cart updates
    window.addEventListener('cartUpdated', loadCartData);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', loadCartData);
    };
  }, [isLoggedIn, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      variant: "default",
    });
  };

  const handleClick = () => { };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-blue-500 text-white py-2">
        <div className="container mx-auto px-4 lg:px-[10%] flex flex-wrap md:flex-nowrap justify-between items-center">
          <div className="flex items-center gap-2">
            <FaPhone className="text-white" />
            <p className="text-sm">+92 353487226</p>
          </div>

          <div className="text-white text-sm text-center my-2 md:my-0">
            <span className="font-medium">Get 10% off on selected items</span>
            <span className="mx-2"> | </span>
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
              Shop Now
            </span>
          </div>

          <div className="flex gap-4">
            <select className="bg-blue-500 text-white text-sm focus:outline-none cursor-pointer">
              <option value="en">English</option>
              <option value="ur">Urdu</option>
            </select>
            <select className="bg-blue-500 text-white text-sm focus:outline-none cursor-pointer">
              <option value="">Select Location</option>
              <option value="pk">Pakistan</option>
              <option value="us">United States</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 lg:px-[10%] py-3"> 
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-90">
              <img src="/logo.png" className="w-10 h-10" alt="Shopper Logo" />
              <h1 className="hidden md:block text-2xl font-bold">SHOPPER</h1>
            </Link>

            {/* Navigation */}
            <Navbar />

            {/* Actions */}
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <Link
                  href="/Login"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                >
                  <UserAvatar className="w-5 h-5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              )}
              <div className="flex items-center gap-4 relative ">
                <Link href="/Cart" className="relative">
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </div>
                  <img src="/cart_icon.png" className="w-8 h-8" alt="cart" />
                </Link>

                <Link href="/UserCard">
                  <ProfileButton
                    imageSrc="/product_20.png"
                    name="SA"
                    onClick={handleClick}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const UserAvatar = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
