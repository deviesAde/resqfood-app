import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // In a real application, you would:
  // 1. Hash the password before comparing (never store plain passwords).
  // 2. Query a database to verify user credentials.
  // 3. Implement proper session management (e.g., JWTs, secure cookies).

  let role = "user"; // Default role

  if (email === "admin@gmail.com" && password === "admin") {
    role = "admin";
  } else if (email === "seller@gmail.com" && password === "seller") {
    role = "seller";
  } else if (email === "user@gmail.com" && password === "user") {
    role = "user";
  } else {
    // For any other credentials, simulate a failed login
    return NextResponse.json(
      { success: false, message: "password salah atau email salah" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, role });
}
