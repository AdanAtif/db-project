import { createConnection } from "../../../../db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await createConnection();
    const body = await request.json();
    const { userId, firstName, lastName, address, phone, dob } = body;

    if (!userId) {
      return NextResponse.json({ message: "Missing userId (foreign key)" }, { status: 400 });
    }

    await db.query(
      `INSERT INTO UserProfile (user_id, first_name, last_name, address, phone, dob) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, firstName, lastName, address, phone, dob]
    );

    return NextResponse.json({ message: "User profile saved successfully" });
  } catch (error) {
    console.error("Error saving user profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
