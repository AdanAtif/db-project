'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    if (id) {
      axios.get(`/api/auth/check-profile?userId=${id}`)
        .then(response => {
          setHasProfile(response.data.exists);
        })
        .catch(() => setHasProfile(false));
    }
  }, []);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <span className="text-lg font-semibold text-gray-800" onClick={()=> router.push("/")}>Acorns</span>
        </div>

        <nav className="hidden md:flex space-x-6 text-gray-700">
          <p onClick={() => router.push("/transfer")} className="cursor-pointer hover:text-gray-900">Transfer</p>
          <p onClick={() => router.push("/deposit")} className="cursor-pointer hover:text-gray-900">Deposit</p>
          <p onClick={() => router.push("/withDrawal")} className="cursor-pointer hover:text-gray-900">Withdrawal</p>
        </nav>

        <div className="flex items-center space-x-4">
          {userId ? (
            <>
              {!hasProfile && (
                <p
                  onClick={() => router.push("/createAccount")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer"
                >
                  Create Account
                </p>
              )}
              <p
                onClick={() => router.push("/profile")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition cursor-pointer"
              >
                Profile
              </p>
            </>
          ) : (
            <>
              <p onClick={() => router.push("/signup")} className="text-gray-700 hover:text-gray-900 cursor-pointer">Sign Up</p>
              <p
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition cursor-pointer"
              >
                Log in
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
