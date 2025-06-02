import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await createConnection();
    const { accountType, amount, pin, userId } = await request.json();

    // Validate required fields
    if (!accountType || !amount || !pin || !userId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Validate accountType
    const validAccountTypes = ["current", "saving", "debt"];
    if (!validAccountTypes.includes(accountType)) {
      return NextResponse.json({ message: "Invalid accountType" }, { status: 400 });
    }

    const accountNumber = Math.floor(100000000 + Math.random() * 900000000); // Random 9-digit
    const createdAt = new Date();

    // Insert including account_type
    const sql =
      "INSERT INTO Accounts (account_number, user_id, balance, pin, createdAt, account_type) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(sql, [accountNumber, userId, amount, pin, createdAt, accountType]);

    return NextResponse.json({
      message: "Account created successfully",
      accountNumber,
    });
  } catch (error) {
    console.error("Account creation error:", error);
    return NextResponse.json({ message: "Server error during account creation" }, { status: 500 });
  }
}
