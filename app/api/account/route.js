import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await createConnection();
    const { userId } = await request.json();

    console.log("Fetching accounts for userId:", userId);
    
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const [accounts] = await db.query(
      "SELECT account_number AS accountNumber, account_type AS accountType FROM Accounts WHERE user_id = ?",
      [userId]
    );

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    return NextResponse.json({ message: "Server error while fetching accounts" }, { status: 500 });
  }
}
