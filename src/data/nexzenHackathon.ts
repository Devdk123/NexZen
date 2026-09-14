// ============================================================
// NEXZEN 2026 — Central Event Configuration
// Single source of truth for all hackathon data.
// Update this file to change dates, links, themes, rules, etc.
// ============================================================

import type { Hackathon, Domain } from '../types';

// ─── External Links (UPDATE THESE) ──────────────────────────
export const NEXZEN_LINKS = {
  unstopRegistration: '#', // TODO: Add Unstop event URL
  websiteRegistration: '/signup',
  whatsappGroup: '#', // TODO: Add WhatsApp group invite
  whatsappChannel: '#', // TODO: Add WhatsApp channel link
  instagram: 'https://instagram.com/nexzen.in', // TODO: Update
  linkedin: 'https://linkedin.com/company/nexzen', // TODO: Update
  googleForm: '#', // TODO: Add Google Form link
  contactEmail: 'hackathon@nexzen.in', // TODO: Update
  supportEmail: 'support@nexzen.in',
  website: 'https://nex-zen.vercel.app',
} as const;

// ─── Event Metadata ─────────────────────────────────────────
export const NEXZEN_EVENT = {
  name: 'NEXZEN 2026',
  tagline: 'Build. Innovate. Impact — 24 Hours to Change the World',
  description: 'NEXZEN 2026 is a national-level online hackathon challenging students across India to build innovative solutions in 24 hours. From AI to ClimateTech, push boundaries, showcase skills, and compete for recognition and career opportunities.',
  shortDescription: 'A 24-hour national-level online hackathon for student innovators across India.',
  date: '2026-10-15',
  startDate: '2026-10-15T10:00:00+05:30',
  endDate: '2026-10-16T10:00:00+05:30',
  registrationDeadline: '2026-10-10T23:59:59+05:30',
  duration: '24 Hours',
  mode: 'online' as const,
  level: 'National Level',
  organizer: 'NEXZEN',
  registrationStatus: 'open' as const,
  prizePool: 'To Be Announced Soon',
  minTeamSize: 1,
  maxTeamSize: 4,
  allowIndividual: true,
} as const;

// ─── Themes / Tracks ────────────────────────────────────────
export const NEXZEN_THEMES = [
  {
    id: 'ai-ml',
    icon: '🤖',
    title: 'Artificial Intelligence & Machine Learning',
    shortTitle: 'AI / ML',
    description: 'Build intelligent systems using machine learning, deep learning, NLP, computer vision, and generative AI to solve real-world problems.',
    color: 'from-blue-500/20 to-purple-500/20',
    border: 'border-blue-500/30',
  },
  {
    id: 'cybersecurity',
    icon: '🔐',
    title: 'Cybersecurity',
    shortTitle: 'Cybersecurity',
    description: 'Create solutions for digital safety — threat detection, secure authentication, privacy protection, and vulnerability analysis.',
    color: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
  },
  {
    id: 'web-app',
    icon: '🌐',
    title: 'Web & App Development',
    shortTitle: 'Web & App Dev',
    description: 'Build modern web applications, progressive web apps, or mobile applications that solve everyday problems with great UX.',
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
  },
  {
    id: 'fintech',
    icon: '💳',
    title: 'FinTech',
    shortTitle: 'FinTech',
    description: 'Innovate in digital payments, banking, insurance, personal finance, or financial inclusion for underserved communities.',
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
  },
  {
    id: 'healthtech',
    icon: '🏥',
    title: 'HealthTech',
    shortTitle: 'HealthTech',
    description: 'Solutions for healthcare accessibility, telemedicine, mental health, patient data management, and wellness technology.',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/30',
  },
  {
    id: 'edtech',
    icon: '📚',
    title: 'EdTech',
    shortTitle: 'EdTech',
    description: 'Transform education through personalized learning, skill assessment, accessibility tools, and innovative teaching platforms.',
    color: 'from-indigo-500/20 to-violet-500/20',
    border: 'border-indigo-500/30',
  },
  {
    id: 'climatetech',
    icon: '🌱',
    title: 'ClimateTech & Sustainability',
    shortTitle: 'ClimateTech',
    description: 'Address climate change through carbon tracking, renewable energy solutions, waste management, and sustainable technology.',
    color: 'from-emerald-500/20 to-green-500/20',
    border: 'border-emerald-500/30',
  },
  {
    id: 'agritech',
    icon: '🌾',
    title: 'AgriTech',
    shortTitle: 'AgriTech',
    description: 'Modernize agriculture with precision farming, supply chain optimization, crop monitoring, and farmer empowerment tools.',
    color: 'from-lime-500/20 to-green-500/20',
    border: 'border-lime-500/30',
  },
  {
    id: 'iot-smart',
    icon: '📡',
    title: 'IoT & Smart Technology',
    shortTitle: 'IoT & Smart Tech',
    description: 'Connect the physical and digital worlds — smart cities, home automation, wearables, industrial IoT, and sensor networks.',
    color: 'from-teal-500/20 to-cyan-500/20',
    border: 'border-teal-500/30',
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    title: 'Blockchain & Web3',
    shortTitle: 'Blockchain & Web3',
    description: 'Decentralized applications, smart contracts, tokenization, supply chain transparency, and digital identity solutions.',
    color: 'from-purple-500/20 to-indigo-500/20',
    border: 'border-purple-500/30',
  },
  {
    id: 'open-innovation',
    icon: '✨',
    title: 'Open Innovation',
    shortTitle: 'Open Innovation',
    description: 'Don\'t fit into a category? Build anything innovative that solves a real problem. Surprise us with your creativity.',
    color: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/30',
  },
] as const;

