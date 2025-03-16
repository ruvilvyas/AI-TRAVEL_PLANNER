import { NextResponse } from "next/server";

// Using the same user array for demo (replace with real DB)
const users: { email: string; verified: boolean; token: string }[] = [];

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    // Find user by token
    const user = users.find((u) => u.token === token);
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token!" }, { status: 400 });
    }

    // Mark user as verified
    user.verified = true;

    return NextResponse.json({ message: "✅ Email verified successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
