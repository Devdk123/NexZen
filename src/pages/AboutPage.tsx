import { motion } from 'framer-motion';
import { Zap, Target, Users, Globe, Code2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AnimatedCounter } from '../components/landing/AnimatedCounter';

const TEAM = [
  { name: 'Aditya Kumar', role: 'Founder & CEO', avatar: 'AK', description: 'Ex-SDE at Amazon. Built this platform after struggling to find hackathon teams at IIT Delhi.' },
  { name: 'Priya Sharma', role: 'Co-Founder & CTO', avatar: 'PS', description: 'Full-stack engineer. 3x hackathon winner. Passionate about building tools that empower students.' },
  { name: 'Rohan Singh', role: 'Head of Product', avatar: 'RS', description: 'UX researcher at heart. Talks to 100+ students a month to understand their pain points.' },
  { name: 'Nisha Patel', role: 'Head of Community', avatar: 'NP', description: 'Built student communities at 5 top engineering colleges. Knows every hackathon organizer personally.' },
];

const VALUES = [
  { icon: Target, title: 'Student First', description: 'Every decision we make starts with one question: does this help the student innovator?' },
  { icon: Users, title: 'Community Driven', description: 'NEXZEN is built with and for the student community. Your feedback shapes every feature.' },
  { icon: Code2, title: 'Open Innovation', description: 'We believe in open access to opportunities. No paywalls, no barriers — just pure innovation.' },
  { icon: Heart, title: 'Passion Led', description: 'We are students who have lived this problem. This is personal for us.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg bg-dots">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center shadow-glow">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-2xl font-black gradient-text">NEXZEN</span>
          </div>
          <h1 className="text-5xl font-extrabold text-nexzen-text mb-6">
            Built by students,<br /><span className="gradient-text">for students.</span>
          </h1>
          <p className="text-nexzen-muted text-lg max-w-2xl mx-auto leading-relaxed">
            We were frustrated students who missed deadlines, couldn't find team members, and had no single place to discover opportunities.
            So we built NEXZEN — India's premier platform for student innovators.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {[
            { label: 'Active Students', value: 1000000, suffix: '+', format: true },
            { label: 'Hackathons Listed', value: 500, suffix: '+' },
            { label: 'Teams Formed', value: 50000, suffix: '+', format: true },
            { label: 'Colleges', value: 500, suffix: '+' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl border border-white/8 p-5 text-center">
              <p className="text-2xl font-extrabold gradient-text"><AnimatedCounter target={s.value} suffix={s.suffix} format={s.format} /></p>
              <p className="text-xs text-nexzen-muted mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl border border-nexzen-accent/20 p-10 mb-20">
          <Globe size={32} className="text-nexzen-accent mb-4" />
          <h2 className="text-3xl font-extrabold text-nexzen-text mb-4">Our Mission</h2>
          <p className="text-nexzen-muted text-lg leading-relaxed max-w-3xl">
            To democratize access to innovation opportunities for every student in India — regardless of their college tier, city, or background.
            A student from a Tier-3 college with the right skills and the right team should have equal access to opportunities as anyone from an IIT.
            That's the world NEXZEN is building.
          </p>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-nexzen-text text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl border border-white/8 p-6">
                <v.icon size={24} className="text-nexzen-accent mb-3" />
                <h3 className="font-bold text-nexzen-text mb-2">{v.title}</h3>
                <p className="text-nexzen-muted text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-nexzen-text text-center mb-10">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl border border-white/8 p-6 flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                  {m.avatar}
                </div>
                <div>
                  <p className="font-bold text-nexzen-text">{m.name}</p>
                  <p className="text-xs text-nexzen-accent mb-2">{m.role}</p>
                  <p className="text-xs text-nexzen-muted leading-relaxed">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl font-extrabold text-nexzen-text mb-3">Ready to join the movement?</h2>
          <p className="text-nexzen-muted mb-6">Join 1M+ student innovators building India's future.</p>
          <Link to="/signup"><Button variant="primary" size="xl" glow>Get Started for Free</Button></Link>
        </motion.div>
      </div>
    </div>
  );
}

