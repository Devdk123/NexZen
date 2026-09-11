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
import { HackathonCard } from '../components/hackathons/HackathonCard';
import { EventCard } from '../components/events/EventCard';
import { AnimatedCounter } from '../components/landing/AnimatedCounter';
import { hackathonService } from '../services/hackathons';
import { eventService } from '../services/events';
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
  { label: 'Active Hackathons', value: 500, suffix: '+', prefix: '' },
  { label: 'Students', value: 1, suffix: 'M+', prefix: '' },
  { label: 'Teams Formed', value: 50000, suffix: '+', prefix: '', format: true },
  { label: 'Projects Built', value: 25000, suffix: '+', prefix: '', format: true },
  { label: 'Events Hosted', value: 200, suffix: '+', prefix: '' },
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
    description: 'Connect with over 1M+ student innovators from 500+ colleges across India. Your tribe is here.',
    gradient: 'from-nexzen-violet to-nexzen-accent',
  },
];

const TESTIMONIALS = [
  {
    quote:
      "NEXZEN changed how I approach hackathons. Found a 3-person team for Smart India Hackathon in under 24 hours. We made it to the finals. This platform is a game-changer.",
    name: 'Arjun Mehta',
    college: 'IIT Bombay, CSE 3rd Year',
    avatar: 'AM',
    color: 'from-nexzen-accent to-nexzen-violet',
    role: 'Full-Stack Developer',
    wins: '3 Hackathon Wins',
  },
  {
    quote:
      "I used to miss deadlines because I couldn't track everything. NEXZEN's dashboard is unbelievably clean. Applied to 8 hackathons last semester, shortlisted in 5.",
    name: 'Priya Nair',
    college: 'NIT Trichy, ECE 4th Year',
    avatar: 'PN',
    color: 'from-nexzen-violet to-nexzen-cyan',
    role: 'IoT & Embedded Systems',
    wins: '5x Shortlisted',
  },
  {
    quote:
      "As a designer who doesn't code, finding the right team was always hard. NEXZEN's domain filter found me devs instantly. Built 4 projects that are in my portfolio now.",
    name: 'Sneha Rathi',
    college: 'VJTI Mumbai, IT 3rd Year',
    avatar: 'SR',
    color: 'from-nexzen-cyan to-nexzen-accent',
    role: 'UI/UX Designer',
    wins: '4 Projects Built',
  },
];

const COMMUNITY_PARTNERS = [
  'IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'SRM University',
  'IIIT Hyderabad', 'NSUT Delhi', 'DTU', 'Manipal University', 'Amity University',
];

const SPONSORS = [
  { name: 'Google', color: '#4285F4' },
  { name: 'Microsoft', color: '#00A4EF' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'GitHub', color: '#6e7681' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'MongoDB', color: '#4DB33D' },
  { name: 'Vercel', color: '#FFFFFF' },
  { name: 'HashNode', color: '#2563EB' },
];

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

// ─── Floating Hero Cards ──────────────────────────────────────────────────────

function FloatingHackathonCard() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className="glass-strong rounded-2xl p-4 border border-nexzen-accent/25 shadow-glow-sm w-64"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center flex-shrink-0">
          <Trophy size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-nexzen-text truncate">Smart India Hackathon</p>
          <p className="text-[10px] text-nexzen-muted">Ministry of Education</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
          ● Registration Open
        </span>
        <span className="text-xs font-bold text-nexzen-accent">₹1 Cr+</span>
      </div>
    </motion.div>
  );
}

function FloatingTeamCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      className="glass-strong rounded-2xl p-4 border border-nexzen-violet/25 shadow-glow-violet w-56"
    >
      <div className="flex items-center gap-2 mb-2">
        <Users size={14} className="text-nexzen-violet" />
        <p className="text-xs font-semibold text-nexzen-text">Team Phoenix</p>
      </div>
      <div className="flex -space-x-2 mb-2">
        {['A', 'B', 'C'].map((l, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 border-nexzen-bg flex items-center justify-center text-[10px] font-bold"
            style={{
              background: `linear-gradient(135deg, ${['#6366F1', '#8B5CF6', '#06B6D4'][i]}, ${['#8B5CF6', '#06B6D4', '#6366F1'][i]})`,
            }}
          >
            {l}
          </div>
        ))}
        <div className="w-7 h-7 rounded-full border-2 border-dashed border-nexzen-violet/50 flex items-center justify-center text-nexzen-violet text-[10px]">+</div>
      </div>
      <p className="text-[10px] text-nexzen-muted">Looking for UI/UX Designer</p>
    </motion.div>
  );
}

