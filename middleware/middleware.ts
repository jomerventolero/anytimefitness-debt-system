import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/api/auth/pocketbase';

/**
 * Handles authentication for incoming requests.
 *
 * Checks for a valid authentication token in the request cookies. If a valid token is found, it redirects the user to the dashboard if they are trying to access the signin or signup pages. Otherwise, it allows the request to proceed.
 *
 * If no valid token is found, it redirects the user to the signin page if they are trying to access a non-public page.
 *
 * @param {NextRequest} request - The incoming request object.
 * @return {NextResponse} The response object, which may be a redirect to the signin or dashboard pages.

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('pb_auth')?.value;

  try {
    if (token) {
      pb.authStore.loadFromCookie(token);

      if (pb.authStore.isValid) {
        if (request.nextUrl.pathname === '/public/signin' || request.nextUrl.pathname === '/public/signup') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
      }
    }

    if (!request.nextUrl.pathname.startsWith('/public') && request.nextUrl.pathname !== '/public/signin' && request.nextUrl.pathname !== '/public/signup') {
      return NextResponse.redirect(new URL('/public/signin', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/public/signin', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)', '/dashboard/:path*'],
};
 */