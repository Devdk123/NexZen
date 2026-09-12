import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Accordion } from '../components/ui/Accordion';
import { Search, HelpCircle, Mail, ArrowRight, Sparkles, X } from 'lucide-react';

const FAQS = [
  {
    category: 'General',
    items: [
      {
        q: 'What is NEXZEN?',
        a: 'NEXZEN is India\'s premier student-centric hackathon and tech innovation platform, purpose-built to empower collegiate developers, designers, and innovators.\n\nWe serve as a unified ecosystem connecting students from 1,000+ colleges and universities across India with cutting-edge hackathons, industry-sponsored problem statements, recruitment pipelines, and incubation opportunities. Through NEXZEN, students can discover curated hackathons, build multidisciplinary teams across institutions, submit and showcase projects, and earn tamper-proof, cryptographically verifiable credentials.',
      },
      {
        q: 'Is NEXZEN free to use?',
        a: 'Yes, NEXZEN is 100% free for students and participants. There are no registration fees, platform subscription charges, or hidden platform commissions deducted from your prize winnings.\n\nOur operations are sustained through partnerships with enterprise sponsors, corporate recruitment partners seeking top campus engineering talent, and institutional organizers who utilize our advanced hackathon management infrastructure. We strongly believe that financial constraints should never stand between an ambitious student and technological innovation.',
      },
      {
        q: 'Who can use NEXZEN?',
        a: 'NEXZEN is open to any student actively enrolled in a recognized Indian higher education institution. This encompasses undergraduate, postgraduate, polytechnic diploma, and doctoral (PhD) candidates across all academic disciplines—including Computer Science, Electronics, Mechanical, Civil, Biotechnology, Design, Business, Commerce, and Arts.\n\nWhether you are a first-year student writing your first lines of code or an experienced postgraduate researcher building specialized deep-tech solutions, you have a place on NEXZEN.',
      },
      {
        q: 'Can alumni use NEXZEN?',
        a: 'Yes! Recent graduates (within 2 years of completing their degree) can participate in many hackathons hosted on NEXZEN that offer open tracks or alumni-eligible categories.\n\nWhen setting up or updating your profile, simply mark your status as "Alumni / Recent Graduate" and specify your graduation year. While certain college-specific competitions are strictly restricted to current enrolled students, numerous open innovation challenges, corporate hackathons, and open-source bounties welcome recent alumni and early-career innovators.',
      },
      {
        q: 'How is NEXZEN different from other hackathon platforms?',
        a: 'Unlike legacy contest directories or generic international job boards, NEXZEN is tailor-made for the Indian collegiate tech ecosystem:\n\n• Smart Skill-Based Matchmaking: Intelligent team-matching algorithms that connect complementary skill sets (e.g., frontend, backend, AI/ML, and UI/UX) across Indian campuses.\n• Cryptographically Verified Credentials: Every certificate and project showcase is backed by a permanent verifiable ID with dynamic QR validation for LinkedIn and resumes.\n• Strict Vetting & Guaranteed Prizes: Every competition undergoes thorough legal and institutional verification to prevent ghost hackathons, predatory IP clauses, or unfulfilled prize pools.\n• Deep Campus Integration: Direct collaboration with student clubs, IEEE/ACM chapters, and Google Developer Groups (GDG) across Tier-1, Tier-2, and Tier-3 institutions pan-India.\n• End-to-End Execution: Comprehensive tooling covering team formation, live git-commit tracking, multi-round judging, and direct interview pipelines.',
      },
      {
        q: 'Is NEXZEN available pan-India?',
        a: 'Absolutely. NEXZEN operates pan-India, serving students across all 28 States and 8 Union Territories.\n\nOur platform is actively used in premier national institutes (IITs, NITs, IIITs, BITS) as well as state government universities, autonomous colleges, and rural engineering institutes. We host both virtual (online) hackathons accessible from anywhere with internet connectivity and offline/hybrid hackathons in major technological hubs such as Bengaluru, Hyderabad, Delhi-NCR, Pune, Chennai, Mumbai, and Kolkata.',
      },
      {
        q: 'Does NEXZEN organize its own hackathons?',
        a: 'Yes. In addition to powering events hosted by universities, student tech clubs, and enterprise brands, NEXZEN hosts signature flagship nationwide hackathons throughout the academic year.\n\nThese include the annual NEXZEN National Innovation Championship, seasonal collegiate code sprints, and domain-focused challenges in Generative AI, Web3/DeFi, ClimateTech, FinTech, and Open-Source Infrastructure. All NEXZEN flagship events feature verified industry mentors, national jury panels, and substantial cash prize pools.',
      },
      {
        q: 'How can I report a bug or suggest a feature?',
        a: 'We actively welcome feedback from our community to continuously improve the platform:\n\n• In-App Feedback: Use the feedback widget or submit details via our Contact Support page.\n• Direct Email: Reach out to our engineering team at support@nexzen.in or product@nexzen.in.\n• Community Channels: Join our official NEXZEN Discord Community and post in the #bug-reports or #feature-requests channels.\n\nIf you are reporting a bug, please include your operating system, browser, relevant screenshots, and reproducible steps. For security disclosures, please refer to our Responsible Vulnerability Disclosure policy.',
      },
      {
        q: 'Do I need prior coding or hackathon experience to get started?',
        a: 'Not at all! Over 40% of participants on NEXZEN are first-time hackathon attendees. Hackathons are collaborative learning environments designed to help you build rapid problem-solving skills under mentorship.\n\nFurthermore, competitive teams require a balanced mix of skills beyond raw coding—including UI/UX prototyping, product strategy, market validation, research, and pitching. We also provide starter kits, domain workshops, and beginner-friendly tracks to help new hackers thrive.',
      },
    ],
  },
  {
    category: 'Hackathons & Applications',
    items: [
      {
        q: 'How do I apply to a hackathon?',
        a: 'Applying on NEXZEN is simple and transparent:\n\n1. Browse opportunities on the Discover Hackathons page using domain, mode, and eligibility filters.\n2. Review the hackathon overview page for rules, problem statements, key milestones, and judging criteria.\n3. Click "Apply Now" to initiate your application.\n4. Complete the multi-step form by entering your team details, selecting problem tracks, outlining your project concept (if required for initial screening), and linking your portfolio/GitHub.\n5. Submit your application and monitor real-time review progress under "My Applications" on your dashboard.',
      },
      {
        q: 'Can I apply individually (solo)?',
        a: 'Yes, depending on the guidelines set by each individual hackathon organizer. Many algorithmic contests, capture-the-flag (CTF) challenges, and rapid development sprints permit solo applications.\n\nFor hackathons that mandate team participation, solo students can submit an individual application and utilize NEXZEN\'s integrated Team Matcher to join an existing squad or recruit teammates before the registration deadline.',
      },
      {
        q: 'How do I create or join a team?',
        a: 'You can form your team through two simple methods:\n\n• Create a Team: Navigate to Teams → Create Team, enter your team name, select the target hackathon, specify your tech stack and open roles, and generate a unique Team Invite Code or shareable link to invite peers.\n• Join an Existing Team: Browse open team listings on the Find Teammates portal, filter by hackathon or required skills, and click "Request to Join". Alternatively, enter the unique Invite Code shared by your team captain to join instantly.',
      },
      {
        q: 'What happens after I apply?',
        a: 'Once submitted, your application progresses through structured review stages:\n\n• Applied: Your application is safely logged in the organizer\'s portal.\n• Under Review: The organizer screening panel evaluates your team profile, technical strengths, and problem proposal.\n• Shortlisted / RSVP Required: You receive an email and dashboard notification to confirm your participation (RSVP) within a designated window (typically 48–72 hours).\n• Confirmed / Selected: You gain access to hackathon communication channels, API keys, submission portals, mentor booking slots, and event briefings.',
      },
      {
        q: 'Can I apply to multiple hackathons simultaneously?',
        a: 'Yes, there is no restriction on submitting applications to multiple hackathons simultaneously. Many students maintain multiple applications to maximize learning opportunities.\n\nHowever, ensure that the active hacking periods and demo presentation schedules do not conflict, especially for offline hackathons requiring mandatory on-campus attendance.',
      },
      {
        q: 'How are hackathons verified on NEXZEN?',
        a: 'To safeguard students against fraudulent events, predatory terms, or non-disbursed prize pools, NEXZEN\'s Trust & Safety committee rigorously screens every listing before public launch. We verify:\n\n• Organizer Legitimacy: Institutional authority, faculty advisor endorsement, or registered corporate entity verification.\n• Prize Guarantee: Proof of escrow or formal corporate backing for all advertised cash prizes.\n• 100% Student IP Ownership: Enforcing that all code, models, and intellectual property created by participants remain exclusively their own.\n• Code of Conduct & Transparent Rubrics: Clear evaluation matrices and anti-harassment policies.\n\nVerified events display the official "NEXZEN Verified" badge.',
      },
      {
        q: 'Can I withdraw or edit my application?',
        a: '• Editing: You can edit your application details, add teammates, or update track selections anytime prior to the stated deadline via My Applications → Edit Application.\n• Withdrawing: If your schedule changes, you can withdraw your application via your dashboard. Withdrawing responsibly frees up slots for waitlisted teams and protects your platform reliability score. Once applications close, submissions are locked.',
      },
      {
        q: 'What is the application review process?',
        a: 'Review workflows vary based on the hackathon format:\n\n• Open Admission: Automatic acceptance upon fulfilling registration prerequisites.\n• Curated Screening: Organizers evaluate participant profiles based on relevant technical experience, portfolio quality, GitHub commit consistency, and the novelty of your initial problem approach.\n• Multi-Stage Selection: Prestigious national hackathons frequently conduct an initial idea synopsis/deck screening round before shortlisting finalists for the 24–48 hour prototyping phase.',
      },
      {
        q: 'What are the rules regarding pre-existing code and plagiarism?',
        a: 'To ensure fair competition, all core software, business logic, and architectural code must be developed within the official hacking timeframe.\n\nParticipants are encouraged to leverage open-source packages, public APIs, UI component libraries, and cloud infrastructure. However, submitting pre-built commercial software or existing academic semester projects as original hackathon output is strictly prohibited. Submissions are screened with automated git analysis and plagiarism detection tools; violators face immediate disqualification.',
      },
    ],
  },
  {
    category: 'Teams & Collaboration',
    items: [
      {
        q: 'How does team matching work on NEXZEN?',
        a: 'NEXZEN\'s smart matchmaking engine analyzes your profile—evaluating primary technical proficiencies (e.g., Python, React, Go, Solidity, PyTorch), preferred roles (Frontend, Backend, AI/ML, UI/UX, Product Pitcher), and past hackathon achievements—to suggest complementary teammates.\n\nYou can browse open teams with active vacancies, filter by specific hackathon tracks, send direct join requests, and chat with team captains to assemble a balanced squad.',
      },
      {
        q: 'What is the minimum and maximum team size?',
        a: 'Team size constraints are established by individual event organizers, with standard guidelines as follows:\n\n• Minimum: 1 member (for solo-eligible challenges) or 2 members (for standard team challenges).\n• Maximum: Typically 4 members for software hackathons, with certain hardware, IoT, or cross-disciplinary challenges permitting up to 5 or 6 members.\n\nThe hackathon summary banner always displays the permissible team boundaries, and the platform automatically enforces these limits during registration.',
      },
      {
        q: 'Can I leave a team or remove a teammate?',
        a: '• Leaving a Team: Team members may voluntarily exit a team before the application deadline via the Team Management dashboard, provided they are not the sole registered team leader (team leaders must transfer leadership before exiting).\n• Removing a Member: Team captains can manage rosters and remove inactive members prior to the deadline lock.\n• Post-Deadline Freeze: Once the registration period closes, rosters are strictly frozen to protect competitive integrity and prevent unauthorized roster substitution.',
      },
      {
        q: 'How do I find teammates with specific skills?',
        a: 'Head to the "Find Teammates" portal on your dashboard. Use granular search filters to query candidates across India based on:\n\n• Specific Tech Stacks: Filter by technologies such as Next.js, Django, Rust, TensorFlow, Flutter, or Figma.\n• Functional Specialization: Search specifically for UI/UX Designers, ML Researchers, Smart Contract Devs, or Business Presenters.\n• Experience & Badges: Identify first-time hackers or seasoned hackathon winners with verified podium finishes.\n• College / Region: Connect with peers from your local university or collaborate across different institutions nationwide.',
      },
      {
        q: 'Can I be part of multiple teams in the same hackathon?',
        a: 'No. Within a single hackathon, a participant can only be registered with one team. You cannot submit multiple entries or represent conflicting teams in the same competition to preserve competitive integrity.\n\nYou are, however, fully permitted to be a member of different teams across separate, concurrent hackathons.',
      },
      {
        q: 'Can teammates be from different colleges or universities?',
        a: 'Yes! Unless an event is specifically labeled as an "Intra-College Hackathon" exclusive to students of a single campus, inter-college and cross-state collaborations are strongly supported and encouraged across NEXZEN.\n\nCombining diverse skill sets from different institutions frequently produces standout, award-winning projects.',
      },
      {
        q: 'What happens if a teammate becomes inactive or drops out during the hackathon?',
        a: 'If a teammate is unable to continue due to connectivity or unforeseen emergencies during an active hackathon, your remaining team members can continue hacking and submit the final build.\n\nAs long as your active roster satisfies the minimum team requirement, your submission will be fully eligible for jury scoring. Please disclose individual contributions accurately during the project submission and final presentation.',
      },
    ],
  },
  {
    category: 'Prizes & Results',
    items: [
      {
        q: 'How are results announced and evaluated?',
        a: 'Evaluation is conducted through transparent scoring rubrics (evaluating Innovation, Technical Depth, Usability, Practical Feasibility, and Presentation). When judging concludes:\n\n1. Finalists selected for live pitch rounds are announced via the event dashboard and live notification broadcasts.\n2. Official winners are revealed during the closing ceremony and simultaneously published on the hackathon\'s "Results & Showcase" tab on NEXZEN.\n3. Every participating team receives a digital scorecard summary, jury feedback notes (where enabled), and automated certificate access.',
      },
      {
        q: 'How are cash prizes distributed, and what is the timeline?',
        a: 'Cash prizes are disbursed securely either directly through verified institutional/corporate bank wire or via NEXZEN\'s escrow disbursement system:\n\n• Winner Verification & KYC: Winning team leads receive an automated prize claim form requiring valid government ID (such as PAN/Aadhaar) and verified bank account details (UPI/NEFT/IMPS).\n• Processing Timeline: Cash awards are typically disbursed within 14 to 45 business days following full verification, depending on institutional sponsorship cycles.\n• Member Allocation: Funds are remitted to the authorized team lead or disbursed equally among verified members based on the team\'s signed prize allocation agreement.',
      },
      {
        q: 'Can I appeal or dispute a judging decision?',
        a: 'The technical and creative scoring decisions rendered by the judging panel are final and binding. However, you may submit a formal dispute with NEXZEN Trust & Safety within 24 hours of result publication if you possess demonstrable evidence of:\n\n• Verifiable Plagiarism: Proof that a winning submission used pre-existing code, copyrighted assets, or uncredited external work.\n• Eligibility or Rule Violations: Ineligible participants, teams exceeding maximum headcount, or unauthorized external assistance.\n\nUpon review, if misconduct is substantiated, NEXZEN reserves the right to revoke awards, reallocate honors to runners-up, and sanction offending users.',
      },
      {
        q: 'Do all participants get certificates, and are they verifiable?',
        a: 'Yes. Every participant who successfully submits a valid project receives an official digital Certificate of Participation. Winning squads, track winners, and runners-up receive specialized Certificates of Excellence and digital podium badges.\n\nEvery certificate issued on NEXZEN features:\n• A unique cryptographic Certificate ID.\n• A dynamic, scannable QR code linking to an immutable public verification URL.\n• Direct 1-click sharing integration for LinkedIn Licenses & Certifications.',
      },
      {
        q: 'Are cash prizes subject to taxes in India (TDS)?',
        a: 'Yes. Under Section 194B and Section 194BA of the Indian Income Tax Act, prize winnings and awards from competitions exceeding ₹10,000 are subject to mandatory Tax Deducted at Source (TDS) at the statutory rate of 30% (plus applicable educational cess and surcharges).\n\nThe disbursing entity will remit the net prize amount and issue an official Form 16A TDS certificate to winners for their tax filing records. In-kind perks such as cloud credits, software licenses, and hardware kits are delivered without cash tax withholdings.',
      },
    ],
  },
  {
    category: 'Profile & Account',
    items: [
      {
        q: 'How do I complete my profile?',
        a: 'A complete, well-curated profile dramatically increases your visibility to team leaders, hackathon organizers, and corporate recruiters:\n\n• Head to Profile → Edit Profile.\n• Complete your basic information: full name, university, degree, branch, and anticipated year of graduation.\n• Highlight your core skills, frameworks, and technical domains (e.g., Full Stack, AI/ML, DevOps, CyberSecurity, Cloud).\n• Connect your external links: GitHub, LinkedIn, Twitter/X, LeetCode, and personal portfolio.\n• Upload a clean, updated resume in PDF format.\n\nStudents with 100% completed profiles receive up to 3x more team collaboration invites and higher shortlisting rates.',
      },
      {
        q: 'Can I upload my resume, and who can view it?',
        a: 'Yes! You can upload your resume (PDF format, up to 5MB) in your profile settings. Your resume is securely stored and is only accessible by:\n\n• Organizers of hackathons to which you submit an application, for participant qualification.\n• Verified enterprise sponsors and hiring partners of hackathons you enter, provided you opt in to career opportunities.\n\nYour resume is never exposed to public web crawlers or sold to third-party recruitment agencies.',
      },
      {
        q: 'Is my data secure on NEXZEN?',
        a: 'Security and data privacy are core architectural priorities at NEXZEN. We adhere strictly to the Digital Personal Data Protection (DPDP) Act, 2023.\n\nAll network communications are encrypted via TLS 1.3, and user data is stored using AES-256 encryption at rest. We never sell student data to third-party advertisers. You retain granular control over your profile visibility and communication preferences through your Privacy Settings.',
      },
      {
        q: 'How do I delete my account?',
        a: 'You retain full ownership of your data and can exercise your right to erasure at any time. Go to Settings → Account → Delete Account.\n\nUpon confirmation, your personal identity information, resume, and credentials will be permanently deleted from our active production database within 30 days. To preserve competitive record integrity, past public competition records and issued certificates will be permanently anonymized.',
      },
      {
        q: 'Can I have multiple accounts?',
        a: 'No. NEXZEN enforces a strict One-Person, One-Account policy. Maintaining multiple accounts to manipulate registration limits, apply under false identities, or distort voting/judging outcomes constitutes a direct violation of our Terms of Service.\n\nDetected duplicate accounts are subject to immediate permanent suspension and disqualification from active competitions.',
      },
      {
        q: 'How do I change my email or password?',
        a: 'You can update your credentials easily:\n\n• Password: Go to Settings → Security & Login to update your password with current password verification. If locked out, use the "Forgot Password" link on the login screen for an OTP/reset email.\n• Email Address: Because your email is tied to verified academic credentials and certificates, changing your email requires two-step verification across both your current and new addresses under Settings → Account Info.',
      },
      {
        q: 'What are NEXZEN Karma Points and Achievement Badges?',
        a: 'NEXZEN Karma Points and Badges recognize your technical contributions, community involvement, and hackathon milestones.\n\nYou earn Karma by completing profile milestones, submitting verified projects, placing on hackathon podiums, mentoring first-timers, and answering community questions. Earning high Karma unlocks platform perks such as early access to limited-seat hackathons, VIP mentor office hours, and exclusive invitations to closed corporate hiring drives.',
      },
    ],
  },
  {
    category: 'Organizers & Sponsors',
    items: [
      {
        q: 'How do I list and host a hackathon on NEXZEN?',
        a: 'Hosting your hackathon on NEXZEN connects your challenge with India\'s largest active student developer network:\n\n1. Click "Host a Hackathon" on the navbar or navigate to the Organizer Portal.\n2. Provide event parameters: organizing entity, eligibility criteria, problem statements, timeline, and prize pool.\n3. Submit your listing for safety review. Our organizer onboarding team will review your application within 24 to 48 hours and assist with portal setup, registration forms, and judging rubric configurations.\n4. Once verified, your hackathon goes live to over 100,000+ student developers across India.',
      },
      {
        q: 'How can companies and brands sponsor hackathons on NEXZEN?',
        a: 'NEXZEN offers turnkey partnership packages for enterprise brands, developer tooling providers, and recruitment teams:\n\n• Track & Challenge Sponsorship: Sponsor dedicated problem tracks (e.g., "Best Use of [Your Cloud / API / SDK]").\n• Developer Relations & Workshops: Host sponsored tech talks, developer workshops, and direct product demos.\n• Talent Pipeline & Hiring: Access curated resumes, inspect submitted GitHub repositories, and conduct on-platform technical interviews.\n\nVisit our Sponsors page or contact our partnership team directly at sponsors@nexzen.in to request our sponsorship deck.',
      },
      {
        q: 'Is there a platform fee for colleges and organizers?',
        a: 'Student-run university clubs, collegiate technical societies (e.g., IEEE, ACM, GDSC), and non-profit academic fests can list and run standard hackathons on NEXZEN completely free of charge.\n\nFor universities and enterprises requiring enterprise-grade features—such as custom domains, automated plagiarism screening, white-glove jury management, and dedicated on-call technical support—we offer flexible, affordable tiered plans. Contact partnerships@nexzen.in for details.',
      },
      {
        q: 'What analytics and management tools do organizers get?',
        a: 'The NEXZEN Organizer Suite provides comprehensive, real-time event analytics:\n\n• Registration Funnel: Real-time applicant counts, college representation distributions, geographic maps, and RSVP conversions.\n• Demographic & Skill Metrics: Aggregated breakdowns of applicant tech stacks, gender diversity ratios, and academic year distributions.\n• Submission Quality & Git Activity: Tracking team repo commits, milestone compliance, and submission completeness.\n• Jury & Scoring Analytics: Live leaderboard monitoring, normalized jury score distributions, and conflict-of-interest flagging.',
      },
      {
        q: 'Can I host a private, invite-only, or intra-college hackathon?',
        a: 'Yes! When creating your hackathon, you can specify event privacy:\n\n• Public: Open to all eligible students across India.\n• Institutional / Domain-Locked: Restrict registration exclusively to students with specific educational email domains (e.g., @iitd.ac.in or @vitstudent.ac.in).\n• Private / Invite-Only: Unlisted from the public discovery feed, accessible solely via private invitation tokens or pre-approved team lists. Ideal for internal university hackathons, corporate capstones, or classroom hack days.',
      },
      {
        q: 'What marketing and outreach support does NEXZEN provide to organizers?',
        a: 'When hosting a verified public hackathon on NEXZEN, organizers gain access to our extensive pan-India student reach:\n\n• Platform Promotion: High-visibility placement on the Discover page and featured carousel banners.\n• Targeted Newsletters: Direct email outreach to students tagged with relevant skills and domain interests.\n• Community Amplification: Dedicated announcements across NEXZEN\'s official Discord, Telegram, and social media channels.\n• Campus Ambassador Network: On-ground and virtual promotion across 500+ Indian university campuses through our verified Campus Ambassadors.',
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...FAQS.map((f) => f.category)];

  const filtered = FAQS
    .filter((cat) => activeCategory === 'all' || cat.category === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !search ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const totalResults = filtered.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-semibold text-nexzen-accent mb-4">
            <Sparkles size={14} />
            Knowledge Base & Help Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-nexzen-text tracking-tight mb-3">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-nexzen-muted text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about competing, building teams, winning prizes, and hosting events on India's #1 student hackathon platform.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nexzen-subtle pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs by keywords (e.g., prizes, team size, resume, TDS, certificates)..."
            className="input-base pl-11 pr-10 py-3 w-full text-sm sm:text-base rounded-xl border border-white/10 bg-nexzen-card/80 text-nexzen-text placeholder:text-nexzen-subtle focus:border-nexzen-accent/50 focus:outline-none transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-nexzen-muted hover:text-nexzen-text p-1 rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-8 items-center">
          {categories.map((c) => {
            const isActive = activeCategory === c;
            return (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-all capitalize ${
                  isActive
                    ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40 shadow-sm shadow-nexzen-accent/10'
                    : 'glass border-white/10 text-nexzen-muted hover:text-nexzen-text hover:border-white/20'
                }`}
              >
                {c === 'all' ? 'All Questions' : c}
              </button>
            );
          })}
        </div>

        {/* Results Info if searching */}
        {search && (
          <div className="text-xs text-nexzen-muted mb-6 flex items-center justify-between">
            <span>
              Showing <span className="text-nexzen-accent font-semibold">{totalResults}</span> result{totalResults === 1 ? '' : 's'} for "{search}"
            </span>
            <button
              onClick={() => setSearch('')}
              className="text-nexzen-accent hover:underline font-medium cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Accordion FAQ List */}
        <div className="space-y-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16 glass rounded-2xl border border-white/10 p-8">
              <HelpCircle size={40} className="mx-auto text-nexzen-subtle mb-3" />
              <p className="text-nexzen-text font-semibold text-lg mb-1">No matching questions found</p>
              <p className="text-nexzen-muted text-sm max-w-sm mx-auto mb-5">
                We couldn't find any results matching "{search}". Try searching with different keywords or browse our categories.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-nexzen-accent/20 text-nexzen-accent border border-nexzen-accent/30 text-xs font-semibold hover:bg-nexzen-accent/30 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filtered.map((cat) => (
              <div key={cat.category} className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-bold text-nexzen-accent uppercase tracking-wider">
                    {cat.category}
                  </p>
                  <span className="text-xs text-nexzen-subtle">({cat.items.length})</span>
                </div>
                <Accordion
                  allowMultiple
                  items={cat.items.map((item, i) => ({
                    id: `${cat.category}-${i}`,
                    trigger: (
                      <p className="font-semibold text-nexzen-text text-sm sm:text-base text-left">
                        {item.q}
                      </p>
                    ),
                    content: (
                      <div className="text-sm text-nexzen-muted leading-relaxed whitespace-pre-line pt-1">
                        {item.a}
                      </div>
                    ),
                  }))}
                />
              </div>
            ))
          )}
        </div>

        {/* Contact Support CTA Box */}
        <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8 text-center mt-16 bg-gradient-to-b from-white/[0.04] to-transparent shadow-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-nexzen-accent/15 text-nexzen-accent mb-4 border border-nexzen-accent/30">
            <HelpCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-nexzen-text mb-2">Still have questions?</h3>
          <p className="text-nexzen-muted text-sm max-w-md mx-auto mb-6">
            Can't find the answer you're looking for? Our community managers and hackathon coordinators are here to guide you every step of the way.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-nexzen-accent text-nexzen-bg font-semibold text-sm hover:brightness-110 transition-all shadow-md shadow-nexzen-accent/20"
            >
              Contact Support
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:support@nexzen.in"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-nexzen-text font-medium text-sm hover:border-white/20 hover:text-nexzen-accent transition-all"
            >
              <Mail size={16} />
              Email support@nexzen.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
