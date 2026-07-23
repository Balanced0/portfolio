'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Wrench,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Share2,
  Mail,
  Trophy,
  LogOut,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Entities state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>({ name: '', designation: '', aboutText: '', hobbies: [], photoUrl: '', resumeUrl: '' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [skills, setSkills] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [education, setEducation] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [experience, setExperience] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contact, setContact] = useState<any>({ email: '', phone: '', whatsapp: '' });

  // Verification & initial data fetch
  useEffect(() => {
    async function verifyAndLoad() {
      try {
        const authRes = await fetch('/api/auth/me');
        if (!authRes.ok) {
          router.push('/x7k-panel/login');
          return;
        }

        const dataRes = await fetch('/api/public/data');
        if (dataRes.ok) {
          const data = await dataRes.json();
          if (data.profile) setProfile(data.profile);
          if (data.skills) setSkills(data.skills);
          if (data.education) setEducation(data.education);
          if (data.experience) setExperience(data.experience);
          if (data.projects) setProjects(data.projects);
          if (data.socialLinks) setSocialLinks(data.socialLinks);
          if (data.contact) setContact(data.contact);
        }
      } catch (err) {
        console.error('Failed to load admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    verifyAndLoad();
  }, [router]);

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/x7k-panel/login');
  };

  const saveProfile = async () => {
    const res = await fetch('/api/admin/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (res.ok) showStatus('Profile saved successfully!');
  };

  const saveContact = async () => {
    const res = await fetch('/api/admin/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (res.ok) showStatus('Contact details saved successfully!');
  };

  // Generic Save / Add / Delete for array collections
  const addEntityItem = (entity: string, itemTemplate: object) => {
    if (entity === 'skills') setSkills([...skills, itemTemplate]);
    if (entity === 'education') setEducation([...education, itemTemplate]);
    if (entity === 'experience') setExperience([...experience, itemTemplate]);
    if (entity === 'projects') setProjects([...projects, itemTemplate]);
    if (entity === 'socials') setSocialLinks([...socialLinks, itemTemplate]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveEntityItem = async (entity: string, item: any) => {
    const method = item._id ? 'PUT' : 'POST';
    const res = await fetch(`/api/admin/${entity}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (res.ok) {
      showStatus(`${entity} saved!`);
      // Refresh list
      const refreshed = await fetch(`/api/admin/${entity}`);
      const data = await refreshed.json();
      if (data.data) {
        if (entity === 'skills') setSkills(data.data);
        if (entity === 'education') setEducation(data.data);
        if (entity === 'experience') setExperience(data.data);
        if (entity === 'projects') setProjects(data.data);
        if (entity === 'socials') setSocialLinks(data.data);
      }
    }
  };

  const deleteEntityItem = async (entity: string, id?: string, index?: number) => {
    if (id) {
      const res = await fetch(`/api/admin/${entity}?id=${id}`, { method: 'DELETE' });
      if (res.ok) showStatus(`${entity} item deleted.`);
    }
    if (entity === 'skills') setSkills(skills.filter((_, i) => i !== index));
    if (entity === 'education') setEducation(education.filter((_, i) => i !== index));
    if (entity === 'experience') setExperience(experience.filter((_, i) => i !== index));
    if (entity === 'projects') setProjects(projects.filter((_, i) => i !== index));
    if (entity === 'socials') setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const triggerStatsSync = async () => {
    showStatus('Syncing live stats from Codeforces & LeetCode...');
    const res = await fetch('/api/coding-stats?force=true');
    if (res.ok) showStatus('Stats updated & cached in MongoDB!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090e] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </div>
    );
  }

  const TABS = [
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'socials', label: 'Social Links', icon: Share2 },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'stats', label: 'Coding Stats Sync', icon: Trophy },
  ];

  return (
    <main className="min-h-screen bg-[#09090e] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase text-pink-400 tracking-wider">
              Management Portal
            </span>
            <h1 className="font-display text-3xl font-extrabold text-white">Admin Control Center</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </header>

        {/* Status Alert Toast */}
        {statusMsg && (
          <div className="mb-6 p-4 rounded-xl bg-violet-900/40 border border-violet-500/40 text-violet-200 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg'
                    : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <div className="glass-card p-6 sm:p-8">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl font-bold">Profile & Biography</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Designation</label>
                  <input
                    type="text"
                    value={profile.designation || ''}
                    onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">About Text</label>
                <textarea
                  rows={5}
                  value={profile.aboutText || ''}
                  onChange={(e) => setProfile({ ...profile, aboutText: e.target.value })}
                  className="w-full px-4 py-2.5 glass-input text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    value={profile.photoUrl || ''}
                    onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Resume File URL</label>
                  <input
                    type="text"
                    value={profile.resumeUrl || ''}
                    onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
              </div>
              <button
                onClick={saveProfile}
                className="gradient-pill-btn self-start text-xs font-semibold py-3 px-6 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Skills Catalog</h2>
                <button
                  onClick={() => addEntityItem('skills', { name: 'New Skill', category: 'Frontend', proficiency: 80, icon: 'Code2', order: skills.length + 1 })}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              <div className="space-y-4">
                {skills.map((skill, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => {
                        const copy = [...skills];
                        copy[idx].name = e.target.value;
                        setSkills(copy);
                      }}
                      placeholder="Skill Name"
                      className="px-3 py-2 glass-input text-xs"
                    />
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => {
                        const copy = [...skills];
                        copy[idx].category = e.target.value;
                        setSkills(copy);
                      }}
                      placeholder="Category"
                      className="px-3 py-2 glass-input text-xs"
                    />
                    <input
                      type="number"
                      value={skill.proficiency}
                      onChange={(e) => {
                        const copy = [...skills];
                        copy[idx].proficiency = parseInt(e.target.value) || 0;
                        setSkills(copy);
                      }}
                      placeholder="Proficiency %"
                      className="px-3 py-2 glass-input text-xs"
                    />
                    <input
                      type="text"
                      value={skill.icon || ''}
                      onChange={(e) => {
                        const copy = [...skills];
                        copy[idx].icon = e.target.value;
                        setSkills(copy);
                      }}
                      placeholder="Icon Name"
                      className="px-3 py-2 glass-input text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEntityItem('skills', skill)}
                        className="px-3 py-2 rounded-lg bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={() => deleteEntityItem('skills', skill._id, idx)}
                        className="p-2 rounded-lg bg-rose-600/30 text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Education Timeline</h2>
                <button
                  onClick={() => addEntityItem('education', { institution: 'University', degree: 'B.Sc.', field: 'CSE', startDate: '2021', endDate: '2025', details: 'Details...' })}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Education Entry
                </button>
              </div>

              <div className="space-y-6">
                {education.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={item.institution}
                        onChange={(e) => {
                          const copy = [...education];
                          copy[idx].institution = e.target.value;
                          setEducation(copy);
                        }}
                        placeholder="Institution"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(e) => {
                          const copy = [...education];
                          copy[idx].degree = e.target.value;
                          setEducation(copy);
                        }}
                        placeholder="Degree"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={item.field}
                        onChange={(e) => {
                          const copy = [...education];
                          copy[idx].field = e.target.value;
                          setEducation(copy);
                        }}
                        placeholder="Field of Study"
                        className="px-3 py-2 glass-input text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(e) => {
                          const copy = [...education];
                          copy[idx].startDate = e.target.value;
                          setEducation(copy);
                        }}
                        placeholder="Start Date"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={item.endDate}
                        onChange={(e) => {
                          const copy = [...education];
                          copy[idx].endDate = e.target.value;
                          setEducation(copy);
                        }}
                        placeholder="End Date"
                        className="px-3 py-2 glass-input text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={item.details}
                      onChange={(e) => {
                        const copy = [...education];
                        copy[idx].details = e.target.value;
                        setEducation(copy);
                      }}
                      placeholder="Details"
                      className="px-3 py-2 glass-input text-xs resize-none"
                    />
                    <div className="flex items-center gap-2 self-end">
                      <button
                        onClick={() => saveEntityItem('education', item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Entry
                      </button>
                      <button
                        onClick={() => deleteEntityItem('education', item._id, idx)}
                        className="p-1.5 rounded-lg bg-rose-600/30 text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Experience Timeline</h2>
                <button
                  onClick={() => addEntityItem('experience', { company: 'Company Name', role: 'Full-Stack Developer', location: 'Remote', startDate: '2024', endDate: 'Present', description: 'Description...' })}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Experience Entry
                </button>
              </div>

              <div className="space-y-6">
                {experience.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={item.company}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].company = e.target.value;
                          setExperience(copy);
                        }}
                        placeholder="Company"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].role = e.target.value;
                          setExperience(copy);
                        }}
                        placeholder="Role"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={item.location || ''}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].location = e.target.value;
                          setExperience(copy);
                        }}
                        placeholder="Location"
                        className="px-3 py-2 glass-input text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].startDate = e.target.value;
                          setExperience(copy);
                        }}
                        placeholder="Start Date"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={item.endDate}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].endDate = e.target.value;
                          setExperience(copy);
                        }}
                        placeholder="End Date"
                        className="px-3 py-2 glass-input text-xs"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => {
                        const copy = [...experience];
                        copy[idx].description = e.target.value;
                        setExperience(copy);
                      }}
                      placeholder="Role Description"
                      className="px-3 py-2 glass-input text-xs resize-none"
                    />
                    <div className="flex items-center gap-2 self-end">
                      <button
                        onClick={() => saveEntityItem('experience', item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Entry
                      </button>
                      <button
                        onClick={() => deleteEntityItem('experience', item._id, idx)}
                        className="p-1.5 rounded-lg bg-rose-600/30 text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold font-display">Projects Portfolio</h2>
                <button
                  onClick={() => addEntityItem('projects', { name: 'New Project', slug: `project-${Date.now()}`, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', teaser: 'Short teaser...', techStack: ['Next.js', 'TypeScript'], description: 'Full description...' })}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="space-y-8">
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => {
                            const copy = [...projects];
                            copy[idx].name = e.target.value;
                            setProjects(copy);
                          }}
                          className="w-full px-3 py-2 glass-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">Slug</label>
                        <input
                          type="text"
                          value={proj.slug}
                          onChange={(e) => {
                            const copy = [...projects];
                            copy[idx].slug = e.target.value;
                            setProjects(copy);
                          }}
                          className="w-full px-3 py-2 glass-input text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={proj.image}
                          onChange={(e) => {
                            const copy = [...projects];
                            copy[idx].image = e.target.value;
                            setProjects(copy);
                          }}
                          className="w-full px-3 py-2 glass-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || ''}
                          onChange={(e) => {
                            const copy = [...projects];
                            copy[idx].techStack = e.target.value.split(',').map((s: string) => s.trim());
                            setProjects(copy);
                          }}
                          className="w-full px-3 py-2 glass-input text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">Teaser</label>
                      <input
                        type="text"
                        value={proj.teaser}
                        onChange={(e) => {
                          const copy = [...projects];
                          copy[idx].teaser = e.target.value;
                          setProjects(copy);
                        }}
                        className="w-full px-3 py-2 glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">Full Description</label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => {
                          const copy = [...projects];
                          copy[idx].description = e.target.value;
                          setProjects(copy);
                        }}
                        className="w-full px-3 py-2 glass-input text-xs resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={proj.liveUrl || ''}
                        onChange={(e) => {
                          const copy = [...projects];
                          copy[idx].liveUrl = e.target.value;
                          setProjects(copy);
                        }}
                        placeholder="Live Demo URL"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={proj.githubUrl || ''}
                        onChange={(e) => {
                          const copy = [...projects];
                          copy[idx].githubUrl = e.target.value;
                          setProjects(copy);
                        }}
                        placeholder="GitHub URL"
                        className="px-3 py-2 glass-input text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={proj.challenges || ''}
                        onChange={(e) => {
                          const copy = [...projects];
                          copy[idx].challenges = e.target.value;
                          setProjects(copy);
                        }}
                        placeholder="Challenges Faced"
                        className="px-3 py-2 glass-input text-xs"
                      />
                      <input
                        type="text"
                        value={proj.futureImprovements || ''}
                        onChange={(e) => {
                          const copy = [...projects];
                          copy[idx].futureImprovements = e.target.value;
                          setProjects(copy);
                        }}
                        placeholder="Future Improvements"
                        className="px-3 py-2 glass-input text-xs"
                      />
                    </div>

                    <div className="flex items-center gap-2 self-end mt-2">
                      <button
                        onClick={() => saveEntityItem('projects', proj)}
                        className="px-4 py-2 rounded-xl bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" /> Save Project
                      </button>
                      <button
                        onClick={() => deleteEntityItem('projects', proj._id, idx)}
                        className="p-2 rounded-xl bg-rose-600/30 text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOCIALS TAB */}
          {activeTab === 'socials' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Social Links</h2>
                <button
                  onClick={() => addEntityItem('socials', { platform: 'GitHub', url: 'https://github.com' })}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Social
                </button>
              </div>

              <div className="space-y-4">
                {socialLinks.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                    <input
                      type="text"
                      value={item.platform}
                      onChange={(e) => {
                        const copy = [...socialLinks];
                        copy[idx].platform = e.target.value;
                        setSocialLinks(copy);
                      }}
                      placeholder="Platform"
                      className="px-3 py-2 glass-input text-xs"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => {
                        const copy = [...socialLinks];
                        copy[idx].url = e.target.value;
                        setSocialLinks(copy);
                      }}
                      placeholder="URL"
                      className="px-3 py-2 glass-input text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEntityItem('socials', item)}
                        className="px-3 py-2 rounded-lg bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={() => deleteEntityItem('socials', item._id, idx)}
                        className="p-2 rounded-lg bg-rose-600/30 text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl font-bold">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={contact.email || ''}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={contact.phone || ''}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={contact.whatsapp || ''}
                    onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 glass-input text-sm"
                  />
                </div>
              </div>
              <button
                onClick={saveContact}
                className="gradient-pill-btn self-start text-xs font-semibold py-3 px-6 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Details</span>
              </button>
            </div>
          )}

          {/* STATS TAB */}
          {activeTab === 'stats' && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold">Competitive Programming Stats Sync</h2>
              <p className="text-sm text-gray-300">
                Trigger an immediate background refresh of Codeforces and LeetCode profile ratings, rankings, and problem breakdown metrics.
              </p>
              <button
                onClick={triggerStatsSync}
                className="gradient-pill-btn self-start text-xs font-semibold py-3.5 px-6 flex items-center gap-2 mt-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Trigger Manual Sync Now</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