function FloatingNotifCard() {
  return (
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      className="glass-strong rounded-2xl p-3.5 border border-nexzen-cyan/25 shadow-glow-cyan w-60"
    >
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-nexzen-cyan/15 border border-nexzen-cyan/30 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={14} className="text-nexzen-cyan" />
        </div>
        <div>
          <p className="text-xs font-semibold text-nexzen-text">🎉 Shortlisted!</p>
          <p className="text-[10px] text-nexzen-muted mt-0.5">Your application for HackWithInfy has been shortlisted.</p>
          <p className="text-[10px] text-nexzen-cyan mt-1 font-medium">Just now</p>
        </div>
      </div>
    </motion.div>
  );
}

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
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingHackathons, setLoadingHackathons] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    hackathonService
      .getFeatured()
      .then((data) => setHackathons(data.slice(0, 6)))
      .finally(() => setLoadingHackathons(false));

    eventService
      .getFeatured()
      .then((data) => setEvents(data.slice(0, 3)))
      .finally(() => setLoadingEvents(false));
  }, []);

  return (
    <div className="min-h-screen bg-nexzen-bg overflow-x-hidden">
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. COMMUNITY STRIP ─────────────────────────────────────── */}
      <CommunityStrip />

      {/* ── 3. ANIMATED STATS ──────────────────────────────────────── */}
      <StatsSection />

      {/* ── 4. FEATURED HACKATHONS ─────────────────────────────────── */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Featured Hackathons"
          title={<>Find Your Next <span className="gradient-text">Big Challenge</span></>}
          subtitle="Handpicked hackathons from top organizers across India. Open registrations, massive prize pools."
        />

        {loadingHackathons ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton rounded-2xl h-80" />
            ))}
          </div>
        ) : hackathons.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {hackathons.map((h) => (
              <motion.div key={h.id} variants={cardEntry}>
                <HackathonCard hackathon={h} featured={h.isFeatured} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/hackathons">
            <Button variant="outline" size="lg" iconRight={<ArrowRight size={18} />}>
              View All Hackathons
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── 5. UPCOMING EVENTS ─────────────────────────────────────── */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-nexzen-surface/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Upcoming Events"
            title={<>Conferences, Workshops <span className="gradient-text">&amp; More</span></>}
            subtitle="Beyond hackathons — attend workshops, webinars, and competitions to level up your skills."
          />

          {loadingEvents ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton rounded-2xl h-80" />
              ))}
            </div>
          ) : events.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {events.map((ev) => (
                <motion.div key={ev.id} variants={cardEntry}>
                  <EventCard event={ev} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <Link to="/events">
              <Button variant="outline" size="lg" iconRight={<ArrowRight size={18} />}>
                Explore All Events
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── 7. DOMAINS ─────────────────────────────────────────────── */}
      <DomainsSection />

      {/* ── 8. WHY NEXZEN ──────────────────────────────────────────── */}
      <WhyNexzenSection />

      {/* ── 9. TESTIMONIALS ────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── 10. SPONSORS STRIP ─────────────────────────────────────── */}
      <SponsorsStrip />

      {/* ── 11. CTA ────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-nexzen-bg">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #080B14 0%, transparent 100%)',
        }}
      />

      {/* Accent orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
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
                India's #1 Student Innovation Platform
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold leading-[1.08] tracking-tight"
            >
              <span className="gradient-text">Discover.</span>{' '}
              <span className="text-nexzen-text">Build.</span>
              <br />
              <span className="text-nexzen-text">Compete.</span>{' '}
              <span className="gradient-text">Innovate.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-nexzen-muted leading-relaxed max-w-lg"
            >
              India's premier platform for student hackathons, innovation challenges, and tech events.
              Find your next opportunity. Build your team. Showcase your work.
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

          {/* Right: Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeCurve }}
            className="relative hidden lg:flex flex-col items-end gap-4"
          >
            {/* Glow behind cards */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 60% at 60% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)',
              }}
            />

            <div className="relative flex flex-col items-end gap-4 pr-4">
              {/* Top card — offset left */}
              <div className="self-start ml-8">
                <FloatingHackathonCard />
              </div>

              {/* Middle card — full right */}
              <FloatingTeamCard />

              {/* Bottom card — offset left */}
              <div className="self-start ml-16">
                <FloatingNotifCard />
              </div>

              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-dashed border-nexzen-accent/20 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -left-6 w-20 h-20 rounded-full border border-dashed border-nexzen-violet/20 pointer-events-none"
              />
            </div>

            {/* Two remaining hero stats */}
            <div className="flex gap-6 mt-4 pr-4">
              {HERO_STATS.slice(3).map((s) => (
                <div key={s.label} className="glass rounded-2xl px-5 py-4 border border-white/8 text-center min-w-[110px]">
                  <span className="text-xl font-extrabold gradient-text block">
                    <AnimatedCounter
                      target={s.value}
                      suffix={s.suffix}
                      prefix={s.prefix}
                      format={s.format}
                    />
                  </span>
                  <span className="text-[11px] text-nexzen-muted mt-0.5 block">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
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

// ─── Community Strip ──────────────────────────────────────────────────────────

function CommunityStrip() {
  return (
    <div className="relative py-5 bg-nexzen-surface/60 border-y border-white/5 overflow-hidden">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-[11px] text-nexzen-subtle whitespace-nowrap pl-6 pr-4 uppercase tracking-widest font-medium">
          Trusted by students from
        </span>
        {/* Scrolling strip */}
        <div className="flex-1 overflow-hidden relative">
          <div
            className="flex gap-8 items-center"
            style={{ animation: 'communityScroll 30s linear infinite' }}
          >
            {[...COMMUNITY_PARTNERS, ...COMMUNITY_PARTNERS].map((name, i) => (
              <span
                key={i}
                className="text-sm font-semibold text-nexzen-subtle whitespace-nowrap hover:text-nexzen-muted transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-nexzen-surface to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-nexzen-surface to-transparent pointer-events-none" />
        </div>
      </div>
      <style>{`
        @keyframes communityScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { label: 'Active Hackathons', value: 500, suffix: '+', icon: Trophy, color: 'text-nexzen-accent' },
    { label: 'Registered Students', value: 1000000, suffix: '+', icon: Users, color: 'text-nexzen-violet', format: true },
    { label: 'Teams Formed', value: 50000, suffix: '+', icon: Code2, color: 'text-nexzen-cyan', format: true },
    { label: 'Projects Submitted', value: 25000, suffix: '+', icon: Rocket, color: 'text-nexzen-pink', format: true },
    { label: 'Events Hosted', value: 200, suffix: '+', icon: Star, color: 'text-yellow-400' },
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={cardEntry}
                custom={i}
                className="glass rounded-2xl p-6 border border-white/8 text-center card-hover group"
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center',
                    'bg-white/5 group-hover:scale-110 transition-transform duration-300'
                  )}
                >
                  <Icon size={20} className={s.color} />
                </div>
                <p className={cn('text-3xl lg:text-4xl font-extrabold', s.color)}>
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    format={s.format}
                  />
                </p>
                <p className="text-xs text-nexzen-muted mt-1.5 leading-tight">{s.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
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

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Student Stories"
          title={<>Trusted by <span className="gradient-text">1M+ Students</span></>}
          subtitle="Real students. Real wins. Real stories from the NEXZEN community."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={cardEntry}
              custom={i}
              className="glass rounded-2xl p-6 border border-white/8 flex flex-col group hover:border-white/15 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote mark */}
              <div className="text-4xl font-black text-nexzen-accent/20 leading-none mb-3 font-serif">"</div>

              {/* Quote text */}
              <p className="text-sm text-nexzen-muted leading-relaxed flex-1 mb-6 italic">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color.replace('from-', '').replace(' to-', ', ')})` }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-nexzen-text truncate">{t.name}</p>
                  <p className="text-[11px] text-nexzen-muted truncate">{t.college}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-nexzen-subtle whitespace-nowrap">
                  {t.wins}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sponsors Strip ───────────────────────────────────────────────────────────

function SponsorsStrip() {
  return (
    <section className="py-14 px-4 border-y border-white/5 bg-nexzen-surface/30 overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium text-nexzen-subtle uppercase tracking-widest mb-8"
      >
        Powered by leading technology companies
      </motion.p>

      <div className="flex overflow-hidden relative">
        <div
          className="flex gap-12 items-center"
          style={{ animation: 'communityScroll 25s linear infinite' }}
        >
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 glass rounded-xl px-5 py-3 border border-white/8 whitespace-nowrap flex-shrink-0 hover:border-white/15 transition-colors group"
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-sm font-semibold text-nexzen-subtle group-hover:text-nexzen-muted transition-colors">
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-nexzen-surface to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-nexzen-surface to-transparent pointer-events-none z-10" />
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
