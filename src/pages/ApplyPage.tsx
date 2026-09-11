import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Github, Linkedin, Instagram, Youtube, Globe, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { applicationService } from '../services/applications';
import { hackathonService } from '../services/hackathons';
import { Stepper } from '../components/ui/Stepper';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { FileUpload } from '../components/ui/FileUpload';
import { MultiSelect } from '../components/ui/MultiSelect';
import { ALL_DOMAINS, ALL_COURSES } from '../types';
import type { Hackathon } from '../types';
import { cn, formatDate } from '../utils';

const STEPS = [
  { label: 'Personal Info' },
  { label: 'Education' },
  { label: 'Skills & Domain' },
  { label: 'Portfolio' },
  { label: 'Resume' },
  { label: 'Review & Submit' },
];

interface FormData {
  fullName: string; email: string; mobile: string; gender: string; dob: string;
  college: string; course: string; branch: string; degree: string; year: string; gradYear: string; city: string; state: string;
  domains: string[]; skills: string[];
  github: string; linkedin: string; instagram: string; youtube: string; portfolio: string;
  projects: { name: string; url: string }[];
  resume: File | null;
}

const INIT: FormData = {
  fullName: '', email: '', mobile: '', gender: '', dob: '',
  college: '', course: '', branch: '', degree: '', year: '', gradYear: '', city: '', state: '',
  domains: [], skills: [],
  github: '', linkedin: '', instagram: '', youtube: '', portfolio: '',
  projects: [],
  resume: null,
};