// ─── Timeline ───────────────────────────────────────────────
export const NEXZEN_TIMELINE = [
  { id: 'reg-open', title: 'Registration Opens', date: '2026-09-15T00:00:00+05:30', description: 'Register on the NEXZEN website and Unstop.', status: 'current' as const },
  { id: 'reg-deadline', title: 'Registration Deadline', date: '2026-10-10T23:59:59+05:30', description: 'Last date to complete registration and verification.', status: 'upcoming' as const },
  { id: 'verification-deadline', title: 'Mandatory Verification Deadline', date: '2026-10-12T23:59:59+05:30', description: 'Complete social verification and Google Form submission.', status: 'upcoming' as const },
  { id: 'hackathon-start', title: 'Hackathon Begins', date: '2026-10-15T10:00:00+05:30', description: 'The 24-hour build window starts. Start coding!', status: 'upcoming' as const },
  { id: 'hackathon-end', title: 'Submission Deadline', date: '2026-10-16T10:00:00+05:30', description: 'Final submissions close. No late entries accepted.', status: 'upcoming' as const },
  { id: 'judging', title: 'Judging Period', date: '2026-10-17T00:00:00+05:30', description: 'Projects reviewed by judges. Walkthrough may be requested.', status: 'upcoming' as const },
  { id: 'top50', title: 'Top 50 Announcement', date: '2026-10-20T18:00:00+05:30', description: 'Top 50 teams announced with special recognition.', status: 'upcoming' as const },
  { id: 'winners', title: 'Winner Announcement', date: '2026-10-22T18:00:00+05:30', description: 'Winners, runner-ups, and special awards announced.', status: 'upcoming' as const },
];

// ─── Rules ──────────────────────────────────────────────────
export const NEXZEN_RULES = [
  'All participants must complete the required registration process on both the NEXZEN website and Unstop.',
  'Each participant may participate in only one team.',
  'Recommended team size: 1–4 members. Solo participation is allowed.',
  'The actual project development must take place during the official 24-hour hackathon window.',
  'Pre-built or previously completed projects are strictly prohibited.',
  'Previously submitted projects, reused complete codebases, or previously developed solutions cannot be submitted as the main project.',
  'Open-source libraries, frameworks, APIs, SDKs, public datasets, and development tools are allowed.',
  'The core solution, architecture, implementation, and meaningful project work must be created during the hackathon.',
  'AI tools such as ChatGPT, Gemini, Claude, Cursor, and GitHub Copilot may be used as development assistants.',
  'Participants must understand and be able to explain their implementation.',
  'External people cannot implement the project or provide unauthorized development assistance.',
  'Plagiarism, cheating, copied projects, fake submissions, fake verification, or unfair practices may result in immediate disqualification.',
  'Teams must submit their GitHub repository link.',
  'Teams should maintain meaningful Git commits during the hackathon.',
  'Final submission must be completed before the deadline.',
  'Late submissions may not be accepted.',
  'Judges may request a technical walkthrough or code verification.',
  'Organizers may disqualify teams for serious rule violations.',
  'Judges\' and organizers\' decisions regarding evaluation and disqualification are final and binding, subject to applicable rules and law.',
  'Participants retain ownership of their original work, subject to third-party licenses and applicable sponsor terms.',
];

