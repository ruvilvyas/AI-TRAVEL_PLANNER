import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Store OTPs temporarily (Use a database for production)
const otpStorage: Record<string, { otp: string; expiresAt: number }> = {};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with expiry time (5 minutes)
    otpStorage[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // Send OTP email using Resend
    await resend.emails.send({
      from: "your@email.com", // Change this to your verified email
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is: <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
    });

    return NextResponse.json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
