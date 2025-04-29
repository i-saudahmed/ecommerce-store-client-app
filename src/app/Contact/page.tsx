"use client";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/utils/axiosInstance";

// Define the form validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [responseData, setResponseData] = useState<String | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (
    data: ContactFormData
  ) => {
    try {
      const response = await axiosInstance.post("/contact", data);
      console.log(response.data, "form submitted data");
      setResponseData(response.data.message);
      reset();
    } catch (error) {
      console.log("Error Submitting Form", error);
      setResponseData("failed to submit form");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-xl font-bold mb-2">Have any queries?</h1>
        <h2 className="text-4xl font-bold mb-4">We're here to help.</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-4">Sales</h3>
          <p className="text-gray-600 mb-4">
            Vestibulum ante ipsum primis in faucibus orci luctus.
          </p>
          <a
            href="tel:1800 123 4567"
            className="text-blue-500 font-bold text-xl flex items-center gap-2 hover:text-blue-600"
          >
            <FaPhone />
            1800 123 4567
          </a>
        </div>

        {/* Complaints Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-4">Complaints</h3>
          <p className="text-gray-600 mb-4">
            Vestibulum ante ipsum primis in faucibus orci luctus.
          </p>
          <a
            href="tel:1900 223 8899"
            className="text-blue-500 font-bold text-xl flex items-center gap-2 hover:text-blue-600"
          >
            <FaPhone />
            1900 223 8899
          </a>
        </div>

        {/* Returns Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-4">Returns</h3>
          <p className="text-gray-600 mb-4">
            Vestibulum ante ipsum primis in faucibus orci luctus.
          </p>
          <a
            href="mailto:returns@mail.com"
            className="text-blue-500 font-bold text-xl flex items-center gap-2 hover:text-blue-600"
          >
            <MdEmail />
            returns@mail.com
          </a>
        </div>

        {/* Marketing Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-4">Marketing</h3>
          <p className="text-gray-600 mb-4">
            Vestibulum ante ipsum primis in faucibus orci luctus.
          </p>
          <a
            href="tel:1700 444 5578"
            className="text-blue-500 font-bold text-xl flex items-center gap-2 hover:text-blue-600"
          >
            <FaPhone />
            1700 444 5578
          </a>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex flex-row gap-8 justify-start">
        <div className="flex-1 flex flex-col items-start justify-center text-center mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-2">Don't be a stranger!</h2>
          <h3 className="text-4xl font-bold mb-4">You tell us. We listen.</h3>
          <p className="text-gray-600 max-w-lg text-sm text-justify">
            Cras elementum finibus lacus nec lacinia. Quisque non convallis
            nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend
            magna vehicula et. Nam mattis est sed tellus.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <div>
            <input
              type="text"
              placeholder="NAME"
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="SUBJECT"
              {...register("subject")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="EMAIL"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="MESSAGE"
              {...register("message")}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors font-semibold"
          >
            SEND MESSAGE
          </button>
          {responseData && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{responseData}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
