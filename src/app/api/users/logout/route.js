import { NextResponse } from "next/server";

export async function GET() {
  try {
    // create a response which is capable of removing teh cookies
    const response = NextResponse.json(
      { 
        message: 'Logout successful',
        success: true
      });
      response.cookies.set("token", "", { httpOnly: true, expires: new Date()});
      return response;
  }catch (err) {
    return NextResponse.json({error: err.message}, { status: 500});
  }
}
