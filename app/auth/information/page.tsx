"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import SQLPreview from "@/components/SqlPreview";

export default function UserInfoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/auth/information", {
        userId: Number(userId),
        ...formData,
      });
      toast.success("Profile information saved successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  const sqlText = userId
    ? `INSERT INTO UserProfile ( user_id, first_name, last_name, address, phone, dob)
values (${userId}, '${formData.firstName || "First Name"}', '${formData.lastName || "Last Name"}', '${formData.address || "Address"}', '${formData.phone || "Phone Number"}', '${formData.dob || "Date of Birth"}');`
    : "Loading...";

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center gap-32 items-center">
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-semibold text-black">
                Personal Information
              </h1>
              <form
                className="divide-y divide-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="py-8 text-base leading-6 space-y-12 text-gray-700 sm:text-lg sm:leading-7">
                  {(
                    [
                      "firstName",
                      "lastName",
                      "address",
                      "phone",
                      "dob",
                    ] as const
                  ).map((field) => (
                    <div key={field} className="relative">
                      <input
                        id={field}
                        name={field}
                        type={
                          field === "dob"
                            ? "date"
                            : field === "phone"
                            ? "tel"
                            : "text"
                        }
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-pink-600"
                        placeholder={field.replace(/([A-Z])/g, " $1")}
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                    </div>
                  ))}
                  <div className="relative">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-teal-500 text-white rounded-md px-2 py-1 w-full"
                    >
                      {loading ? <Loader /> : "Submit Information"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SQLPreview sqlText={sqlText} />
    </div>
  );
}
