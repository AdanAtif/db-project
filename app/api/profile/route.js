import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const db = await createConnection();
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const [userRows] = await db.query(
      `SELECT u.email, u.username, up.first_name, up.last_name, up.address, up.phone, up.dob
       FROM Users u JOIN UserProfile up ON u.user_id = up.user_id
       WHERE u.user_id = ?`,
      [userId]
    );

    if (userRows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = userRows[0];

    const [accountRows] = await db.query(
      `SELECT account_number AS accountNumber, account_type AS accountType, balance 
       FROM Accounts WHERE user_id = ?`,
      [userId]
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
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
