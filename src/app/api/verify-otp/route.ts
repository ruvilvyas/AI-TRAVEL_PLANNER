import { NextResponse } from "next/server";
import { otpStorage } from "@/lib/otpStorage"; // ✅ Import OTP storage

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
  }

  const storedOtp = otpStorage[email];

  if (!storedOtp || storedOtp.expiresAt < Date.now()) {
    return NextResponse.json({ error: "OTP expired or invalid" }, { status: 400 });
  }

  if (storedOtp.otp !== otp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  // OTP is valid, email is verified!
  delete otpStorage[email];

  return NextResponse.json({ message: "Email verified successfully!" });
}