// ─── AI Policy ──────────────────────────────────────────────
export const NEXZEN_AI_POLICY = {
  title: 'AI Usage Policy',
  description: 'AI tools are allowed for ideation, debugging, optimization, code assistance, documentation, and other development support. However, teams must make meaningful original contributions and must understand the submitted project. If required, teams must disclose the AI tools and external services used.',
  allowed: [
    'Ideation and brainstorming',
    'Code assistance and debugging',
    'Documentation and comments',
    'UI/UX design assistance',
    'Optimization and refactoring',
  ],
  required: [
    'Teams must make meaningful original contributions',
    'Teams must understand and explain their implementation',
    'AI tools used must be disclosed if requested',
  ],
};

// ─── Judging Criteria ───────────────────────────────────────
export const NEXZEN_JUDGING = [
  { criterion: 'Innovation & Originality', weight: 25, description: 'How novel and creative is the solution? Does it offer a fresh approach to the problem?' },
  { criterion: 'Technical Implementation', weight: 25, description: 'Quality of code, architecture, technology choices, and engineering practices.' },
  { criterion: 'Problem Relevance & Impact', weight: 20, description: 'Does the solution address a real problem? What is its potential real-world impact?' },
  { criterion: 'UI/UX & Functionality', weight: 10, description: 'User experience, interface design, and overall usability of the solution.' },
  { criterion: 'Scalability & Feasibility', weight: 10, description: 'Can the solution scale? Is it practically feasible to implement and maintain?' },
  { criterion: 'Presentation & Demo', weight: 10, description: 'Clarity of presentation, demo quality, and ability to communicate the solution effectively.' },
];

// ─── Prizes & Recognition ───────────────────────────────────
export const NEXZEN_PRIZES = [
  {
    position: '🏆 Winner',
    amount: 'TBA',
    description: 'Winner recognition and certificate',
    perks: [
      'Excellence Certificate with Winner designation',
      'Pre-interview opportunities with hiring partners (subject to eligibility)',
      'Official Winner ranking and recognition',
      'Featured on NEXZEN platform',
    ],
  },
  {
    position: '🥈 1st Runner Up',
    amount: 'TBA',
    description: 'Runner-up recognition and certificate',
    perks: [
      'Excellence Certificate with ranking',
      'Career opportunity access (subject to eligibility)',
      'Official ranking and recognition',
    ],
  },
  {
    position: '🥉 2nd Runner Up',
    amount: 'TBA',
    description: 'Second runner-up recognition and certificate',
    perks: [
      'Excellence Certificate with ranking',
      'Official ranking and recognition',
    ],
  },
];

export const NEXZEN_RECOGNITION = {
  top50: {
    title: 'Top 50',
    description: 'Top 50 participants/teams receive special recognition, Certificate of Excellence, and official ranking.',
    perks: ['Special Recognition', 'Certificate of Excellence', 'Official Ranking'],
  },
  participation: {
    title: 'All Participants',
    description: 'All eligible participants who successfully complete required participation and submission criteria receive a digital Certificate of Participation.',
    perks: ['National Level Participation Certificate'],
  },
  community: {
    title: 'NEXZEN Community Champion',
    description: 'Participants who meaningfully promote NEXZEN through eligible social-media content may receive special recognition after organizer verification.',
    perks: ['Community Champion Recognition', 'Special Certificate'],
  },
};

// ─── Winner Career Benefits ─────────────────────────────────
export const NEXZEN_CAREER_BENEFITS = 'Winners may receive exclusive pre-interview opportunities, direct interaction with hiring partners, and career opportunities, subject to eligibility and participating organization requirements.';

