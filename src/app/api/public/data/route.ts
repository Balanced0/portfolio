import { NextResponse } from 'next/server';
import { fetchPublicPortfolioData } from '@/lib/getPublicData';

export async function GET() {
  const data = await fetchPublicPortfolioData();
  return NextResponse.json(data);
}
