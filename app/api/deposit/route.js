// app/api/account/route.ts

import { createConnection } from "@/db/Db";
import {  NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const db = await createConnection();
    const { accountNumber, amount, pin } = await request.json();

    if (!accountNumber || !amount || !pin) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    const [rows] = await db.query(
      "SELECT balance FROM Accounts WHERE account_number = ? AND pin = ?",
      [accountNumber, pin]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid account or PIN" }, { status: 401 });
    }
    await db.query(
      "UPDATE Accounts SET balance = balance + ? WHERE account_number = ?",
      [amount, accountNumber]
    );

    return NextResponse.json({ message: "Deposit successful" });
  } catch (error) {
    console.error("Deposit error:", error);
    return NextResponse.json({ message: "Server error during deposit" }, { status: 500 });
  }
}
