// ============================================================
// NEXZEN — Core TypeScript Interfaces
// ============================================================

export type Mode = 'online' | 'offline' | 'hybrid';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'open';
export type ApplicationStatus = 'applied' | 'under_review' | 'shortlisted' | 'selected' | 'rejected' | 'completed';
export type TeamStatus = 'open' | 'closed' | 'full';
export type SponsorCategory = 'title' | 'gold' | 'silver' | 'technology' | 'education' | 'community' | 'media';
export type EventCategory = 'conference' | 'workshop' | 'webinar' | 'competition' | 'meetup' | 'hackathon' | 'challenge';

// ─── User / Auth ──────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  mobile?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  dateOfBirth?: string;
  bio?: string;
  // Education
  college?: string;
  course?: string;
  degree?: string;
  branch?: string;
  currentYear?: number;
  graduationYear?: number;
  city?: string;
  state?: string;
  // Skills
  domains: Domain[];
  skills: string[];
  // Links
  github?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  portfolio?: string;
  otherLinks?: { label: string; url: string }[];
  liveProjects?: Project[];
  // Stats
  hackathonsParticipated?: number;
  hackathonsWon?: number;
  resumeUrl?: string;
  // Meta
  createdAt: string;
  lastActive?: string;
}

export type Domain =
  | 'Web Development'
  | 'App Development'
  | 'AI/ML'
  | 'Data Science'
  | 'Cybersecurity'
  | 'IoT'
  | 'Blockchain'
  | 'Cloud Computing'
  | 'UI/UX'
  | 'Game Development'
  | 'Robotics'
  | 'Embedded Systems'
  | 'AR/VR'
  | 'DevOps'
  | 'Software Development'
  | 'Other';

export const ALL_DOMAINS: Domain[] = [
  'Web Development', 'App Development', 'AI/ML', 'Data Science', 'Cybersecurity',
  'IoT', 'Blockchain', 'Cloud Computing', 'UI/UX', 'Game Development',
  'Robotics', 'Embedded Systems', 'AR/VR', 'DevOps', 'Software Development', 'Other',
];

export const ALL_COURSES = [
  'B.Tech', 'B.E.', 'Diploma', 'BCA', 'MCA', 'B.Sc.', 'M.Sc.', 'M.Tech', 'MBA', 'Other',
];

// ─── Projects ─────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
}

// ─── Sponsor ──────────────────────────────────────────────
export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  category: SponsorCategory;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

// ─── Prize ────────────────────────────────────────────────
export interface Prize {
  position: string;
  amount: string;
  description?: string;
  perks?: string[];
}

// ─── Timeline ─────────────────────────────────────────────
export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description?: string;
  icon?: string;
  status: 'upcoming' | 'current' | 'past';
}

// ─── FAQ ──────────────────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ─── Problem Statement ────────────────────────────────────
export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  domains: Domain[];
  tags?: string[];
  resourceLinks?: { label: string; url: string }[];
}

// ─── Hackathon ────────────────────────────────────────────
export interface Hackathon {
  id: string;
  name: string;
  slug: string;
  organizer: string;
  logo: string;
  banner: string;
  description: string;
  shortDescription: string;
  mode: Mode;
  location?: string;
  city?: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  prizeBreakdown: Prize[];
  minTeamSize: number;
  maxTeamSize: number;
  allowIndividual: boolean;
  domains: Domain[];
  tags: string[];
  eligibility: string[];
  skills: string[];
  sponsors: Sponsor[];
  timeline: TimelineItem[];
  problemStatements: ProblemStatement[];
  judgingCriteria: { criterion: string; weight: number; description: string }[];
  rules: string[];
  faqs: FAQItem[];
  importantLinks: { label: string; url: string }[];
  registrationStatus: 'open' | 'closed' | 'upcoming';
  difficulty: Difficulty;
  participantsCount?: number;
  teamsCount?: number;
  isFeatured?: boolean;
  websiteUrl?: string;
  createdAt: string;
}

// ─── Event ────────────────────────────────────────────────
export interface Event {
  id: string;
  name: string;
  slug: string;
  organizer: string;
  logo: string;
  banner: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  mode: Mode;
  location?: string;
  city?: string;
  date: string;
  endDate?: string;
  registrationDeadline?: string;
  registrationStatus: 'open' | 'closed' | 'upcoming';
  isFree: boolean;
  price?: string;
  tags: string[];
  domains: Domain[];
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  faqs?: FAQItem[];
  sponsors?: Sponsor[];
  websiteUrl?: string;
  participantsCount?: number;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  description?: string;
}

// ─── Team ─────────────────────────────────────────────────
export interface Team {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  hackathonId: string;
  hackathonName: string;
  leaderId: string;
  leaderName: string;
  leaderAvatar?: string;
  members: TeamMember[];
  maxSize: number;
  status: TeamStatus;
  domains: Domain[];
  requiredRoles?: string[];
  createdAt: string;
  college?: string;
}

export interface TeamMember {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  mobile?: string;
  college?: string;
  course?: string;
  branch?: string;
  currentYear?: number;
  domain?: Domain;
  skills: string[];
  github?: string;
  linkedin?: string;
  role?: string;
  isLeader?: boolean;
}

// ─── Application ──────────────────────────────────────────
export interface Application {
  id: string;
  hackathonId: string;
  hackathonName: string;
  hackathonLogo: string;
  userId: string;
  type: 'individual' | 'team';
  teamId?: string;
  teamName?: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  submissionDeadline: string;
  notes?: string;
}

// ─── Notification ─────────────────────────────────────────
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'team' | 'hackathon' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
  icon?: string;
}

// ─── Auth ─────────────────────────────────────────────────
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile?: string;
}

// ─── Filters / Search ─────────────────────────────────────
export interface HackathonFilters {
  search?: string;
  domains?: Domain[];
  mode?: Mode | 'all';
  difficulty?: Difficulty | 'all';
  registrationStatus?: 'open' | 'closed' | 'upcoming' | 'all';
  prizeMin?: number;
  prizeMax?: number;
  sortBy?: 'recommended' | 'newest' | 'deadline' | 'prize' | 'popular';
}

export interface EventFilters {
  search?: string;
  category?: EventCategory | 'all';
  mode?: Mode | 'all';
  registrationStatus?: 'open' | 'closed' | 'upcoming' | 'all';
  isFree?: boolean | null;
  sortBy?: 'newest' | 'soonest' | 'popular';
}

// ─── Application Form ─────────────────────────────────────
export interface ApplicationFormData {
  // Step 1
  fullName: string;
  email: string;
  mobile: string;
  gender: string;
  dateOfBirth: string;
  profilePhoto?: File;
  // Step 2
  college: string;
  course: string;
  degree: string;
  branch: string;
  currentYear: string;
  graduationYear: string;
  city: string;
  state: string;
  // Step 3
  domains: Domain[];
  skills: string[];
  // Step 4
  github: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  portfolio: string;
  otherLinks: { label: string; url: string }[];
  liveProjects: { name: string; url: string; description: string }[];
  // Step 5
  resume?: File;
  resumeUrl?: string;
}

// ─── Team Form ────────────────────────────────────────────
export interface TeamFormData {
  name: string;
  description: string;
  logo?: File;
  maxSize: number;
  domains: Domain[];
  hackathonId: string;
  members: Omit<TeamMember, 'id'>[];
}

