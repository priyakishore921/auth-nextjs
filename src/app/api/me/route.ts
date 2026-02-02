import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from '@/dbconfig/dbConfig';
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log('userId ', userId);
    const user = await User.findById(userId).select('-password');

    console.log('user ', user);

    if (!user) {
      return NextResponse.json({ error: "user not found "}, {status: 400});
    }

    return NextResponse.json({
      message: "User found",
      data: user,
      success: true
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message}, { status: 500});
  }
}
