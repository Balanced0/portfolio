import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { CodingStat } from '@/models/CodingStat';
import { DEFAULT_STATS } from '@/lib/seedData';

const HANDLE = 'MISTYCAN';
const CACHE_MAX_AGE_MS = 1000 * 60 * 60; // 1 hour

async function fetchCodeforcesStats() {
  try {
    const [infoRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${HANDLE}`, { cache: 'no-store' }),
      fetch(`https://codeforces.com/api/user.rating?handle=${HANDLE}`, { cache: 'no-store' }),
    ]);

    if (!infoRes.ok || !ratingRes.ok) return null;

    const infoData = await infoRes.json();
    const ratingData = await ratingRes.json();

    if (infoData.status === 'OK' && infoData.result?.length > 0) {
      const user = infoData.result[0];
      const history =
        ratingData.status === 'OK' && Array.isArray(ratingData.result)
          ? ratingData.result.map(
              (r: { contestName: string; newRating: number; ratingUpdateTimeSeconds: number }) => ({
                title: r.contestName,
                rating: r.newRating,
                date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString().slice(0, 7),
              })
            )
          : [];

      return {
        platform: 'codeforces' as const,
        handle: HANDLE,
        rating: user.rating ?? 0,
        maxRating: user.maxRating ?? 0,
        rank: user.rank || 'Unrated',
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        ratingHistory: history,
        lastFetchedAt: new Date(),
      };
    }
  } catch (err) {
    console.error('[coding-stats route] Codeforces fetch error:', err);
  }
  return null;
}

async function fetchLeetCodeStats() {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          badge {
            name
          }
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username: HANDLE } }),
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.data?.matchedUser) {
      const matched = data.data.matchedUser;
      const contest = data.data.userContestRanking;
      const submitStats = matched.submitStats?.acSubmissionNum || [];

      let total = 0,
        easy = 0,
        medium = 0,
        hard = 0;
      submitStats.forEach((item: { difficulty: string; count: number }) => {
        if (item.difficulty === 'All') total = item.count;
        if (item.difficulty === 'Easy') easy = item.count;
        if (item.difficulty === 'Medium') medium = item.count;
        if (item.difficulty === 'Hard') hard = item.count;
      });

      const globalRanking = contest?.globalRanking || matched.profile?.ranking || 0;
      const rankStr = globalRanking ? `#${globalRanking.toLocaleString()}` : 'Unranked';

      return {
        platform: 'leetcode' as const,
        handle: HANDLE,
        rating: Math.round(contest?.rating || 0),
        maxRating: Math.round(contest?.rating || 0),
        rank: contest?.badge?.name || rankStr,
        totalSolved: total,
        easySolved: easy,
        mediumSolved: medium,
        hardSolved: hard,
        ratingHistory: [],
        lastFetchedAt: new Date(),
      };
    }
  } catch (err) {
    console.error('[coding-stats route] LeetCode fetch error:', err);
  }
  return null;
}

export async function GET(req: NextRequest) {
  const force = req.nextUrl.searchParams.get('force') === 'true';

  try {
    const conn = await connectToDatabase();
    if (conn) {
      let stats = await CodingStat.find().lean();
      const now = new Date().getTime();

      const isStale =
        stats.length === 0 ||
        stats.some((s) => now - new Date(s.lastFetchedAt).getTime() > CACHE_MAX_AGE_MS);

      if (force || isStale) {
        const [cfStat, lcStat] = await Promise.all([
          fetchCodeforcesStats(),
          fetchLeetCodeStats(),
        ]);

        if (cfStat) {
          await CodingStat.findOneAndUpdate({ platform: 'codeforces' }, cfStat, {
            upsert: true,
            new: true,
          });
        }

        if (lcStat) {
          await CodingStat.findOneAndUpdate({ platform: 'leetcode' }, lcStat, {
            upsert: true,
            new: true,
          });
        }

        stats = await CodingStat.find().lean();
      }

      if (stats.length > 0) {
        return NextResponse.json({ stats, source: 'cache-db' });
      }
    }
  } catch (error) {
    console.error('Error in coding-stats API route:', error);
  }

  return NextResponse.json({ stats: DEFAULT_STATS, source: 'fallback' });
}
