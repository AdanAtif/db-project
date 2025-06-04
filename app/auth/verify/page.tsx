"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SQLPreview from "@/components/SqlPreview";

export default function VerifyPage() {
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [code, setCode] = useState("");
  const [storedCode, setStoredCode] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedVerificationCode = localStorage.getItem("code");

    if (storedUserId && storedVerificationCode) {
      setUserId(storedUserId);
      setStoredCode(storedVerificationCode);
    } else {
      toast.error("Verification data not found. Please request a new code.");
    }
  }, []);

  const handleVerify = async () => {
    if (!code) {
      toast.error("Please enter the verification code.");
      return;
    }
    if (code !== storedCode) {
      toast.error("Invalid verification code.");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/auth/verify", { userId });

      localStorage.removeItem("code");
      toast.success("Email verified successfully!");
      router.push("/auth/information");
    } catch (error) {
      toast.error("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [resendTimer]);

  const handleResendCode = async () => {
    if (!isResendEnabled) return;

    try {
      setLoading(true);
      const response = await axios.patch("/api/auth/verify", { userId });
      localStorage.setItem("code", response.data.code);
      toast.success("New verification code sent!");
      setResendTimer(60);
      setIsResendEnabled(false);
    } catch (error) {
      toast.error("Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
      {/* Verification Form Section */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-8 px-10">
            <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
            <p className="text-teal-100 mt-2">We've sent a code to your email</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="verification-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-3 text-lg text-center tracking-widest rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                    placeholder="6-digit code"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Verify Account"
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 pt-2">
                <p>
                  Didn't receive a code?{" "}
                  <button
                    onClick={handleResendCode}
                    disabled={!isResendEnabled || loading}
                    className={`font-medium ${
                      isResendEnabled && !loading
                        ? "text-teal-600 hover:text-teal-500 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Resend {!isResendEnabled && `(${resendTimer}s)`}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Preview Section */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
          <div className="bg-gray-800 py-4 px-6">
            <h2 className="text-lg font-medium text-white">SQL Query Preview</h2>
          </div>
          <div className="p-6">
            <SQLPreview sqlText={`UPDATE users SET verified = true WHERE id = ${userId || 'user_id'};`} />
            <p className="mt-4 text-sm text-gray-600">
              This is the SQL query that will be executed when you verify your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}