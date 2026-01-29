import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;
    console.log(reqBody);

    if (!email) {
      return NextResponse.json({error: 'Please enter a email'}, { status: 400})
    }

    if (!username) {
      return NextResponse.json({error: 'Please enter a username'}, { status: 400})
    }

    if (!password) {
      return NextResponse.json({error: 'Please enter a password'}, { status: 400})
    }

    // if email already exists?
    if (await User.findOne({email})) {
      return NextResponse.json({error: 'User already exists'}, {status: 400});
    }

    // if username already exists?
    if (await User.findOne({username})) {
      return NextResponse.json({error: 'username already exists'}, {status: 400});
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser
    })

  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    }, {
      status: 500
    });
  }
}
