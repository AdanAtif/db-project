// 'use client';

// import SQLPreview from '@/components/SqlPreview';
// import { useState } from 'react';

// export default function CreateAccountPage() {
//   const [accountType, setAccountType] = useState('');
//   const [amount, setAmount] = useState('');



//   return (
//     <div className="min-h-screen py-6 flex flex-col sm:flex-row justify-center items-center sm:py-12 gap-32">
//       {/* Input Card */}
//       <div className="relative py-3 sm:max-w-md w-full">
//         <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
//           <div className="max-w-md mx-auto">
//             <h1 className="text-3xl font-semibold text-black mb-4">Create account</h1>
//             <div className="space-y-6">
//               <div>
//                 <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
//                 <select
//                   id="accountType"
//                   name="accountType"
//                   value={accountType}
//                   onChange={(e) => setAccountType(e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
//                 >
//                   <option value="">-- Select Account Type --</option>
//                   <option value="current">Current</option>
//                   <option value="saving">Saving</option>
//                   <option value="credit">Credit</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Initial Balance</label>
//                 <input
//                   type="number"
//                   id="amount"
//                   name="amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Create your pin</label>
//                 <input
//                   type="number"
//                   id="amount"
//                   name="amount"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
//                 />
//               </div>
//               <button className="bg-green-500 text-white rounded-md px-2 py-1 w-full">Create</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <SQLPreview sqlText={`INSERT INTO accounts (account_type, initial_balance,pin) VALUES ('${accountType}', ${amount}, ${pin});`} />
//     </div>
//   );
// }

// 'use client';

// import SQLPreview from '@/components/SqlPreview';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function CreateAccountPage() {
//   const [accountType, setAccountType] = useState('');
//   const [amount, setAmount] = useState('');
//   const [pin, setPin] = useState('');
//   const [userId, setUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setUserId(Number(storedUserId));
//     }
//   }, []);

//   const handleCreateAccount = async () => {
//     if (!accountType || !amount || !pin || !userId) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/createAccount', {
//         accountType,
//         amount,
//         pin,
//         userId
//       });

//       const data = response.data;
//       alert(`Account created successfully with Account Number: ${data.accountNumber}`);
//     } catch (error: any) {
//       console.error('Error:', error);
//       alert(`Error: ${error.response?.data?.message || 'An error occurred'}`);
//     }
//   };

//   return (
//     <div className="min-h-screen py-6 flex flex-col sm:flex-row justify-center items-center sm:py-12 gap-32">
//       {/* Input Card */}
//       <div className="relative py-3 sm:max-w-md w-full">
//         <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
//           <div className="max-w-md mx-auto">
//             <h1 className="text-3xl font-semibold text-black mb-4">Create Account</h1>
//             <div className="space-y-6">
//               <div>
//                 <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
//                 <select
//                   id="accountType"
//                   value={accountType}
//                   onChange={(e) => setAccountType(e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
//                 >
//                   <option value="">-- Select Account Type --</option>
//                   <option value="current">Current</option>
//                   <option value="saving">Saving</option>
//                   <option value="credit">Credit</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Initial Balance</label>
//                 <input
//                   type="number"
//                   id="amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Create Your Pin</label>
//                 <input
//                   type="password"
//                   id="pin"
//                   value={pin}
//                   onChange={(e) => setPin(e.target.value)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
//                 />
//               </div>
//               <button
//                 onClick={handleCreateAccount}
//                 className="bg-green-500 text-white rounded-md px-2 py-1 w-full"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SQL Preview */}
//       <SQLPreview sqlText='INSERT INTO accounts (user_id, account_type, initial_balance, pin) VALUES (${userId}, "${accountType}", ${amount}, "${pin}");' />
//     </div>
//   );
// }



'use client';

import SQLPreview from '@/components/SqlPreview';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

export default function CreateAccountPage() {
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const handleCreateAccount = async () => {
    if (!accountType || !amount || !pin || !userId) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/createAccount', {
        accountType,
        amount,
        pin,
        userId, // Include userId from localStorage
      });

      const data = response.data;
      toast.success(`Account created successfully with Account Number: ${data.accountNumber}`);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col sm:flex-row justify-center items-center sm:py-12 gap-32">
      {/* Input Card */}
      <div className="relative py-3 sm:max-w-md w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-black mb-4">Create Account</h1>
            <div className="space-y-6">
              <div>
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
                <select
                  id="accountType"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                >
                  <option value="">-- Select Account Type --</option>
                  <option value="current">Current</option>
                  <option value="saving">Saving</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Initial Balance</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
              </div>
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Create Your Pin</label>
                <input
                  type="password"
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
              </div>
              <button
                onClick={handleCreateAccount}
                disabled={loading}
                className="bg-green-500 text-white rounded-md px-2 py-1 w-full flex justify-center items-center"
              >
                {loading ? <Loader /> : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SQLPreview
        sqlText={`INSERT INTO accounts (user_id, account_type, initial_balance, pin) VALUES (${userId ?? 'NULL'}, '${accountType || 'AccountType'}', ${amount || 0}, '${pin || 'PIN'}');`}
      />
    </div>
  );
}
