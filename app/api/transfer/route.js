import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  let db; 
  try {
    db = await createConnection();
    const { fromAccount, toAccount, amount, pin } = await request.json();

    if (!fromAccount || !toAccount || !amount || !pin) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const [sourceRows] = await db.query(
      "SELECT account_id, balance FROM Accounts WHERE account_number = ? AND pin = ?",
      [fromAccount, pin]
    );

    if (sourceRows.length === 0) {
      return NextResponse.json({ message: "Invalid source account or PIN" }, { status: 401 });
    }

    const sourceAccountId = sourceRows[0].account_id;
    const sourceBalance = sourceRows[0].balance;

    if (sourceBalance < amount) {
      return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
    }

    const [destRows] = await db.query(
      "SELECT account_id FROM Accounts WHERE account_number = ?",
      [toAccount]
    );

    if (destRows.length === 0) {
      return NextResponse.json({ message: "Destination account not found" }, { status: 404 });
    }

    const destAccountId = destRows[0].account_id;

    // Begin transaction
    await db.query("START TRANSACTION");

    // Update balances
    await db.query(
      "UPDATE Accounts SET balance = balance - ? WHERE account_number = ?",
      [amount, fromAccount]
    );
    await db.query(
      "UPDATE Accounts SET balance = balance + ? WHERE account_number = ?",
      [amount, toAccount]
    );

    // Insert transfer record
    await db.query(
      `INSERT INTO TransferHistory (from_account_id, to_account_id, amount) VALUES (?, ?, ?)`,
      [sourceAccountId, destAccountId, amount]
    );

    await db.query("COMMIT");

    return NextResponse.json({ message: "Transfer successful" });

  } catch (error) {
    console.error("Transfer error:", error);
    if (db) await db.query("ROLLBACK");
    return NextResponse.json({ message: "Server error during transfer" }, { status: 500 });
  }
}
