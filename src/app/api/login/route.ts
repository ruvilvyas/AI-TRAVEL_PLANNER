import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if email is verified
    if (!user.verified) {
      return NextResponse.json({ error: "Email not verified!" }, { status: 403 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    return NextResponse.json({ message: "Login successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
