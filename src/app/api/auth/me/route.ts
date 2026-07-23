import { NextRequest, NextResponse } from 'next/server';
import { checkIsAuthenticatedRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const isAuth = await checkIsAuthenticatedRequest(req);
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, role: 'admin' });
}
