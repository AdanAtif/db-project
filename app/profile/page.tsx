// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import {
//   FaRegUser,
//   FaEye,
//   FaEyeSlash,
//   FaTrash,
//   FaArrowUp,
//   FaArrowDown,
//   FaMoneyBill,
// } from "react-icons/fa6";
// import toast from "react-hot-toast";

// type Account = {
//   accountNumber: string;
//   accountType: string;
//   balance: string;
// };

// type UserProfile = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   dob: string;
//   phone: string;
//   address: string;
// };

// type Transfer = {
//   senderAccount: string;
//   receiverAccount: string;
//   amount: string;
//   timestamp: string;
// };

// type Transaction = {
//   account_number: string;
//   amount: string;
//   timestamp: string;
// };

// export default function ProfilePage() {
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [visibleBalances, setVisibleBalances] = useState<
//     Record<number, boolean>
//   >({});
//   const [loading, setLoading] = useState(true);
//   const [transferHistory, setTransferHistory] = useState<Transfer[]>([]);
//   const [depositHistory, setDepositHistory] = useState<Transaction[]>([]);
//   const [withdrawHistory, setWithdrawHistory] = useState<Transaction[]>([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       fetchProfileData(Number(userId));
//     } else {
//       toast.error("No user ID found in localStorage.");
//       setLoading(false);
//     }
//   }, []);

//   const fetchProfileData = async (userId: number) => {
//     try {
//       const res = await axios.post("/api/profile", { userId });
//       setUserProfile(res.data.profile);
//       setAccounts(res.data.accounts);
//       setTransferHistory(res.data.transferHistory);
//       setDepositHistory(res.data.depositHistory);
//       setWithdrawHistory(res.data.withdrawHistory);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch profile data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleBalanceVisibility = (index: number) => {
//     setVisibleBalances((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   const deleteAccount = (index: number) => {
//     setAccounts((prev) => prev.filter((_, i) => i !== index));
//     setVisibleBalances((prev) => {
//       const updated = { ...prev };
//       delete updated[index];
//       return updated;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!userProfile) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Profile not found.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-200 p-8">
//       <div className="bg-white rounded-lg shadow-xl pb-8 relative">
//         <div className="w-full h-[250px]">
//           <Image
//             src="/bg-profile.png"
//             alt="Background"
//             width={500}
//             height={250}
//             className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
//           />
//         </div>
//         <div className="flex flex-col items-center -mt-20">
//           <FaRegUser className="text-gray-300 text-[8rem] bg-gray-100 rounded-full p-4 border-2 border-slate-900 shadow-lg" />
//           <div className="flex items-center space-x-2 mt-2">
//             <p className="text-2xl">
//               {userProfile.firstName} {userProfile.lastName}
//             </p>
//           </div>
//           <p className="text-gray-700">{userProfile.email}</p>
//           <p className="text-sm text-gray-500">{userProfile.username}</p>
//         </div>
//       </div>

//       <div className="my-8 flex flex-col 2xl:flex-row gap-4">
//         <div className="w-full 2xl:w-[35%] bg-white rounded-lg shadow-xl p-8">
//           <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
//           <ul className="mt-2 text-gray-700">
//             <li className="flex border-y py-2">
//               <span className="font-bold w-24">Full Name:</span>
//               <span>
//                 {userProfile.firstName} {userProfile.lastName}
//               </span>
//             </li>
//             <li className="flex border-b py-2">
//               <span className="font-bold w-24">Birthday:</span>
//               <span>{userProfile.dob}</span>
//             </li>
//             <li className="flex border-b py-2">
//               <span className="font-bold w-24">Mobile:</span>
//               <span>{userProfile.phone}</span>
//             </li>
//             <li className="flex border-b py-2">
//               <span className="font-bold w-24">Email:</span>
//               <span>{userProfile.email}</span>
//             </li>
//             <li className="flex border-b py-2">
//               <span className="font-bold w-24">Address:</span>
//               <span>{userProfile.address}</span>
//             </li>
//           </ul>
//         </div>