export default function ApplyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...INIT, fullName: user?.fullName || '', email: user?.email || '', mobile: user?.mobile || '', college: user?.college || '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState(`APP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

  useEffect(() => {
    if (slug) hackathonService.getById(slug).then((h) => { if (!h) navigate('/hackathons'); else setHackathon(h); });
  }, [slug, navigate]);

  const set = (k: keyof FormData, v: any) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.fullName) e.fullName = 'Required';
      if (!form.email) e.email = 'Required';
      if (!form.mobile) e.mobile = 'Required';
      if (!form.gender) e.gender = 'Required';
    }
    if (step === 1) {
      if (!form.college) e.college = 'Required';
      if (!form.course) e.course = 'Required';
      if (!form.year) e.year = 'Required';
    }
    if (step === 2) {
      if (form.domains.length === 0) e.domains = 'Select at least one domain';
    }
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!user || !hackathon) return;
    setSubmitting(true);
    try {
      await applicationService.submit(user.id, hackathon.id, hackathon.name, hackathon.logo, form as any);
      setSubmitted(true);
      success('Application Submitted!', 'Your application has been received.');
    } catch {
      toastError('Submission failed', 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-nexzen-bg flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-extrabold gradient-text mb-2">Application Submitted!</h1>
          <p className="text-nexzen-muted mb-2">Your application ID: <code className="bg-white/10 px-2 py-0.5 rounded text-nexzen-accent">{appId}</code></p>
          <p className="text-nexzen-subtle text-sm mb-8">We'll notify you about your application status via email.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={() => navigate('/my/applications')}>Track Application</Button>
            <Button variant="secondary" onClick={() => navigate('/hackathons')}>More Hackathons</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Header with hackathon info */}
        {hackathon && (
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl text-nexzen-muted hover:text-nexzen-text hover:bg-white/8 transition-all">
              <ArrowLeft size={18} />
            </button>
            <img src={hackathon.logo} alt={hackathon.name} className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <h2 className="font-bold text-nexzen-text text-sm">{hackathon.name}</h2>
              <p className="text-xs text-nexzen-muted">Deadline: {formatDate(hackathon.registrationDeadline)}</p>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-extrabold text-nexzen-text mb-6">Apply to <span className="gradient-text">{hackathon?.name}</span></h1>

        {/* Stepper */}
        <Stepper steps={STEPS} currentStep={step} className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <div className="glass rounded-2xl border border-white/8 p-6 space-y-4">
                  <h2 className="font-bold text-nexzen-text text-lg">{STEPS[step].label}</h2>

                  {step === 0 && <>
                    <Input label="Full Name" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} error={errors.fullName} required />
                    <Input label="Email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} error={errors.email} required />
                    <Input label="Mobile Number" value={form.mobile} onChange={(e) => set('mobile', e.target.value)} error={errors.mobile} required />
                    <div>
                      <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Gender <span className="text-nexzen-accent">*</span></label>
                      <select value={form.gender} onChange={(e) => set('gender', e.target.value)}
                        className={cn('input-base appearance-none', errors.gender && 'border-red-500/50')}>
                        <option value="">Select gender</option>
                        {['Male', 'Female', 'Other', 'Prefer not to say'].map((g) => <option key={g} value={g} className="bg-nexzen-surface">{g}</option>)}
                      </select>
                      {errors.gender && <p className="text-xs text-red-400 mt-1">{errors.gender}</p>}
                    </div>
                    <Input label="Date of Birth" type="date" value={form.dob} onChange={(e) => set('dob', e.target.value)} />
                  </>}

                  {step === 1 && <>
                    <Input label="College / Institute" value={form.college} onChange={(e) => set('college', e.target.value)} error={errors.college} required placeholder="IIT Bombay" />
                    <div>
                      <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Course <span className="text-nexzen-accent">*</span></label>
                      <select value={form.course} onChange={(e) => set('course', e.target.value)} className={cn('input-base appearance-none', errors.course && 'border-red-500/50')}>
                        <option value="">Select course</option>
                        {ALL_COURSES.map((c) => <option key={c} value={c} className="bg-nexzen-surface">{c}</option>)}
                      </select>
                      {errors.course && <p className="text-xs text-red-400 mt-1">{errors.course}</p>}
                    </div>
                    <Input label="Branch / Specialization" value={form.branch} onChange={(e) => set('branch', e.target.value)} placeholder="Computer Science Engineering" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Current Year <span className="text-nexzen-accent">*</span></label>
                        <select value={form.year} onChange={(e) => set('year', e.target.value)} className={cn('input-base appearance-none', errors.year && 'border-red-500/50')}>
                          <option value="">Select year</option>
                          {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'PG', 'Alumni'].map((y) => <option key={y} value={y} className="bg-nexzen-surface">{y}</option>)}
                        </select>
                      </div>
                      <Input label="City" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Mumbai" />
                    </div>
                  </>}

                  {step === 2 && <>
                    <MultiSelect label="Domains (select up to 5)" options={[...ALL_DOMAINS]} selected={form.domains}
                      onChange={(v) => set('domains', v)} max={5} error={errors.domains} hint="Select domains relevant to this hackathon" />
                    <MultiSelect label="Skills" options={['React', 'Node.js', 'Python', 'TensorFlow', 'Flutter', 'Java', 'C++', 'ML', 'UI/UX', 'Figma']}
                      selected={form.skills} onChange={(v) => set('skills', v)} allowCustom placeholder="Add a skill (e.g. React, PyTorch)..." />
                  </>}

                  {step === 3 && <>
                    <p className="text-xs text-nexzen-muted">All fields are optional but help you stand out.</p>
                    {[
                      { key: 'github', icon: <Github size={15} />, label: 'GitHub URL', placeholder: 'https://github.com/username' },
                      { key: 'linkedin', icon: <Linkedin size={15} />, label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/username' },
                      { key: 'instagram', icon: <Instagram size={15} />, label: 'Instagram URL', placeholder: 'https://instagram.com/username' },
                      { key: 'youtube', icon: <Youtube size={15} />, label: 'YouTube URL', placeholder: 'https://youtube.com/channel/...' },
                      { key: 'portfolio', icon: <Globe size={15} />, label: 'Portfolio Website', placeholder: 'https://yoursite.com' },
                    ].map(({ key, icon, label, placeholder }) => (
                      <div key={key} className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle z-10 mt-3">{icon}</div>
                        <Input label={label} value={(form as any)[key]} onChange={(e) => set(key as any, e.target.value)} placeholder={placeholder} className="pl-10" />
                      </div>
                    ))}

                    {/* Live projects */}
                    <div>
                      <p className="text-sm font-medium text-nexzen-muted mb-2">Live Project Links</p>
                      <div className="space-y-3">
                        {form.projects.map((p, i) => (
                          <div key={i} className="flex gap-2">
                            <input value={p.name} onChange={(e) => { const ps = [...form.projects]; ps[i] = { ...ps[i], name: e.target.value }; set('projects', ps); }}
                              placeholder="Project name" className="input-base flex-1 text-sm py-2.5" />
                            <input value={p.url} onChange={(e) => { const ps = [...form.projects]; ps[i] = { ...ps[i], url: e.target.value }; set('projects', ps); }}
                              placeholder="https://..." className="input-base flex-1 text-sm py-2.5" />
                            <button onClick={() => set('projects', form.projects.filter((_, j) => j !== i))}
                              className="p-2.5 rounded-xl text-nexzen-subtle hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all">
                              <X size={15} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => set('projects', [...form.projects, { name: '', url: '' }])}
                          className="flex items-center gap-2 text-sm text-nexzen-accent hover:underline">
                          <Plus size={14} />Add Project Link
                        </button>
                      </div>
                    </div>
                  </>}

                  {step === 4 && <>
                    <FileUpload label="Resume / CV" accept=".pdf" maxSize={5 * 1024 * 1024}
                      value={form.resume} onChange={(f) => set('resume', f)}
                      hint="PDF only · Max 5MB" />
                  </>}

                  {step === 5 && (
                    <div className="space-y-4">
                      <div className="glass rounded-xl border border-white/8 p-4">
                        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-2">Personal Info</p>
                        <p className="text-sm text-nexzen-text font-medium">{form.fullName}</p>
                        <p className="text-xs text-nexzen-muted">{form.email} · {form.mobile}</p>
                      </div>
                      <div className="glass rounded-xl border border-white/8 p-4">
                        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-2">Education</p>
                        <p className="text-sm text-nexzen-text font-medium">{form.college}</p>
                        <p className="text-xs text-nexzen-muted">{form.course} · {form.branch} · {form.year}</p>
                      </div>
                      <div className="glass rounded-xl border border-white/8 p-4">
                        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-2">Domains</p>
                        <div className="flex flex-wrap gap-1.5">{form.domains.map((d) => <span key={d} className="px-2 py-0.5 rounded-full bg-nexzen-accent/15 text-nexzen-accent text-xs border border-nexzen-accent/30">{d}</span>)}</div>
                      </div>
                      {form.resume && (
                        <div className="glass rounded-xl border border-green-500/30 p-4">
                          <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-1">Resume</p>
                          <p className="text-sm text-nexzen-text">{form.resume.name}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 0 && <Button variant="secondary" size="lg" icon={<ArrowLeft size={16} />} onClick={() => setStep((s) => s - 1)}>Back</Button>}
              {step < STEPS.length - 1 ? (
                <Button variant="primary" size="lg" fullWidth iconRight={<ArrowRight size={16} />} onClick={handleNext}>Continue</Button>
              ) : (
                <Button variant="primary" size="lg" fullWidth loading={submitting} icon={<CheckCircle size={16} />} onClick={handleSubmit}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </div>

          {/* Hackathon info sidebar */}
          {hackathon && (
            <aside className="hidden lg:block h-fit glass rounded-2xl border border-white/8 p-5 sticky top-24">
              <img src={hackathon.logo} alt={hackathon.name} className="w-14 h-14 rounded-xl mb-3 object-cover" />
              <h3 className="font-bold text-nexzen-text text-sm">{hackathon.name}</h3>
              <p className="text-xs text-nexzen-muted mt-1 mb-4">{hackathon.organizer}</p>
              <div className="space-y-2 text-xs text-nexzen-muted">
                <p>🏆 Prize Pool: <span className="text-nexzen-accent font-semibold">{hackathon.prizePool}</span></p>
                <p>📅 Deadline: {formatDate(hackathon.registrationDeadline)}</p>
                <p>👥 Team: {hackathon.minTeamSize}–{hackathon.maxTeamSize} members</p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
