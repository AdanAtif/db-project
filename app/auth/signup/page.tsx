"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import SQLPreview from "@/components/SqlPreview";
import Loader from "@/components/Loader";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signup/", {
        email,
        username,
        password,
      });

      const { code, userId } = response.data;
      toast.success("Signed Up!");
      localStorage.setItem("userId", userId);
      localStorage.setItem("code", code);
      router.push("/auth/verify");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("This Email is already registered");
        } else {
          toast.error(error.response.data.message || "Registration failed.");
        }
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);
      setLoading(false);
    }
  };

  // SQL preview query
  const signupQuery = `INSERT INTO users (email, username, password) VALUES ('${
    email || "Email"
  }', '${username || "Username"}', '${password || "Password"}');`;

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center gap-32 items-center">
      <div className="min-h-screen flex items-center justify-center px-4 text-black">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-[500px]">
            <div className="bg-green-500 py-4 px-6">
              <h1 className="text-2xl font-bold text-white">Registration</h1>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              {/* Input fields... */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Account Information</h2>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? <Loader/> : "Sign Up"}
                </button>
              </div>
            </form>

            <button className=" mb-4 text-center text-sm text-gray-600 flex justify-center items-center w-full">
                Already have an account?<span className="text-teal-950 cursor-pointer pl-1" onClick={()=> router.push('/auth/login')}>Login</span>
              </button>
          </div>
        </div>
      </div>
      <SQLPreview sqlText={signupQuery} />
    </div>
  );
};

export default SignupPage;
