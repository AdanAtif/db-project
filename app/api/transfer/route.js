import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const db = await createConnection();
    const { fromAccount, toAccount, amount, pin } = await request.json();

    if (!fromAccount || !toAccount || !amount || !pin) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Validate source account and PIN
    const [sourceRows] = await db.query(
      "SELECT balance FROM Accounts WHERE account_number = ? AND pin = ?",
      [fromAccount, pin]
    );

    if (sourceRows.length === 0) {
      return NextResponse.json({ message: "Invalid source account or PIN" }, { status: 401 });
    }

    const sourceBalance = sourceRows[0].balance;
    if (sourceBalance < amount) {
      return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
    }

    // Begin transaction
    await db.query("START TRANSACTION");
    await db.query(
      "UPDATE Accounts SET balance = balance - ? WHERE account_number = ?",
      [amount, fromAccount]
    );
    await db.query(
      "UPDATE Accounts SET balance = balance + ? WHERE account_number = ?",
      [amount, toAccount]
    );
    await db.query("COMMIT");

    return NextResponse.json({ message: "Transfer successful" });
  } catch (error) {
    console.error("Transfer error:", error);
    await db.query("ROLLBACK");
    return NextResponse.json({ message: "Server error during transfer" }, { status: 500 });
  }
}
