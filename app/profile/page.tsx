"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRegUser, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

type Account = {
  accountNumber: string;
  accountType: string;
  balance: string;
};

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
  phone: string;
  address: string;
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [visibleBalances, setVisibleBalances] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchProfileData(Number(userId));
    } else {
      toast.error("No user ID found in localStorage.");
      setLoading(false);
    }
  }, []);

  const fetchProfileData = async (userId: number) => {
    try {
      const res = await axios.post("/api/profile", { userId });
      setUserProfile(res.data.profile);
      setAccounts(res.data.accounts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile data.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBalanceVisibility = (index: number) => {
    setVisibleBalances((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteAccount = (index: number) => {
    setAccounts((prev) => prev.filter((_, i) => i !== index));
    setVisibleBalances((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!userProfile) {
    return <div className="flex justify-center items-center h-screen">Profile not found.</div>;
  }

  return (
    <div className="bg-gray-200 p-8">
      <div className="bg-white rounded-lg shadow-xl pb-8 relative">
        <div className="w-full h-[250px]">
          <Image
            src="/bg-profile.png"
            alt="Background"
            width={500}
            height={250}
            className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <FaRegUser className="text-gray-300 text-[8rem] bg-gray-100 rounded-full p-4 border-2 border-slate-900 shadow-lg" />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{userProfile.firstName} {userProfile.lastName}</p>
          </div>
          <p className="text-gray-700">{userProfile.email}</p>
          <p className="text-sm text-gray-500">{userProfile.username}</p>
        </div>
      </div>

      <div className="my-8 flex flex-col 2xl:flex-row gap-4">
        <div className="w-full 2xl:w-[35%] bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
          <ul className="mt-2 text-gray-700">
            <li className="flex border-y py-2">
              <span className="font-bold w-24">Full Name:</span>
              <span>{userProfile.firstName} {userProfile.lastName}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Birthday:</span>
              <span>{userProfile.dob}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Mobile:</span>
              <span>{userProfile.phone}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Email:</span>
              <span>{userProfile.email}</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Address:</span>
              <span>{userProfile.address}</span>
            </li>
          </ul>
        </div>

        <div className="w-full 2xl:w-[65%] bg-white rounded-lg shadow-xl p-8 space-y-2">
          <h4 className="text-xl text-gray-900 font-bold mb-4">SQL Preview</h4>
          <p className="text-slate-700 mb-2 font-bold">
          Join Query For Profile and User
          </p>
          <p className="text-gray-700 mb-2">
          SELECT u.email, u.username, up.first_name, up.last_name, up.address, up.phone, up.dob
       FROM Users u JOIN UserProfile up ON u.user_id = up.user_id
       WHERE u.user_id = ?`,
          </p>
          <p className="text-slate-700 mb-2 font-bold">
         Account Query
          </p>
          <p className="text-gray-700 mb-2">
          SELECT account_number AS accountNumber, account_type AS accountType, balance 
          FROM Accounts WHERE user_id = ?
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl text-gray-900 font-bold">User Accounts</h4>
          <button
            onClick={() => { setAccounts([]); setVisibleBalances({}); }}
            className="text-red-600 hover:text-red-900 font-bold"
          >
            Delete All
          </button>
        </div>
        {accounts.length > 0 ? (
          <ul className="divide-y">
            {accounts.map((acc, index) => (
              <li key={index} className="flex items-center justify-between py-3">
                <span className="w-1/4 font-bold">Account #:</span>
                <span className="w-1/4">{acc.accountNumber}</span>
                <span className="w-1/4 font-bold">Type:</span>
                <span className="w-1/4">{acc.accountType}</span>
                <span className="w-1/4 font-bold">Balance:</span>
                <span className="w-1/4 flex items-center">
                  {visibleBalances[index] ? acc.balance : "****"}
                  <button onClick={() => toggleBalanceVisibility(index)} className="ml-2 text-gray-600 hover:text-gray-900">
                    {visibleBalances[index] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
                <button onClick={() => deleteAccount(index)} className="ml-4 text-red-600 hover:text-red-900" title="Delete Account">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No accounts available.</p>
        )}
      </div>
    </div>
  );
}
