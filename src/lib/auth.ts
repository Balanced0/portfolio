import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.local';
// Default password fallback for initial dev setup
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-admin-jwt-key-portfolio-2026-secure'
);

const SESSION_COOKIE_NAME = 'admin_session';

export async function verifyCredentials(email: string, pass: string): Promise<boolean> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase()) {
    return false;
  }
  // Allow direct match or bcrypt match
  if (pass === ADMIN_PASSWORD_PLAIN) {
    return true;
  }
  try {
    return await bcrypt.compare(pass, ADMIN_PASSWORD_PLAIN);
  } catch {
    return false;
  }
}

export async function createAdminToken(): Promise<string> {
  return await new SignJWT({ role: 'admin', email: ADMIN_EMAIL })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch {
    return null;
  }
}

export async function checkIsAuthenticatedRequest(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) return false;
  const payload = await verifyAdminSessionToken(token);
  return !!payload && payload.role === 'admin';
}

export async function checkIsAuthenticatedCookies(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyAdminSessionToken(token);
  return !!payload && payload.role === 'admin';
}

export { SESSION_COOKIE_NAME };
