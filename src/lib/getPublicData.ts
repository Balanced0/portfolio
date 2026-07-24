import { connectToDatabase } from '@/lib/db';
import { Profile } from '@/models/Profile';
import { Skill } from '@/models/Skill';
import { Education } from '@/models/Education';
import { Experience } from '@/models/Experience';
import { Project } from '@/models/Project';
import { SocialLink } from '@/models/SocialLink';
import { Contact } from '@/models/Contact';
import { CodingStat } from '@/models/CodingStat';
import {
  DEFAULT_PROFILE,
  DEFAULT_SKILLS,
  DEFAULT_EDUCATION,
  DEFAULT_EXPERIENCE,
  DEFAULT_PROJECTS,
  DEFAULT_SOCIALS,
  DEFAULT_CONTACT,
  DEFAULT_STATS,
} from '@/lib/seedData';

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
    console.error('[getPublicData] Codeforces fetch error:', err);
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
    console.error('[getPublicData] LeetCode fetch error:', err);
  }
  return null;
}

async function getOrRefreshCodingStats() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return DEFAULT_STATS;

    const cached = await CodingStat.find().lean();
    const now = Date.now();
    const isStale =
      cached.length === 0 ||
      cached.some((s) => now - new Date(s.lastFetchedAt).getTime() > CACHE_MAX_AGE_MS);

    if (isStale) {
      const [cfStat, lcStat] = await Promise.all([fetchCodeforcesStats(), fetchLeetCodeStats()]);

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

      const refreshed = await CodingStat.find().lean();
      // If both APIs failed and DB is still empty, seed with real-data defaults
      if (refreshed.length === 0) {
        await CodingStat.insertMany(DEFAULT_STATS);
        return JSON.parse(JSON.stringify(await CodingStat.find().lean()));
      }

      return JSON.parse(JSON.stringify(refreshed));
    }

    return JSON.parse(JSON.stringify(cached));
  } catch (err) {
    console.error('[getPublicData] getOrRefreshCodingStats error:', err);
    return DEFAULT_STATS;
  }
}

export async function fetchPublicPortfolioData() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return {
        profile: DEFAULT_PROFILE,
        skills: DEFAULT_SKILLS,
        education: DEFAULT_EDUCATION,
        experience: DEFAULT_EXPERIENCE,
        projects: DEFAULT_PROJECTS,
        socialLinks: DEFAULT_SOCIALS,
        contact: DEFAULT_CONTACT,
        codingStats: DEFAULT_STATS,
        source: 'fallback-no-db',
      };
    }

    let profile = await Profile.findOne().lean();
    if (!profile) {
      profile = JSON.parse(JSON.stringify((await Profile.create(DEFAULT_PROFILE)).toObject()));
    } else {
      profile = JSON.parse(JSON.stringify(profile));
    }

    let skills = await Skill.find().sort({ order: 1, createdAt: 1 }).lean();
    if (skills.length === 0) {
      await Skill.insertMany(DEFAULT_SKILLS);
      skills = await Skill.find().sort({ order: 1, createdAt: 1 }).lean();
    }
    skills = JSON.parse(JSON.stringify(skills));

    let education = await Education.find().sort({ order: 1, createdAt: -1 }).lean();
    if (education.length === 0) {
      await Education.insertMany(DEFAULT_EDUCATION);
      education = await Education.find().sort({ order: 1, createdAt: -1 }).lean();
    }
    education = JSON.parse(JSON.stringify(education));

    let experience = await Experience.find().sort({ order: 1, createdAt: -1 }).lean();
    if (experience.length === 0) {
      await Experience.insertMany(DEFAULT_EXPERIENCE);
      experience = await Experience.find().sort({ order: 1, createdAt: -1 }).lean();
    }
    experience = JSON.parse(JSON.stringify(experience));

    let projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    if (projects.length === 0) {
      await Project.insertMany(DEFAULT_PROJECTS);
      projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    }
    projects = JSON.parse(JSON.stringify(projects));

    let socialLinks = await SocialLink.find().sort({ order: 1 }).lean();
    if (socialLinks.length === 0) {
      await SocialLink.insertMany(DEFAULT_SOCIALS);
      socialLinks = await SocialLink.find().sort({ order: 1 }).lean();
    }
    socialLinks = JSON.parse(JSON.stringify(socialLinks));

    let contact = await Contact.findOne().lean();
    if (!contact) {
      contact = JSON.parse(JSON.stringify((await Contact.create(DEFAULT_CONTACT)).toObject()));
    } else {
      contact = JSON.parse(JSON.stringify(contact));
    }

    const codingStats = await getOrRefreshCodingStats();

    return {
      profile,
      skills,
      education,
      experience,
      projects,
      socialLinks,
      contact,
      codingStats,
      source: 'database',
    };
  } catch (error) {
    console.error('Error in fetchPublicPortfolioData:', error);
    return {
      profile: DEFAULT_PROFILE,
      skills: DEFAULT_SKILLS,
      education: DEFAULT_EDUCATION,
      experience: DEFAULT_EXPERIENCE,
      projects: DEFAULT_PROJECTS,
      socialLinks: DEFAULT_SOCIALS,
      contact: DEFAULT_CONTACT,
      codingStats: DEFAULT_STATS,
      source: 'fallback-error',
    };
  }
}
