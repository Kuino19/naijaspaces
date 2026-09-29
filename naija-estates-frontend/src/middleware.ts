import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] });
      if (payload.role !== 'AGENT') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