//         <div className="w-full 2xl:w-[65%] bg-white rounded-lg shadow-xl p-8 space-y-2">
//           <h4 className="text-xl text-gray-900 font-bold mb-4">SQL Preview</h4>
//           <p className="text-slate-700 mb-2 font-bold">
//             Join Query For Profile and User
//           </p>
//           <p className="text-gray-700 mb-2 font-mono whitespace-pre-line">
//             {`SELECT u.email, u.username, up.first_name, up.last_name, up.address, up.phone, up.dob
// FROM Users u JOIN UserProfile up ON u.user_id = up.user_id
// WHERE u.user_id = ?`}
//           </p>
//           <p className="text-slate-700 mb-2 font-bold">Account Query</p>
//           <p className="text-gray-700 mb-2 font-mono whitespace-pre-line">
//             {`SELECT account_number AS accountNumber, account_type AS accountType, balance 
// FROM Accounts WHERE user_id = ?`}
//           </p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-xl p-8">
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="text-xl text-gray-900 font-bold">User Accounts</h4>
//           <button
//             onClick={() => {
//               setAccounts([]);
//               setVisibleBalances({});
//             }}
//             className="text-red-600 hover:text-red-900 font-bold"
//           >
//             Delete All
//           </button>
//         </div>
//         {accounts.length > 0 ? (
//           <ul className="divide-y">
//             {accounts.map((acc, index) => (
//               <li
//                 key={index}
//                 className="flex items-center justify-between py-3"
//               >
//                 <span className="w-1/4 font-bold">Account #:</span>
//                 <span className="w-1/4">{acc.accountNumber}</span>
//                 <span className="w-1/4 font-bold">Type:</span>
//                 <span className="w-1/4">{acc.accountType}</span>
//                 <span className="w-1/4 font-bold">Balance:</span>
//                 <span className="w-1/4 flex items-center">
//                   {visibleBalances[index] ? acc.balance : "****"}
//                   <button
//                     onClick={() => toggleBalanceVisibility(index)}
//                     className="ml-2 text-gray-600 hover:text-gray-900"
//                   >
//                     {visibleBalances[index] ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </span>
//                 <button
//                   onClick={() => deleteAccount(index)}
//                   className="ml-4 text-red-600 hover:text-red-900"
//                   title="Delete Account"
//                 >
//                   <FaTrash />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No accounts available.</p>
//         )}
//       </div>

//       {/* Missing cards for Transfer, Deposit, Withdraw histories */}
//       <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mt-8">
//         <div className="bg-white rounded-lg shadow-xl p-6">
//           <h4 className="text-lg font-bold text-gray-900 mb-2">
//             Transfer History
//           </h4>
//           <p className="text-gray-700 text-sm mb-1 font-mono whitespace-pre-line">
//             {`SELECT from_account AS fromAccount, to_account AS toAccount, amount, transfer_date AS date
// FROM TransferHistory WHERE user_id = ?`}
//           </p>

//           {/* uofuewiuf nweuifn iwu */}
//           <div className="mb-6">
//             <h5 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
//               <FaMoneyBill /> Transfer History
//             </h5>
//             {transferHistory.length > 0 ? (
//               <ul className="mt-2 text-gray-700 space-y-1">
//                 {transferHistory.map((t, i) => {
//                   const isSender = accounts.some(
//                     (a) => a.accountNumber === t.senderAccount
//                   );
//                   return (
//                     <li key={i}>
//                       <span className="font-bold">
//                         {isSender ? "Sent to" : "Received from"}:
//                       </span>{" "}
//                       {isSender ? t.receiverAccount : t.senderAccount} - PKR 
//                       {t.amount} on {t.timestamp}
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No transfer history available.</p>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-xl p-6">
//           <h4 className="text-lg font-bold text-gray-900 mb-2">
//             Deposit History
//           </h4>
//           <p className="text-gray-700 text-sm mb-1 font-mono whitespace-pre-line">
//             {`SELECT account_number AS accountNumber, amount, deposit_date AS date
// FROM DepositHistory WHERE user_id = ?`}
//           </p>
//           {/* lsfmkewmflkknlkewf */}
//           <div className="mb-6">
//             <h5 className="text-lg font-semibold text-green-600 flex items-center gap-2">
//               <FaArrowDown /> Deposit History
//             </h5>
//             {depositHistory.length > 0 ? (
//               <ul className="mt-2 text-gray-700 space-y-1">
//                 {depositHistory.map((d, i) => (
//                   <li key={i}>
//                     <span className="font-bold">
//                       Account {d.account_number}:
//                     </span>{" "}
//                     PKR {d.amount} on {d.timestamp}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No deposit history available.</p>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-xl p-6">
//           <h4 className="text-lg font-bold text-gray-900 mb-2">
//             Withdraw History
//           </h4>
//           <p className="text-gray-700 text-sm mb-1 font-mono whitespace-pre-line">
//             {`SELECT account_number AS accountNumber, amount, withdraw_date AS date
// FROM WithdrawHistory WHERE user_id = ?`}
//             <div>
//               <div className="mb-6">
//                 <h5 className="text-lg font-semibold text-red-600 flex items-center gap-2">
//                   <FaArrowUp /> Withdrawal History
//                 </h5>
//                 {withdrawHistory.length > 0 ? (
//                   <ul className="mt-2 text-gray-700 space-y-1">
//                     {withdrawHistory.map((w, i) => (
//                       <li key={i}>
//                         <span className="font-bold">
//                           Account {w.account_number}:
//                         </span>{" "}
//                         PKR {w.amount} on {w.timestamp}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500">
//                     No withdrawal history available.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  FaRegUser,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaMoneyBill,
  FaExchangeAlt,
} from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
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

type Transfer = {
  senderAccount: string;
  receiverAccount: string;
  amount: string;
  timestamp: string;
};

