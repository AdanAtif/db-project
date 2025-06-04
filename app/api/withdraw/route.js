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

    // Fetch account info to validate and get account_id
    const [rows] = await db.query(
      "SELECT account_id, balance FROM Accounts WHERE account_number = ? AND pin = ?",
      [accountNumber, pin]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid account or PIN" }, { status: 401 });
    }

    const { account_id, balance } = rows[0];

    if (balance < amount) {
      return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
    }

    await db.query("START TRANSACTION");

    await db.query(
      "UPDATE Accounts SET balance = balance - ? WHERE account_number = ?",
      [amount, accountNumber]
    );

    await db.query(
      `INSERT INTO WithdrawHistory (account_id, amount) VALUES (?, ?)`,
      [account_id, amount]
    );

    await db.query("COMMIT");

    return NextResponse.json({ message: "Withdrawal successful" });
  } catch (error) {
    console.error("Withdrawal error:", error);
    if (db) await db.query("ROLLBACK");
    return NextResponse.json({ message: "Server error during withdrawal" }, { status: 500 });
  }
}
