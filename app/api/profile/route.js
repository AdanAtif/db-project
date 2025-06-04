

// export async function POST(request) {
//   const db = await createConnection();
//   try {
//     const { userId } = await request.json();
//     if (!userId) {
//       return NextResponse.json({ message: "Missing userId" }, { status: 400 });
//     }

//     const [userRows] = await db.query(
//       `SELECT u.email, u.username, up.first_name, up.last_name, up.address, up.phone, up.dob
//        FROM Users u JOIN UserProfile up ON u.user_id = up.user_id
//        WHERE u.user_id = ?`,
//       [userId]
//     );

//     if (userRows.length === 0) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const user = userRows[0];

//     const [accountRows] = await db.query(
//       `SELECT account_number AS accountNumber, account_type AS accountType, balance 
//        FROM Accounts WHERE user_id = ?`,
//       [userId]
//     );

//     return NextResponse.json({
//       profile: {
//         firstName: user.first_name,
//         lastName: user.last_name,
//         email: user.email,
//         username: user.username,
//         dob: user.dob,
//         phone: user.phone,
//         address: user.address,
//       },
//       accounts: accountRows,
//     });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
// app/api/profile/route.ts

import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const db = await createConnection();

  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // Fetch profile info
    const [userRows] = await db.query(
      `SELECT u.email, u.username, up.first_name, up.last_name, up.address, up.phone, up.dob
       FROM Users u 
       JOIN UserProfile up ON u.user_id = up.user_id
       WHERE u.user_id = ?`,
      [userId]
    );

    if (userRows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = userRows[0];

    // Fetch user's accounts
    const [accountRows] = await db.query(
      `SELECT account_id, account_number AS accountNumber, account_type AS accountType, balance 
       FROM Accounts 
       WHERE user_id = ?`,
      [userId]
    );

    const accountIds = accountRows.map(acc => acc.account_id);

    // If no accounts, return just profile and empty arrays
    if (accountIds.length === 0) {
      return NextResponse.json({
        profile: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          username: user.username,
          dob: user.dob,
          phone: user.phone,
          address: user.address,
        },
        accounts: [],
        transferHistory: [],
        depositHistory: [],
        withdrawHistory: [],
      });
    }

    const placeholders = accountIds.map(() => '?').join(', ');

    // Fetch transfer history
    const [transferHistory] = await db.query(
      `SELECT t.transfer_id, t.amount, t.transfer_date AS timestamp,
              t.from_account_id AS sender_account_id, t.to_account_id AS receiver_account_id,
              sa.account_number AS senderAccount, ra.account_number AS receiverAccount
       FROM TransferHistory t
       JOIN Accounts sa ON t.from_account_id = sa.account_id
       JOIN Accounts ra ON t.to_account_id = ra.account_id
       WHERE t.from_account_id IN (${placeholders}) OR t.to_account_id IN (${placeholders})
       ORDER BY t.transfer_date DESC`,
      [...accountIds, ...accountIds]
    );

    // Fetch deposit history
    const [depositHistory] = await db.query(
      `SELECT d.deposit_id, d.amount, d.deposit_date AS timestamp, a.account_number
       FROM DepositHistory d
       JOIN Accounts a ON d.account_id = a.account_id
       WHERE d.account_id IN (${placeholders})
       ORDER BY d.deposit_date DESC`,
      accountIds
    );

    // Fetch withdraw history
    const [withdrawHistory] = await db.query(
      `SELECT w.withdraw_id, w.amount, w.withdraw_date AS timestamp, a.account_number
       FROM WithdrawHistory w
       JOIN Accounts a ON w.account_id = a.account_id
       WHERE w.account_id IN (${placeholders})
       ORDER BY w.withdraw_date DESC`,
      accountIds
    );

    return NextResponse.json({
      profile: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        username: user.username,
        dob: user.dob,
        phone: user.phone,
        address: user.address,
      },
      accounts: accountRows,
      transferHistory,
      depositHistory,
      withdrawHistory,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
