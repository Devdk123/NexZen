import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { MultiSelect } from '../components/ui/MultiSelect';
import { ALL_DOMAINS, ALL_COURSES } from '../types';
import { Save } from 'lucide-react';

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    mobile: user?.mobile || '',
    college: user?.college || '',
    course: user?.course || '',
    branch: user?.branch || '',
    currentYear: user?.currentYear || '',
    graduationYear: user?.graduationYear?.toString() || '',
    city: user?.city || '',
    state: user?.state || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    instagram: user?.instagram || '',
    youtube: user?.youtube || '',
    portfolio: user?.portfolio || '',
    domains: user?.domains || [],
    skills: user?.skills || [],
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      updateUser({
        fullName: form.fullName,
        bio: form.bio,
        mobile: form.mobile,
        college: form.college,
        course: form.course as any,
        branch: form.branch,
        currentYear: form.currentYear as any,
        graduationYear: parseInt(form.graduationYear) || undefined,
        city: form.city,
        state: form.state,
        github: form.github,
        linkedin: form.linkedin,
        instagram: form.instagram,
        youtube: form.youtube,
        portfolio: form.portfolio,
        domains: form.domains as any,
        skills: form.skills,
      });
      success('Profile saved!', 'Your changes have been saved.');
      navigate(`/profile/${user?.id}`);
    } catch {
      toastError('Failed to save', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-nexzen-text mb-2">Edit <span className="gradient-text">Profile</span></h1>
          <p className="text-nexzen-muted mb-8">Keep your profile up to date to attract the best teams and opportunities.</p>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Personal */}
            <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <h2 className="font-bold text-nexzen-text">Personal Information</h2>
              <Input label="Full Name" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} required />
              <Input label="Mobile Number" value={form.mobile} onChange={(e) => set('mobile', e.target.value)} placeholder="+91 98765 43210" />
              <Textarea label="Bio" value={form.bio} onChange={(e) => set('bio', e.target.value)} placeholder="Tell the world about yourself..." hint="Max 300 characters" />
            </div>

            {/* Education */}
            <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <h2 className="font-bold text-nexzen-text">Education</h2>
              <Input label="College / Institute" value={form.college} onChange={(e) => set('college', e.target.value)} placeholder="IIT Bombay" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Course</label>
                  <select value={form.course} onChange={(e) => set('course', e.target.value)}
                    className="input-base appearance-none">
                    <option value="">Select course</option>
                    {ALL_COURSES.map((c) => <option key={c} value={c} className="bg-nexzen-surface">{c}</option>)}
                  </select>
                </div>
                <Input label="Branch / Specialization" value={form.branch} onChange={(e) => set('branch', e.target.value)} placeholder="Computer Science" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Current Year</label>
                  <select value={form.currentYear} onChange={(e) => set('currentYear', e.target.value)} className="input-base appearance-none">
                    {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'PG', 'Alumni'].map((y) => <option key={y} value={y} className="bg-nexzen-surface">{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Graduation Year</label>
                  <select value={form.graduationYear} onChange={(e) => set('graduationYear', e.target.value)} className="input-base appearance-none">
                    {[2024,2025,2026,2027,2028,2029,2030].map((y) => <option key={y} value={y} className="bg-nexzen-surface">{y}</option>)}
                  </select>
                </div>
                <Input label="City" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Mumbai" />
              </div>
            </div>

            {/* Skills */}
            <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <h2 className="font-bold text-nexzen-text">Skills & Domains</h2>
              <MultiSelect label="Domains (max 5)" options={[...ALL_DOMAINS]} selected={form.domains} onChange={(v) => set('domains', v)} max={5} />
              <MultiSelect label="Skills" options={['React', 'Node.js', 'Python', 'TensorFlow', 'Flutter', 'Java', 'C++', 'UI/UX']}
                selected={form.skills} onChange={(v) => set('skills', v)} allowCustom placeholder="Add a skill..." />
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <h2 className="font-bold text-nexzen-text">Social Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="GitHub URL" value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/username" />
                <Input label="LinkedIn URL" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
                <Input label="Instagram URL" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/username" />
                <Input label="YouTube URL" value={form.youtube} onChange={(e) => set('youtube', e.target.value)} placeholder="https://youtube.com/channel/..." />
                <Input label="Portfolio Website" value={form.portfolio} onChange={(e) => set('portfolio', e.target.value)} placeholder="https://yourportfolio.com" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary" size="lg" loading={saving} icon={<Save size={16} />}>
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
