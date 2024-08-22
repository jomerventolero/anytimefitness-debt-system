import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/api/auth/pocketbase';


export async function middleware(request: NextRequest) {
  if (!pb.authStore.isValid) {
    return NextResponse.redirect(new URL('/public/signin', request.url))
  } else if (request.nextUrl.pathname.startsWith('/public') && pb.authStore.isValid) {
    return NextResponse.redirect(new URL('/private/dashboard', request.url))
  }
  console.log('middleware', request.nextUrl.pathname, pb.authStore.isValid);

}

export const config = {
  matcher: ['/private/*', '/public/signin'],
}
