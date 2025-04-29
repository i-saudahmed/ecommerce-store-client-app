"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// type Inputs = {
//   email: string;
//   password: string;
// };

// Define a Zod schema for validation.
const signupSchema = z.object({
  firstName: z.string().min(1, "FirstName is required").max(80),
  lastName: z.string().min(1, "LastName is required").max(100),
  email: z.string().email("Invalid Email Address"),
  mobileNumber: z
    .string()
    .min(6, "Mobile Number must be atleast 6 digits")
    .max(12, "Mobile number cannot exceed 12 digits"),
  password: z
    .string()
    .min(1, "Must be at least 1 character")
    .max(10, "Cannot exceed 10 characters"),
});

// Create the typescript  type
type signupData = z.infer<typeof signupSchema>;
//(derive) the TypeScript type based on the structure and validation rules defined in your Zod schema.

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState<String | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupData>({
    resolver: zodResolver(signupSchema), // Connect Zod to React Hook Form
  });

  //SubmitHandler is a type provided by React Hook Form
  //It’s used to define the type of the function that handles form submission.
  const onSubmit: SubmitHandler<signupData> = async (data) => {
    try {
      console.log(data, "data");
      const response = await axiosInstance.post("/signup", data);
      console.log(response.data, "response");
      setResponseMessage(response.data.message);
    } catch (error) {
      console.log("Error Submitting Form", error);
      setResponseMessage("failed to submit form");
    }
  };

  // console.log(watch("email")); // watch input value by passing the name of it

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6 bg-gray-200 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-blue-500 text-center mb-6">
          Sign Up Now
        </h1>
        <input
          id="firstName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="First Name"
          {...register("firstName")}
        />
      </div>
      <div className="mb-6">
        <input
          id="lastName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Last Name"
          {...register("lastName")}
        />
      </div>

      <div className="mb-6">
        <input
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Set your email"
          {...register("email")}
        />
      </div>

      <div className="mb-6">
        <div>
          <input
            type="tel"
            placeholder="Mobile number"
            {...register("mobileNumber")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Set Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password")}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-3 text-blue-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs italic">This field is required</p>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          value="Sign In"
        >
          Create Account
        </button>
      </div>
      {responseMessage && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">{responseMessage}</p>
        </div>
      )}
    </form>
  );
}