// ─── Submission Requirements ────────────────────────────────
export const NEXZEN_SUBMISSION = [
  { field: 'Project Name', required: true },
  { field: 'Problem Statement', required: true },
  { field: 'Solution Description', required: true },
  { field: 'Key Features', required: true },
  { field: 'Tech Stack', required: true },
  { field: 'GitHub Repository URL', required: true },
  { field: 'Live Demo URL', required: false },
  { field: 'Demo Video', required: false },
  { field: 'Presentation / Pitch Deck', required: false },
  { field: 'AI / API / External Tool Disclosure', required: true },
];

// ─── Registration Steps ─────────────────────────────────────
export const NEXZEN_REG_STEPS = [
  { step: 1, title: 'Register on Unstop', description: 'Create your account and register for NEXZEN 2026 on Unstop.', icon: '📋', link: NEXZEN_LINKS.unstopRegistration },
  { step: 2, title: 'Register on NEXZEN Website', description: 'Complete your registration on the official NEXZEN website with your profile details.', icon: '🌐', link: NEXZEN_LINKS.websiteRegistration },
  { step: 3, title: 'Join WhatsApp Group', description: 'Join the official NEXZEN WhatsApp group for updates and announcements.', icon: '💬', link: NEXZEN_LINKS.whatsappGroup },
  { step: 4, title: 'Complete Verification Form', description: 'Fill the mandatory verification form with social media proof.', icon: '✅', link: NEXZEN_LINKS.googleForm },
  { step: 5, title: 'Build During 24hr Window', description: 'Start building your project when the hackathon begins. No pre-built projects allowed.', icon: '💻' },
  { step: 6, title: 'Submit Before Deadline', description: 'Submit your project with GitHub repo, demo, and presentation before time runs out.', icon: '🚀' },
];

// ─── Mandatory Verification ─────────────────────────────────
export const NEXZEN_VERIFICATION = [
  { platform: 'Instagram', icon: '📸', action: 'Follow official NEXZEN Instagram', proof: 'Upload screenshot/proof for organizer verification', link: NEXZEN_LINKS.instagram },
  { platform: 'LinkedIn', icon: '💼', action: 'Follow official NEXZEN LinkedIn', proof: 'Upload screenshot/proof for organizer verification', link: NEXZEN_LINKS.linkedin },
  { platform: 'WhatsApp Group', icon: '💬', action: 'Join official NEXZEN WhatsApp group', proof: 'Upload proof of joining for organizer verification', link: NEXZEN_LINKS.whatsappGroup },
  { platform: 'WhatsApp Channel', icon: '📢', action: 'Follow official NEXZEN WhatsApp channel', proof: 'Upload proof for organizer verification', link: NEXZEN_LINKS.whatsappChannel },
];

// ─── Anti-Fraud Warnings ────────────────────────────────────
export const NEXZEN_WARNINGS = [
  { title: 'No Pre-Built Projects', description: 'All code must be written during the 24-hour hackathon window.', icon: '🚫' },
  { title: '24-Hour Development Window', description: 'Projects must be built from scratch within the official time frame.', icon: '⏰' },
  { title: 'GitHub Verification', description: 'Meaningful commits during the hackathon are expected. Judges may verify.', icon: '🔍' },
  { title: 'No Plagiarism', description: 'Copied code, fake submissions, or unfair practices lead to disqualification.', icon: '⚠️' },
  { title: 'One Team Per Participant', description: 'Each participant may only be part of one team.', icon: '👤' },
];

