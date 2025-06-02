import { createConnection } from "../../../../db/Db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await createConnection();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }
    await db.query("UPDATE Users SET emailVerified = 1 WHERE user_id = ?", [userId]);

    return NextResponse.json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ message: "Server error during verification." }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const db = await createConnection();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }
    const [existingUser] = await db.query("SELECT email FROM Users WHERE user_id = ?", [userId]);
    if (existingUser.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userEmail = existingUser[0].email;

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your New Verification Code",
      text: `Your new verification code is: ${verificationCode}`,
      html: `<p>Your new verification code is: <b>${verificationCode}</b></p>`,
    });

    return NextResponse.json({
      message: "New verification code sent.",
      code: verificationCode,
    });
  } catch (error) {
    console.error("Resend code error:", error);
    return NextResponse.json({ message: "Server error during code resend." }, { status: 500 });
  }
}