type Transaction = {
  account_number: string;
  amount: string;
  timestamp: string;
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [visibleBalances, setVisibleBalances] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [transferHistory, setTransferHistory] = useState<Transfer[]>([]);
  const [depositHistory, setDepositHistory] = useState<Transaction[]>([]);
  const [withdrawHistory, setWithdrawHistory] = useState<Transaction[]>([]);

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
      setTransferHistory(res.data.transferHistory);
      setDepositHistory(res.data.depositHistory);
      setWithdrawHistory(res.data.withdrawHistory);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile data.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBalanceVisibility = (index: number) => {
    setVisibleBalances((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const deleteAccount = (index: number) => {
    setAccounts((prev) => prev.filter((_, i) => i !== index));
    setVisibleBalances((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md pb-8 relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-blue-400">
          <Image
            src="/profile-background.jpg"
            alt="Background"
            width={500}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <div className="relative">
            <FaRegUser className="text-gray-300 text-[8rem] bg-gray-100 rounded-full p-4 border-4 border-white shadow-lg" />
            <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2">
              <FiCreditCard className="text-white text-lg" />
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-sm text-gray-500">@{userProfile.username}</p>
          </div>
        </div>
      </div>

      {/* Personal Info and SQL Preview */}
      <div className="my-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{userProfile.firstName} {userProfile.lastName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{userProfile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{userProfile.address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{userProfile.dob}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SQL Preview */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Database Queries</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">User Profile Query</h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 font-mono">
                  {`SELECT u.email, u.username, up.first_name, up.last_name, 
       up.address, up.phone, up.dob
FROM Users u 
JOIN UserProfile up ON u.user_id = up.user_id
WHERE u.user_id = ?`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">Account Query</h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 font-mono">
                  {`SELECT account_number AS accountNumber, 
       account_type AS accountType, 
       balance
FROM Accounts 
WHERE user_id = ?`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Bank Accounts</h2>
          <button
            onClick={() => {
              setAccounts([]);
              setVisibleBalances({});
            }}
            className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
          >
            <FaTrash className="mr-1" /> Delete All
          </button>
        </div>
        
        {accounts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((acc, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{acc.accountNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${acc.accountType === 'Savings' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {acc.accountType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {visibleBalances[index] ? `PKR ${acc.balance}` : '••••••'}
                        </span>
                        <button
                          onClick={() => toggleBalanceVisibility(index)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          {visibleBalances[index] ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => deleteAccount(index)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Account"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FiCreditCard className="w-full h-full" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No accounts</h3>
            <p className="mt-1 text-gray-500">You don't have any bank accounts yet.</p>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction History</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Transfer History */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center">
              <FaExchangeAlt className="text-white text-xl mr-3" />
              <h3 className="text-lg font-semibold text-white">Transfers</h3>
            </div>
          </div>
          <div className="p-6">
            {transferHistory.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {transferHistory.map((t, i) => {
                  const isSender = accounts.some(a => a.accountNumber === t.senderAccount);
                  return (
                    <li key={i} className="py-3">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center 
                          ${isSender ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {isSender ? <FaArrowUp /> : <FaArrowDown />}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {isSender ? 'Sent to' : 'Received from'} {isSender ? t.receiverAccount : t.senderAccount}
                          </p>
                          <p className="text-sm text-gray-500">{formatDate(t.timestamp)}</p>
                        </div>
                        <div className={`ml-auto text-sm font-medium 
                          ${isSender ? 'text-red-600' : 'text-green-600'}`}>
                          {isSender ? '-' : '+'}PKR {t.amount}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto h-16 w-16 text-gray-400">
                  <FaExchangeAlt className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No transfers</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't made any transfers yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Deposit History */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <div className="flex items-center">
              <FaArrowDown className="text-white text-xl mr-3" />
              <h3 className="text-lg font-semibold text-white">Deposits</h3>
            </div>
          </div>
          <div className="p-6">
            {depositHistory.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {depositHistory.map((d, i) => (
                  <li key={i} className="py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <FaArrowDown />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Account {d.account_number}</p>
                        <p className="text-sm text-gray-500">{formatDate(d.timestamp)}</p>
                      </div>
                      <div className="ml-auto text-sm font-medium text-green-600">
                        +PKR {d.amount}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto h-16 w-16 text-gray-400">
                  <FaArrowDown className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No deposits</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't made any deposits yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Withdraw History */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <div className="flex items-center">
              <FaArrowUp className="text-white text-xl mr-3" />
              <h3 className="text-lg font-semibold text-white">Withdrawals</h3>
            </div>
          </div>
          <div className="p-6">
            {withdrawHistory.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {withdrawHistory.map((w, i) => (
                  <li key={i} className="py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <FaArrowUp />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Account {w.account_number}</p>
                        <p className="text-sm text-gray-500">{formatDate(w.timestamp)}</p>
                      </div>
                      <div className="ml-auto text-sm font-medium text-red-600">
                        -PKR {w.amount}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto h-16 w-16 text-gray-400">
                  <FaArrowUp className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No withdrawals</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't made any withdrawals yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}