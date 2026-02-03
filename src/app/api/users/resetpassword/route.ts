import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { password, token } = await request.json();
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() + 360000 }
    });

    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true
    });

  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Could not resetpassword " }, { status: 500 });
  }
}
