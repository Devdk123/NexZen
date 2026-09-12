import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
} from 'framer-motion';
import {
  ArrowRight,
  Trophy,
  Users,
  Zap,
  Search,
  UserCheck,
  Code2,
  Rocket,
  Star,
  Globe,
  ChevronRight,
  Sparkles,
  Bell,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AnimatedCounter } from '../components/landing/AnimatedCounter';
import HeroScene from '../HeroScene';

import { cn } from '../utils';
import type { Hackathon, Event, Domain } from '../types';
import { ALL_DOMAINS } from '../types';

// ─── Animation Variants ──────────────────────────────────────────────────────

const easeCurve = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeCurve, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardEntry = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeCurve },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { label: 'Launching Soon', value: 1, suffix: 'st Hackathon', prefix: '' },
  { label: 'Open For', value: 0, suffix: ' Registrations', prefix: '' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Search,
    title: 'Discover',
    description: 'Find hackathons and tech events that match your interests, domain, and skill level — curated just for you.',
    color: 'from-nexzen-accent/20 to-nexzen-accent/5',
    iconColor: 'text-nexzen-accent',
    border: 'border-nexzen-accent/20',
  },
  {
    step: '02',
    icon: UserCheck,
    title: 'Build',
    description: 'Create your student profile, showcase your skills, link your projects, and let the world see what you can do.',
    color: 'from-nexzen-violet/20 to-nexzen-violet/5',
    iconColor: 'text-nexzen-violet',
    border: 'border-nexzen-violet/20',
  },
  {
    step: '03',
    icon: Users,
    title: 'Team Up',
    description: 'Participate solo or create/join a team. Find teammates with complementary skills from across India.',
    color: 'from-nexzen-cyan/20 to-nexzen-cyan/5',
    iconColor: 'text-nexzen-cyan',
    border: 'border-nexzen-cyan/20',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Compete',
    description: 'Apply, build your solution, submit your project, and track your entire journey — all from one dashboard.',
    color: 'from-nexzen-pink/20 to-nexzen-pink/5',
    iconColor: 'text-nexzen-pink',
    border: 'border-pink-500/20',
  },
];

const WHY_NEXZEN = [
  {
    icon: Zap,
    title: 'All Hackathons, One Platform',
    description: 'Stop hunting across 10 sites. NEXZEN aggregates every major Indian student hackathon in one place.',
    gradient: 'from-nexzen-accent to-nexzen-violet',
  },
  {
    icon: Users,
    title: 'Smart Team Matching',
    description: 'Our algorithm matches you with teammates who have the skills you need — frontend, backend, ML, design.',
    gradient: 'from-nexzen-violet to-nexzen-cyan',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Journey',
    description: 'Applications, submissions, results — track every hackathon journey with real-time status updates.',
    gradient: 'from-nexzen-cyan to-nexzen-accent',
  },
  {
    icon: Award,
    title: 'Showcase Your Work',
    description: 'Build a living portfolio of hackathon projects, wins, and recognitions that recruiters actually notice.',
    gradient: 'from-nexzen-accent to-nexzen-pink',
  },
  {
    icon: Bell,
    title: 'Never Miss a Deadline',
    description: 'Smart notifications remind you of registration deadlines, submission dates, and result announcements.',
    gradient: 'from-nexzen-pink to-nexzen-violet',
  },
  {
    icon: Globe,
    title: 'National Community',
    description: 'Connect with student innovators across India. Your tribe is here.',
    gradient: 'from-nexzen-violet to-nexzen-accent',
  },
];

const TESTIMONIALS: never[] = [];

const COMMUNITY_PARTNERS: string[] = [];

const SPONSORS: { name: string; color: string }[] = [];

const DOMAIN_ICONS: Record<Domain, string> = {
  'Web Development': '🌐',
  'App Development': '📱',
  'AI/ML': '🤖',
  'Data Science': '📊',
  'Cybersecurity': '🔐',
  'IoT': '📡',
  'Blockchain': '⛓️',
  'Cloud Computing': '☁️',
  'UI/UX': '🎨',
  'Game Development': '🎮',
  'Robotics': '🦾',
  'Embedded Systems': '🔌',
  'AR/VR': '🥽',
  'DevOps': '⚙️',
  'Software Development': '💻',
  'Other': '✨',
};