// ─── FAQs ───────────────────────────────────────────────────
export const NEXZEN_FAQS = [
  { id: 'solo', question: 'Can I participate solo?', answer: 'Yes! Solo participation is allowed. You can also form a team of up to 4 members.' },
  { id: 'team-size', question: 'What is the maximum team size?', answer: 'Maximum team size is 4 members. Minimum is 1 (solo participation).' },
  { id: 'cross-college', question: 'Can students from different colleges form a team?', answer: 'Absolutely! Cross-college and inter-university teams are encouraged.' },
  { id: 'ai-tools', question: 'Can I use AI tools like ChatGPT, Copilot, or Cursor?', answer: 'Yes, AI tools are allowed for ideation, debugging, code assistance, and documentation. However, you must make meaningful original contributions, understand your code, and disclose AI tools used if requested.' },
  { id: 'apis', question: 'Can I use APIs and external services?', answer: 'Yes, you can use public APIs, SDKs, cloud services, and external datasets. The core solution must be your original work.' },
  { id: 'open-source', question: 'Can I use open-source libraries and frameworks?', answer: 'Yes, open-source libraries, frameworks, and tools are fully allowed and encouraged.' },
  { id: 'pre-built', question: 'Can I use a pre-built project?', answer: 'No. Pre-built, previously completed, or previously submitted projects are strictly prohibited. All meaningful work must happen during the 24-hour window.' },
  { id: 'github', question: 'Is GitHub mandatory?', answer: 'Yes, you must submit a GitHub repository link. Maintaining meaningful commits during the hackathon is expected.' },
  { id: 'submission', question: 'How does submission work?', answer: 'You must submit your project before the deadline with: project name, problem statement, solution description, tech stack, GitHub repo, and optionally a demo video and pitch deck.' },
  { id: 'judging', question: 'How will judging happen?', answer: 'Projects are evaluated on Innovation (25%), Technical Implementation (25%), Problem Relevance (20%), UI/UX (10%), Scalability (10%), and Presentation (10%). Judges may request a walkthrough.' },
  { id: 'certificate', question: 'Will every participant receive a certificate?', answer: 'Yes, all eligible participants who complete registration and submit a valid project will receive a National Level Participation Certificate.' },
  { id: 'duration', question: 'What is the hackathon duration?', answer: 'The hackathon is a 24-hour coding event. The build window starts on October 15, 2026 at 10:00 AM IST and ends on October 16, 2026 at 10:00 AM IST.' },
  { id: 'online', question: 'Is this hackathon online?', answer: 'Yes, NEXZEN 2026 is a fully online hackathon. You can participate from anywhere in India.' },
  { id: 'late', question: 'What happens if I miss the submission deadline?', answer: 'Late submissions may not be accepted. Make sure to submit before the deadline.' },
  { id: 'multiple-teams', question: 'Can I participate in more than one team?', answer: 'No, each participant can only be part of one team.' },
];

// ─── Export as Hackathon type for catalog ────────────────────
export const NEXZEN_HACKATHON: Hackathon = {
  id: 'nexzen-2026',
  name: NEXZEN_EVENT.name,
  slug: 'nexzen-2026',
  organizer: NEXZEN_EVENT.organizer,
  logo: '/nexzen-logo.png',
  banner: '/nexzen-banner.png',
  description: NEXZEN_EVENT.description,
  shortDescription: NEXZEN_EVENT.shortDescription,
  mode: NEXZEN_EVENT.mode,
  registrationDeadline: NEXZEN_EVENT.registrationDeadline,
  startDate: NEXZEN_EVENT.startDate,
  endDate: NEXZEN_EVENT.endDate,
  prizePool: NEXZEN_EVENT.prizePool,
  prizeBreakdown: NEXZEN_PRIZES,
  minTeamSize: NEXZEN_EVENT.minTeamSize,
  maxTeamSize: NEXZEN_EVENT.maxTeamSize,
  allowIndividual: NEXZEN_EVENT.allowIndividual,
  domains: ['AI/ML', 'Cybersecurity', 'Web Development', 'IoT', 'Blockchain'] as Domain[],
  tags: ['national-level', 'online', '24-hours', 'student', 'hackathon', 'innovation'],
  eligibility: [
    'Open to all students across India (UG, PG, PhD)',
    'Recent graduates (within 2 years of graduation) are eligible',
    'No restriction on college, university, or discipline',
    'International students studying in India are welcome',
  ],
  skills: ['React', 'Python', 'Node.js', 'Machine Learning', 'Flutter', 'Firebase', 'MongoDB', 'TensorFlow'],
  sponsors: [],
  timeline: NEXZEN_TIMELINE,
  problemStatements: [],
  judgingCriteria: NEXZEN_JUDGING,
  rules: NEXZEN_RULES,
  faqs: NEXZEN_FAQS,
  importantLinks: [
    { label: 'Register on Unstop', url: NEXZEN_LINKS.unstopRegistration },
    { label: 'Join WhatsApp Group', url: NEXZEN_LINKS.whatsappGroup },
    { label: 'Verification Form', url: NEXZEN_LINKS.googleForm },
  ],
  registrationStatus: NEXZEN_EVENT.registrationStatus,
  difficulty: 'open',
  isFeatured: true,
  websiteUrl: NEXZEN_LINKS.website,
  createdAt: '2026-09-01T00:00:00+05:30',
};
