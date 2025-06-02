import { createConnection } from "@/db/Db";
import nodemailer from "nodemailer";
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
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is: ${verificationCode}`,
        html: `<p>Your verification code is: <b>${verificationCode}</b></p>`,
      }, (error, info) => {
        if (error) {
          console.error("Email sending error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      

    return NextResponse.json({ 
      message: "User registered successfully. Verification code sent.", 
      userId: result.insertId,
      code: verificationCode 
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Server error during registration" }, { status: 500 });
  }
}