// ─── Section Wrapper ─────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={cn('mb-12', center && 'text-center')}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className={cn('flex items-center gap-2 mb-4', center && 'justify-center')}>
          <Sparkles size={14} className="text-nexzen-accent" />
          <span className="text-xs font-semibold tracking-widest uppercase text-nexzen-accent">{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className={cn('text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-nexzen-text', center && 'mx-auto')}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-4 text-nexzen-muted text-base md:text-lg max-w-2xl leading-relaxed',
            center && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg overflow-x-hidden">
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. HOW IT WORKS ────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── 3. DOMAINS ─────────────────────────────────────────────── */}
      <DomainsSection />

      {/* ── 4. WHY NEXZEN ──────────────────────────────────────────── */}
      <WhyNexzenSection />

      {/* ── 5. CTA ────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#080B14' }}
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Text ko readable rakhne ke liye gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 25%, rgba(4,12,26,0.6) 100%)'
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col"
          >
            {/* Eyebrow pill */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong border border-nexzen-accent/30 text-xs font-semibold text-nexzen-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-nexzen-accent animate-pulse" />
                India's Newest Student Innovation Platform
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
            >
              <span className="gradient-text">Discover.</span>{' '}
              <span className="text-nexzen-text">Build.</span>
              <br />
              <span className="text-nexzen-text">Compete.</span>{' '}
              <span className="gradient-text">Innovate.</span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-nexzen-muted leading-relaxed max-w-lg"
            >
              India's upcoming platform for student hackathons, innovation challenges, and tech events. Be among the first to join.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 items-center">
              <Link to="/hackathons">
                <Button
                  variant="primary"
                  size="xl"
                  glow
                  iconRight={<ArrowRight size={20} />}
                >
                  Explore Hackathons
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="glass" size="xl">
                  Create Your Profile
                </Button>
              </Link>
            </motion.div>

            {/* Hero stats row */}
            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-5"
            >
              {HERO_STATS.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-extrabold gradient-text">
                    <AnimatedCounter
                      target={s.value}
                      suffix={s.suffix}
                      prefix={s.prefix}
                      format={s.format}
                    />
                  </span>
                  <span className="text-xs text-nexzen-muted mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side removed to prevent confusion with skeleton loading */}
        </div>

        {/* Mobile: hero stats full row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-4 lg:hidden"
        >
          {HERO_STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl px-4 py-3 border border-white/8 text-center min-w-[100px]">
              <span className="text-lg font-extrabold gradient-text block">
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  format={s.format}
                />
              </span>
              <span className="text-[10px] text-nexzen-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-nexzen-subtle tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-nexzen-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}



// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-nexzen-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="How It Works"
          title={<>From Zero to <span className="gradient-text">Hackathon Hero</span></>}
          subtitle="Four simple steps to start competing, building, and winning on NEXZEN."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line — desktop */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-nexzen-accent/30 via-nexzen-violet/30 to-nexzen-cyan/30 hidden lg:block pointer-events-none" />

          {HOW_IT_WORKS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: easeCurve }}
                className={cn(
                  'glass rounded-2xl p-6 border relative overflow-hidden group',
                  item.border,
                  'hover:shadow-card-hover transition-all duration-300'
                )}
              >
                {/* Background gradient */}
                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500', item.color)} />

                {/* Step number */}
                <div className="relative z-10">
                  <span className="text-5xl font-black opacity-10 text-nexzen-text leading-none block mb-4">
                    {item.step}
                  </span>
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center mb-4',
                      'bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300'
                    )}
                  >
                    <Icon size={22} className={item.iconColor} />
                  </div>
                  <h3 className="text-lg font-bold text-nexzen-text mb-2">{item.title}</h3>
                  <p className="text-sm text-nexzen-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link to="/signup">
            <Button variant="primary" size="lg" glow iconRight={<ArrowRight size={18} />}>
              Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Domains Section ──────────────────────────────────────────────────────────

function DomainsSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Explore by Domain"
          title={<>Find Hackathons in <span className="gradient-text">Your Domain</span></>}
          subtitle="From AI/ML to Web Development — discover challenges tailored to your tech stack."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="flex flex-wrap gap-3 justify-center"
        >
          {ALL_DOMAINS.map((domain, i) => (
            <motion.div key={domain} variants={fadeIn} custom={i * 0.03}>
              <Link
                to={`/hackathons?domain=${encodeURIComponent(domain)}`}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-full',
                  'glass border border-white/8 text-sm text-nexzen-muted font-medium',
                  'hover:border-nexzen-accent/40 hover:text-nexzen-accent hover:bg-nexzen-accent/8',
                  'transition-all duration-200 group'
                )}
              >
                <span className="text-base">{DOMAIN_ICONS[domain]}</span>
                <span>{domain}</span>
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-all duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why NEXZEN ───────────────────────────────────────────────────────────────

function WhyNexzenSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-nexzen-surface/40 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Why NEXZEN"
          title={<>Built for <span className="gradient-text">Student Innovators</span></>}
          subtitle="Everything you need to compete smarter, build faster, and grow your career through hackathons."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_NEXZEN.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardEntry}
                custom={i}
                className="glass rounded-2xl p-6 border border-white/8 group hover:border-white/15 transition-all duration-300 hover:shadow-card-hover"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient.includes('accent') ? 'rgba(99,102,241,0.2)' : feature.gradient.includes('cyan') ? 'rgba(6,182,212,0.2)' : 'rgba(139,92,246,0.2)'}, transparent)`,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon
                    size={22}
                    className={cn(
                      'bg-gradient-to-br bg-clip-text',
                      feature.gradient.includes('cyan') ? 'text-nexzen-cyan' :
                      feature.gradient.includes('pink') ? 'text-nexzen-pink' :
                      i % 2 === 0 ? 'text-nexzen-accent' : 'text-nexzen-violet'
                    )}
                  />
                </div>
                <h3 className="text-base font-bold text-nexzen-text mb-2">{feature.title}</h3>
                <p className="text-sm text-nexzen-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)',
        }}
      />
      {/* Top glow border */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-nexzen-accent/40 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-5">
            <Sparkles size={16} className="text-nexzen-accent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-nexzen-accent">
              Start Today — It's Free
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
          >
            Ready to <span className="gradient-text">Compete?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-nexzen-muted mb-3 max-w-2xl mx-auto leading-relaxed">
            Join <span className="text-nexzen-text font-semibold">1M+ students</span> on NEXZEN. Find hackathons, build teams,
            and turn your ideas into award-winning projects.
          </motion.p>

          <motion.p variants={fadeUp} className="text-sm text-nexzen-subtle mb-10">
            No credit card required · Free forever for students · 500+ active opportunities
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button
                variant="primary"
                size="xl"
                glow
                icon={<Rocket size={20} />}
                iconRight={<ArrowRight size={20} />}
                className="shadow-glow-lg text-base px-10"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link to="/hackathons">
              <Button variant="glass" size="xl" className="text-base">
                Browse Hackathons
              </Button>
            </Link>
          </motion.div>

          {/* Social proof row */}
          <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-nexzen-bg flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${color}, ${color}99)` }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-nexzen-muted">Loved by 1M+ students across India</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
