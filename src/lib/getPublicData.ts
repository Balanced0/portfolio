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

    let codingStats = await CodingStat.find().lean();
    if (codingStats.length === 0) {
      await CodingStat.insertMany(DEFAULT_STATS);
      codingStats = await CodingStat.find().lean();
    }
    codingStats = JSON.parse(JSON.stringify(codingStats));

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
