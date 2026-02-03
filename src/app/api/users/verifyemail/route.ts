import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log('[verifyemail route ts] token',token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {$gt: Date.now()}
    });

    console.log('[verifyemail route ts]user', user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token"}, { status: 400});
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified",
      success: true
    });

  } catch (error: any) {
    throw new Error(error.message);
  }
}