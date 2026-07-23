import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import EducationTimeline from '@/components/EducationTimeline';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectsSection from '@/components/ProjectsSection';
import CodingStatsSection from '@/components/CodingStatsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { fetchPublicPortfolioData } from '@/lib/getPublicData';
import { DEFAULT_PROFILE, DEFAULT_CONTACT } from '@/lib/seedData';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const data = await fetchPublicPortfolioData();
  const profile = data.profile || DEFAULT_PROFILE;
  const contact = data.contact || DEFAULT_CONTACT;

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <HeroSection profile={profile} socialLinks={data.socialLinks || []} />
        <AboutSection aboutText={profile.aboutText} hobbies={profile.hobbies || []} />
        <SkillsSection skills={data.skills || []} />
        <EducationTimeline education={data.education || []} />
        <ExperienceTimeline experience={data.experience || []} />
        <ProjectsSection projects={data.projects || []} />
        <CodingStatsSection stats={data.codingStats || []} />
        <ContactSection contact={contact} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
