import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const db = await createConnection();
        const { email, username, password } = await request.json();

        if (!email || !username || !password) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }
        const [existingUser] = await db.query(
            "SELECT * FROM Users WHERE email = ? OR username = ?",
            [email, username]
        );
        if (existingUser.length > 0) {
            return NextResponse.json({ message: "Email or username already taken" }, { status: 409 });
        }

        const sql = "INSERT INTO Users (email, username, password) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [email, username, password]);

        return NextResponse.json({ message: "User registered successfully", userId: result.insertId });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Server error during registration" }, { status: 500 });
    }
}
