"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For Next.js 13+
import Header from "@/components1/smallComponents/Header";
import useApiStore from "@/Zustand/Store";
import { useToast } from "@/hooks/use-toast";
import useLocalApiStore from "@/Zustand/LocalStore";

// Define a Zod schema for validation.
const loginSchema = z.object({
  email: z.string().email("Invaid Email Address"),
  password: z
    .string()
    .min(1, "Must be at least 1 character")
    .max(10, "Cannot exceed 10 characters"),
});

// Create the typescript  type
type loginData = z.infer<typeof loginSchema>;
//(derive) the TypeScript type based on the structure and validation rules defined in your Zod schema.

export default function LoginComponent() {

  const { setIsLoggedIn } = useApiStore();
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState<String | null>(null);

  const loginToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // setIsLoggedIn(true);
      router.push("/");
      // setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    loginToken();
  }, [loginToken]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema), // Connect Zod to React Hook Form
  });

  //SubmitHandler is a type provided by React Hook Form
  //It’s used to define the type of the function that handles form submission.
  const onSubmit: SubmitHandler<loginData> = async (data) => {
    try {
      // console.log(data, "data");
      const response = await axiosInstance.post("/login", data);
      if (response) {
        toast({
          title: "Success",
          description: "Login ssuccessfully",
        });
        // console.log(response.data.userData, "response of data");
        const accessToken = response.data.token;
        localStorage.setItem("accessToken", accessToken);

        // const accessData = Object.values(response.data.userData);
        console.log(response.data.userData, "access data");

        localStorage.setItem(
          "accessData",

          JSON.stringify(response.data.userData)
        );

        setIsLoggedIn(true);
        router.push("/");
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error logging in ", error.response.data.message);
          setResponseMessage(
            error.response.data.message || "An error occurred"
          );
        }
        // setResponseMessage();
      }
    }
  };

  // console.log(watch("email")); // watch input value by passing the name of it

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="px-[10%] py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-4 mb-[8rem] p-6 bg-gray-200 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-blue-500 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-7">
            Login to your account
          </p>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>

        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password")}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-10 text-blue-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>

        <div className="flex items-center justify-center">
          {/* {isLoggedIn && ( */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Sign in
          </button>
          {/* )} */}
        </div>
        <div className="text-center text-gray-600 mt-4">
          New Here?
          <Link
            href="/Signup"
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </div>
        {responseMessage && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">{responseMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}
