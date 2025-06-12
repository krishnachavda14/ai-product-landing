import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log environment variable status (not the actual values)
  const envStatus = {
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
  };
  
  console.log('Environment variables status:', envStatus);
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 