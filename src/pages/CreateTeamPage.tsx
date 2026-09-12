import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { teamService } from '../services/teams';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { MultiSelect } from '../components/ui/MultiSelect';
import { ALL_DOMAINS } from '../types';
import { MOCK_HACKATHONS } from '../data/hackathons';

export default function CreateTeamPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    hackathonId: '',
    maxSize: 4,
    domains: [] as string[],
    lookingFor: [] as string[],
    isOpen: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Team name is required';
    if (!form.hackathonId) e.hackathonId = 'Select a hackathon';
    if (form.domains.length === 0) e.domains = 'Select at least one domain';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!user) return;
    setLoading(true);
    try {
      await teamService.create({ ...form, leaderId: user.id, leaderName: user.fullName });
      success('Team Created!', `"${form.name}" is now live. Invite teammates!`);
      navigate('/my/teams');
    } catch {
      toastError('Failed to create team', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-nexzen-text mb-2">Create a <span className="gradient-text">Team</span></h1>
          <p className="text-nexzen-muted mb-8">Set up your team profile and start looking for members.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <h2 className="font-bold text-nexzen-text">Team Details</h2>
              <Input label="Team Name" value={form.name} onChange={(e) => set('name', e.target.value)} error={errors.name} required placeholder="Team Phoenix" />
              <Textarea label="Description" value={form.description} onChange={(e) => set('description', e.target.value)}
                placeholder="What are you building? What kind of teammates are you looking for?" hint="Be specific to attract the right members" />
              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Hackathon <span className="text-nexzen-accent">*</span></label>
                <select value={form.hackathonId} onChange={(e) => set('hackathonId', e.target.value)}
                  className={`input-base appearance-none ${errors.hackathonId ? 'border-red-500/50' : ''}`}>
                  <option value="">Select a hackathon</option>
                  {MOCK_HACKATHONS.filter((h) => h.registrationStatus !== 'closed').map((h) => (
                    <option key={h.id} value={h.id} className="bg-nexzen-surface">{h.name}</option>
                  ))}
                </select>
                {errors.hackathonId && <p className="text-xs text-red-400 mt-1">{errors.hackathonId}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Maximum Team Size</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button type="button" key={n} onClick={() => set('maxSize', n)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${form.maxSize === n ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'glass border-white/10 text-nexzen-muted hover:text-nexzen-text'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <h2 className="font-bold text-nexzen-text">Skills & Domains</h2>
              <MultiSelect label="Team Domains (select up to 4)" options={[...ALL_DOMAINS]} selected={form.domains}
                onChange={(v) => set('domains', v)} max={4} error={errors.domains} />
              <MultiSelect label="Looking For (roles/skills)" options={['Frontend Developer', 'Backend Developer', 'ML Engineer', 'UI/UX Designer', 'Android Developer', 'DevOps Engineer', 'Data Scientist']}
                selected={form.lookingFor} onChange={(v) => set('lookingFor', v)} allowCustom
                placeholder="Add a role (e.g. Flutter Dev)..." />
            </div>

            <div className="glass rounded-2xl border border-white/8 p-6">
              <h2 className="font-bold text-nexzen-text mb-3">Team Visibility</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => set('isOpen', !form.isOpen)}
                  className={`w-12 h-6 rounded-full transition-all relative ${form.isOpen ? 'bg-nexzen-accent' : 'bg-white/15'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${form.isOpen ? 'left-6' : 'left-0.5'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-nexzen-text">{form.isOpen ? 'Open for applications' : 'Closed'}</p>
                  <p className="text-xs text-nexzen-muted">{form.isOpen ? 'Other students can request to join your team' : 'Only invited members can join'}</p>
                </div>
              </label>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={<Users size={16} />}>
              {loading ? 'Creating Team...' : 'Create Team'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

