import { connect } from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
  
    if (!email) {
      return NextResponse.json({ error: 'Enter an email'}, { status: 400 });
    }
  
    if (!password) {
      return NextResponse.json({ error: 'Enter a password'}, { status: 400 });
    }

    // does email exist?
    const user = await User.findOne({email});
    if(!user) {
      return NextResponse.json({ error: 'User does not exist'}, { status: 400 })
    }

    // verify password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('valid password ', validPassword);

    if (!validPassword)
      return NextResponse.json({ error: 'Invalid password' }, { status: 400});

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d"});

    const response =  NextResponse.json({
      message: 'User logged in successfully',
      success: true
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;




  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 500});
  }
}
