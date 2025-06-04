// app/api/account/route.ts

import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  let db;
  try {
    db = await createConnection();
    const { accountNumber, amount, pin } = await request.json();

    if (!accountNumber || !amount || !pin) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Get account_id and verify PIN
    const [rows] = await db.query(
      "SELECT account_id, balance FROM Accounts WHERE account_number = ? AND pin = ?",
      [accountNumber, pin]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid account or PIN" }, { status: 401 });
    }

    const { account_id } = rows[0];

    // Start transaction
    await db.query("START TRANSACTION");

    // Update balance
    await db.query(
      "UPDATE Accounts SET balance = balance + ? WHERE account_number = ?",
      [amount, accountNumber]
    );

    // Insert into DepositHistory
    await db.query(
      "INSERT INTO DepositHistory (account_id, amount) VALUES (?, ?)",
      [account_id, amount]
    );

    await db.query("COMMIT");

    return NextResponse.json({ message: "Deposit successful" });
  } catch (error) {
    console.error("Deposit error:", error);
    if (db) await db.query("ROLLBACK");
    return NextResponse.json({ message: "Server error during deposit" }, { status: 500 });
  }
}
