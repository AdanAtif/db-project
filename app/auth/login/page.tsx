"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SQLPreview from "@/components/SqlPreview";
import Loader from "@/components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login/", {
        email,
        password,
      });

      const { userId } = response.data;
      toast.success("Login successful!");
      localStorage.setItem("userId", userId);
      router.push("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.");
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center gap-32 items-center">
      <div className="min-h-screen flex items-center justify-center px-4 text-black">
        <div className="w-full min-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-500 py-4 px-6">
              <h1 className="text-2xl font-bold text-white">Login</h1>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border p-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600"
              >
                {loading ? <Loader/> : "Login"}
              </button>
            </form>
              <button className=" mb-4 text-center text-sm text-gray-600 flex justify-center items-center w-full">
              Don't have an account?<span className="text-teal-950 cursor-pointer pl-1" onClick={()=> router.push('/auth/signup')}>Register</span>
              </button>
          </div>
        </div>
      </div>

      <SQLPreview
        sqlText={`SELECT * FROM users WHERE email = '${email || "Email"}' AND password = '${password || "Password"}';`}
        />
    </div>
  );
};

export default LoginPage;
