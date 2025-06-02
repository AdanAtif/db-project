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
      await axios.post("/api/auth/verify", { userId });

      localStorage.removeItem("code");
      localStorage.removeItem("userId");
      toast.success("Email verified successfully!");
      router.push("/auth/information");
    } catch (error) {
      toast.error("Verification failed.");
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
      const response = await axios.patch("/api/auth/verify", { userId });
      localStorage.setItem("code", response.data.code);
      toast.success("New code sent!");
      setResendTimer(60);
      setIsResendEnabled(false);
    } catch (error) {
      toast.error("Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col sm:flex-row justify-center items-center sm:py-12 gap-32">
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-semibold text-black">
                Verify Code {}
              </h1>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <button
                    onClick={handleVerify}
                    className="bg-green-500 text-white rounded-md px-2 py-1 w-full"
                  >
                    Verify
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    Didn’t get a code?{" "}
                    <button
                      onClick={handleResendCode}
                      disabled={!isResendEnabled}
                      className={`${
                        isResendEnabled
                          ? "text-green-600 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      Resend {isResendEnabled ? "" : `(${resendTimer}s)`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SQLPreview
        sqlText={`UPDATE users SET verified = true WHERE id = ${userId};`}
      />
    </div>
  );
}
