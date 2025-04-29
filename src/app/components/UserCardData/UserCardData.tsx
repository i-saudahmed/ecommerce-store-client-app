"use client";
import React, { useEffect, useState } from "react";
import DialogForm from "./Dialog/DialogFile";
import useApiStore from "@/Zustand/Store";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const UserCardData = () => {
  const { hasUpdated } = useApiStore();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const userData = localStorage?.getItem("accessData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [hasUpdated]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-12 bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white">
              <span className="text-xl font-bold text-white">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-12 pb-6 px-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">User Profile</p>
            {hasUpdated && (
              <div className="mt-2">
                <DialogForm />
              </div>
            )}
          </div>

          <div className="grid gap-3 max-w-lg mx-auto">
            <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaUser className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">First Name</p>
                <p className="text-base font-medium">{user.firstName}</p>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaUser className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Last Name</p>
                <p className="text-base font-medium">{user.lastName}</p>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaPhone className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Mobile Number</p>
                <p className="text-base font-medium">{user.mobileNumber}</p>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaEnvelope className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-base font-medium text-blue-600">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardData;
