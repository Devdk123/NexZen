import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { isValidEmail } from '../utils';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Required';
    if (!form.email || !isValidEmail(form.email)) errs.email = 'Valid email required';
    if (!form.subject) errs.subject = 'Required';
    if (!form.message) errs.message = 'Required';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-3">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-nexzen-muted max-w-xl mx-auto">Have a question, partnership inquiry, or just want to say hi? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: 'Email', value: 'hello@nexzen.in', href: 'mailto:hello@nexzen.in' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: MapPin, label: 'Location', value: 'Mumbai, India', href: null },
            ].map((c) => (
              <div key={c.label} className="glass rounded-2xl border border-white/8 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-nexzen-accent/15 flex items-center justify-center flex-shrink-0">
                  <c.icon size={18} className="text-nexzen-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm text-nexzen-text hover:text-nexzen-accent transition-colors">{c.value}</a>
                  ) : (
                    <p className="text-sm text-nexzen-text">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="glass rounded-2xl border border-white/8 p-5">
              <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Quick Links</p>
              <div className="space-y-2 text-sm">
                {[['For Hackathon Organizers', 'partnerships@nexzen.in'], ['For Sponsors', 'sponsors@nexzen.in'], ['For Press', 'press@nexzen.in'], ['For Bugs / Issues', 'support@nexzen.in']].map(([label, email]) => (
                  <div key={label}>
                    <p className="text-nexzen-subtle text-xs">{label}</p>
                    <a href={`mailto:${email}`} className="text-nexzen-accent text-xs hover:underline">{email}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl border border-green-500/30 p-10 text-center">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-nexzen-text mb-2">Message Sent!</h2>
                <p className="text-nexzen-muted">We'll get back to you within 24 hours. Promise.</p>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl border border-white/8 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare size={20} className="text-nexzen-accent" />
                  <h2 className="font-bold text-nexzen-text">Send a Message</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" value={form.name} onChange={(e) => set('name', e.target.value)} error={errors.name} required />
                    <Input label="Email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} error={errors.email} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-nexzen-muted block mb-1.5">Subject <span className="text-nexzen-accent">*</span></label>
                    <select value={form.subject} onChange={(e) => set('subject', e.target.value)}
                      className={`input-base appearance-none ${errors.subject ? 'border-red-500/50' : ''}`}>
                      <option value="">Select a subject</option>
                      {['General Inquiry', 'Partnership / Sponsorship', 'List a Hackathon', 'Bug Report', 'Feature Request', 'Press Inquiry', 'Other'].map((s) => (
                        <option key={s} value={s} className="bg-nexzen-surface">{s}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                  </div>
                  <Textarea label="Message" value={form.message} onChange={(e) => set('message', e.target.value)} error={errors.message} required rows={5} placeholder="Tell us what's on your mind..." />
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={<Send size={16} />}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

