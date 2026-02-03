import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  //current path
  const path = request.nextUrl.pathname;
  console.log('current path ', path);

  const isPublicPath = path === '/login' || path === '/signup' 
  //|| path === '/verifyemail';

  const token = request.cookies.get('token')?.value || '';

  // if( path === '/verifyemail') {

  // }

  if (isPublicPath && token) {
    console.log(" is public and token exists");
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    console.log(" is NOT public and NO token exists");
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:id',
    // '/verifyemail'
  ]
}
