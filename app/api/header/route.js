import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const db = await createConnection();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const [profile] = await db.query(
      "SELECT * FROM UserProfile WHERE user_id = ?",
      [userId]
    );

    if (profile.length > 0) {
      return NextResponse.json({ exists: true, profile: profile[0] });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error("Profile check error:", error);
    return NextResponse.json({ message: "Server error during profile check" }, { status: 500 });
  }
}
