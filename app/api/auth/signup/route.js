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
        html: `<!DOCTYPE html>
        <html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #008080; /* Teal */
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 30px;
            background-color: #f9f9f9;
            border-left: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
        }
        .code-container {
            background-color: #0077b6; /* Blue */
            color: white;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 3px;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
            margin: 25px 0;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .footer {
            background-color: #e6f2f2;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
            color: #666;
            border-left: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
        }
        .button {
            display: inline-block;
            background-color: #008080; /* Teal */
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 5px;
            margin: 15px 0;
            font-weight: bold;
        }
        .note {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <!-- Replace with actual NIIT Bank logo URL -->
        <img src="https://example.com/niit-bank-logo.png" alt="NIIT Bank">
    </div>
    
    <div class="content">
        <h2 style="color: #008080;">Email Verification</h2>
        <p>Dear Valued Customer,</p>
        <p>Thank you for registering with NIIT Bank. To complete your registration, please use the following verification code:</p>
        
        <div class="code-container">
            ${verificationCode}
        </div>
        
        <p>This code will expire in 15 minutes. For your security, please do not share this code with anyone.</p>
        
        <p>If you didn't request this code, please ignore this email or contact our support team immediately.</p>
        
        <p class="note">Note: This is an automated message. Please do not reply to this email.</p>
    </div>
    
    <div class="footer">
        <p>&copy; 2023 NIIT Bank. All rights reserved.</p>
        <p>NIIT Bank, 123 Financial District, City, Country</p>
        <p>Customer Support: support@niitbank.com | +1 (800) 123-4567</p>
    </div>
</body>
</html>`,
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
