import { createConnection } from "../../../../db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await createConnection();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Find user by email
    const [userResult] = await db.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );

    if (userResult.length === 0) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const user = userResult[0];

    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ message: "Unsuccessful: Email needs to be verified" }, { status: 403 });
    }

    return NextResponse.json({ message: "Login successful", userId: user.user_id });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error during login" }, { status: 500 });
  }
}
