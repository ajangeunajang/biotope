import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // /project/* 또는 /lab/* 패턴 감지
  if (pathname.match(/^\/(project|lab)\/.+$/)) {
    // 메인 페이지로 rewrite (URL은 유지)
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/(project|lab)/:path*',
  ],
};
