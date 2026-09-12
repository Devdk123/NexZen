import { motion } from 'framer-motion';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 pb-8 border-b border-white/5 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="text-xl font-bold text-nexzen-text mb-4 tracking-tight">{title}</h2>
      <div className="text-nexzen-muted text-sm leading-7 space-y-3.5">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-nexzen-accent/10 text-nexzen-accent border border-nexzen-accent/20 mb-3">
              Data Protection & Privacy Governance
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-nexzen-text tracking-tight mb-2">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-nexzen-subtle text-sm">
              Effective Date: September 1, 2026 &bull; Last updated: September 2026
            </p>
          </div>

          <div className="glass rounded-2xl border border-white/8 p-8">
            {/* 1. Introduction & Scope */}
            <Section title="1. Introduction & Scope">
              <p>
                Welcome to <strong className="text-nexzen-text">NEXZEN</strong> (&ldquo;NEXZEN&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), India&rsquo;s premier student hackathon discovery, team formation, project showcase, and developer recruiting platform, operated through our web portal located at <a href="https://nexzen.in" className="text-nexzen-accent hover:underline">nexzen.in</a>, subdomains, application programming interfaces (APIs), and related digital services (collectively, the &ldquo;Platform&rdquo;).
              </p>
              <p>
                NEXZEN is committed to safeguarding the privacy, confidentiality, and integrity of the personal data entrusted to us by our community. This Privacy Policy (&ldquo;Policy&rdquo;) articulates the categorical types of personal data we collect, the precise legal grounds and operational purposes for processing, the safeguards implemented to protect such data, and the legal rights guaranteed to you as a Data Principal under applicable data protection legislation.
              </p>
              <p>
                This Policy is enacted in strict compliance with the <strong className="text-nexzen-text">Digital Personal Data Protection Act, 2023 (DPDPA 2023)</strong>, the <strong className="text-nexzen-text">Information Technology Act, 2000 (IT Act)</strong>, the <strong className="text-nexzen-text">Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (&ldquo;SPDI Rules&rdquo;)</strong>, the <strong className="text-nexzen-text">Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, and aligns with international data protection benchmarks, including the <strong className="text-nexzen-text">General Data Protection Regulation (GDPR - Regulation (EU) 2016/679)</strong> where applicable to cross-border student participation.
              </p>
              <p>
                This Policy applies uniformly to all natural persons who visit, browse, create an account on, or utilize the Platform (&ldquo;Users&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;), encompassing student participants, college campus ambassadors, hackathon organizers, mentors, judges, university administrators, and corporate recruitment sponsors. By accessing or using the Platform, you acknowledge that you have read, understood, and consented to the data practices described herein.
              </p>
            </Section>

            {/* 2. Definitions */}
            <Section title="2. Definitions">
              <p>
                For the purposes of this Privacy Policy, capitalized terms shall possess the meanings ascribed below, in accordance with applicable statutory definitions under the DPDPA 2023, IT Act, and GDPR:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">&ldquo;Data Principal&rdquo;</strong> means the natural person to whom the personal data relates. In the context of NEXZEN, this includes registered student applicants, hackathon organizers, team members, mentors, judges, and platform visitors.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Data Fiduciary&rdquo;</strong> means NEXZEN Technologies Private Limited, which alone or in conjunction with other persons determines the purpose and means of processing personal data.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Data Processor&rdquo;</strong> means any entity or service provider that processes personal data on behalf of the Data Fiduciary pursuant to a direct contractual mandate.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Personal Data&rdquo;</strong> means any data about an individual who is identifiable by or in relation to such data, whether directly or indirectly, including identifiers such as name, contact information, IP address, and academic records.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Sensitive Personal Data or Information (SPDI)&rdquo;</strong> carries the meaning defined under Rule 3 of the IT SPDI Rules 2011, encompassing passwords, financial details (bank account/UPI data for prize disbursement), and official identity numbers.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Processing&rdquo;</strong> means a wholly or partly automated operation or set of operations performed on digital personal data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure by transmission, dissemination, restriction, erasure, or destruction.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Hackathon Organizer&rdquo;</strong> means accredited universities, academic departments, student developer clubs, non-profit technical societies, DAOs, or corporate institutions that list, manage, or host hackathons, competitions, or bounties on the Platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Consent Manager&rdquo;</strong> means an entity registered with the Data Protection Board of India that acts as a single point of contact to enable a Data Principal to give, manage, review, and withdraw consent through an accessible, transparent, and interoperable platform.
                </li>
              </ul>
            </Section>

            {/* 3. Information We Collect */}
            <Section title="3. Information We Collect">
              <p>
                NEXZEN adheres strictly to the principle of <strong className="text-nexzen-text">Data Minimization</strong>. We collect only the personal data that is strictly necessary to deliver, enhance, secure, and personalize our hackathon services. The data collected is categorized as follows:
              </p>

              <div className="space-y-4 mt-3">
                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.1 Account & Identity Information</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    When you register for an account, we collect your full legal name, preferred display username, primary personal email address, institutional/university email address (.edu, .ac.in, or affiliated domain), contact mobile telephone number, account avatar/profile photograph, and an encrypted hash of your chosen authentication password. Passwords are salted and hashed using cryptographic standards (Argon2id/bcrypt) and are never accessible in plain text.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.2 Academic, Educational & Demographic Information</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    To authenticate eligibility for student hackathon tracks, collegiate rankings, and campus-specific competitions, we collect your affiliated university/college/institution name, campus location, enrolled degree program (e.g., B.Tech, B.E., BCA, MCA, B.Sc, M.Tech, Ph.D.), academic branch or discipline, current year of study, expected graduation year, roll number/student registration ID, and, where voluntary or strictly required by high-stakes prize sponsors, a digital photograph or scan of your official college identity card for manual verification.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.3 Technical Profile, Portfolio & Recruitment Data</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    To empower teammate discovery, hackathon evaluation, and sponsor talent acquisition, we collect voluntary information you furnish on your developer profile, including your biographical summary, primary technical competencies, framework proficiencies, GitHub profile URL, GitLab/Bitbucket repository handles, LinkedIn profile URL, personal portfolio or blog URL, uploaded resumes/curricula vitae (in PDF or DOCX format), previous hackathon track records, project demo links, slide deck presentations, and repository submission URLs.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.4 Team Collaboration & Hackathon Application Data</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    When you create or join a hackathon squad, apply to a competition, or submit project deliverables, we collect team names, team invitation histories, role assignments (e.g., Frontend, Backend, AI/ML, UI/UX, Hardware), bespoke application question responses, custom problem statement selections, mentor guidance logs, judge evaluation scores, and intra-platform direct or team communications.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.5 Usage, Behavioral & Telemetry Data</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    We automatically record data regarding your interactions with the Platform, including specific hackathons viewed, search queries entered, filter parameters applied, saved/bookmarked events, application submission timestamps, notification interaction rates, session duration, clickstream paths, error diagnostics, and feature navigation patterns.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.6 Device & Technical Identifiers</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    Our servers automatically log your Internet Protocol (IP) address, coarse geographical location (country, state, and city level derived via IP lookup), unique device identifiers (UUIDs), browser family and version, operating system architecture, hardware model, display resolution, locale and preferred language, referring and exit Uniform Resource Locators (URLs), and time zone offsets.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.7 Financial & Prize Disbursement Information</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    In the event that you or your team win cash prizes, grants, or stipends through hackathons hosted or disbursed via NEXZEN, we collect necessary banking details including Account Beneficiary Name, Bank Account Number, IFSC Code, UPI Virtual Payment Address (VPA), and Permanent Account Number (PAN) strictly for statutory compliance with the Indian Income Tax Act, 1961 regarding Tax Deducted at Source (TDS) under Section 194B/194J.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">3.8 Third-Party Authentication & Integration Data</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    If you authenticate your account utilizing Single Sign-On (SSO) or OAuth 2.0 integrations through third-party services such as Google or GitHub, we receive your verified email address, public profile avatar, public repository metadata, and unique third-party user identifier, strictly within the boundaries of the permissions you authorize during the OAuth consent grant.
                  </p>
                </div>
              </div>
            </Section>

            {/* 4. Legal Basis for Processing */}
            <Section title="4. Legal Basis for Processing">
              <p>
                In compliance with Section 6 of the DPDPA 2023 and Article 6 of the GDPR, NEXZEN processes your personal data exclusively under the following valid legal frameworks:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Consent (Section 6, DPDPA 2023 / Article 6(1)(a), GDPR):</strong> Processing is grounded in your freely given, specific, informed, unconditional, and unambiguous consent, indicated through affirmative action when you register an account, upload a resume, opt in to corporate recruitment matchmaking, or submit an application to a hackathon. You retain the absolute statutory right to withdraw your consent at any time.
                </li>
                <li>
                  <strong className="text-nexzen-text">Contractual Necessity (Article 6(1)(b), GDPR / DPDPA Legitimate Uses):</strong> Processing is indispensable for the performance of our Terms of Service contract with you, specifically to provision your user profile, facilitate team matchmaking, register your participation in selected hackathons, transmit project deliverables to adjudicators, and verify prize distribution eligibility.
                </li>
                <li>
                  <strong className="text-nexzen-text">Legitimate Business Interests (Article 6(1)(f), GDPR / Section 7, DPDPA 2023):</strong> Processing is necessary for our legitimate interests or those of third parties, provided such interests are not overridden by your fundamental privacy rights. These interests include detecting and mitigating platform abuse, combating duplicate or sybil accounts, preventing software plagiarism, securing server infrastructure, analyzing aggregated telemetry, and enhancing user interface workflows.
                </li>
                <li>
                  <strong className="text-nexzen-text">Compliance with Legal & Statutory Obligations:</strong> Processing is required to fulfill statutory mandates under Indian law, including maintaining accounting records for financial audits, complying with Tax Deducted at Source (TDS) filings with the Central Board of Direct Taxes (CBDT), responding to lawful directives from law enforcement or judicial authorities under Section 91 of the Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita, and reporting cyber incidents to CERT-In pursuant to Section 70B of the Information Technology Act.
                </li>
              </ul>
            </Section>

            {/* 5. How We Use Your Information */}
            <Section title="5. How We Use Your Information">
              <p>
                NEXZEN utilizes your personal data strictly for targeted, legitimate operational purposes directly connected with India&rsquo;s student hackathon ecosystem. Specifically, we process your information:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">To Deliver Core Platform Functionality:</strong> Creating and administering your account, authenticating sign-in sessions, rendering your public or private developer profile, maintaining your saved hackathons list, and managing your team affiliations.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Facilitate Hackathon Applications & Selection:</strong> Transmitting your application dossier, resume, project links, and demographic details to verified hackathon organizers, mentors, and screening committees of events to which you explicitly apply.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Power Algorithmic Team Matchmaking:</strong> Processing your technical proficiencies, role preferences, college affiliation, and hackathon interests to suggest compatible teammates and vacant team slots, fostering diverse and balanced squads.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Manage Hackathon Submissions & Adjudication:</strong> Hosting your team&rsquo;s project repositories, pitch presentations, and demonstration videos, and providing secure portal access to appointed judges for grading and feedback compilation.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Facilitate Career Opportunities & Talent Recruitment:</strong> Where you have expressly opted in to recruiter outreach, sharing your verified developer profile, GitHub metrics, and resume with enterprise sponsors and recruiting partners seeking intern or entry-level software engineering talent.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Communicate Critical Operational Notices:</strong> Dispatching essential transactional communications, including application acceptance/shortlisting updates, submission deadline reminders, password reset verification tokens, team invitation notifications, and updates to our legal terms.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Disburse Prizes, Grants & Swag:</strong> Verifying winning teams, processing financial reimbursements, dispatching official digital merit certificates, coordinating physical swag deliveries, and executing statutory tax withholding documentation.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Safeguard Platform Integrity & Prevent Fraud:</strong> Monitoring and mitigating fraudulent behavior, duplicate account creation, automated scraping, distributed denial-of-service (DDoS) threats, intellectual property infringement, and code plagiarism.
                </li>
                <li>
                  <strong className="text-nexzen-text">To Conduct Research, Analytics & Service Enhancement:</strong> Generating anonymized, aggregate metrics on collegiate developer trends, skill adoption curves, and hackathon participation demographics to continually refine platform performance and user experience.
                </li>
              </ul>
            </Section>

            {/* 6. Information Sharing & Disclosure */}
            <Section title="6. Information Sharing & Disclosure">
              <div className="bg-nexzen-accent/5 border border-nexzen-accent/20 rounded-xl p-4 mb-4">
                <p className="text-xs text-nexzen-text font-medium">
                  <strong className="text-nexzen-accent">Our Strict Non-Sale Guarantee:</strong> NEXZEN does not sell, lease, rent, trade, or monetize your personal data or resumes to third-party data brokers, marketing agencies, or unsolicited advertisers under any circumstances.
                </p>
              </div>

              <p>
                We disclose your personal data solely in the limited operational circumstances detailed below, under robust contractual safeguards:
              </p>

              <div className="space-y-4 mt-3">
                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">6.1 Verified Hackathon Organizers & Adjudicators</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    When you register for, apply to, or participate in a hackathon hosted on the Platform, your application responses, name, institutional email, phone number, college details, resume, and submitted project code are shared directly with the designated organizers and official judges of that event. Organizers are bound by our Organizer Data Protection Addendum, requiring them to process participant data exclusively for event management, logistics, and fair evaluation.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">6.2 Event Sponsors & Recruiting Partners (Opt-In Only)</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    Certain hackathons feature corporate sponsors offering technical bounties, internships, or job interviews. If you expressly opt in to sponsor recruitment sharing or submit an entry to a designated sponsored challenge track, your profile, resume, GitHub handle, and project submission will be shared with the authorized talent acquisition team of that sponsor.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">6.3 Third-Party Technical Sub-Processors</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    We engage vetted third-party service providers to perform operational infrastructure functions on our behalf. These processors have access only to the data necessary to perform their specialized tasks and are contractually bound by rigorous Data Processing Agreements (DPAs) and confidentiality obligations:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-nexzen-muted">
                    <li><strong className="text-nexzen-text">Cloud Infrastructure & Databases:</strong> Supabase and Amazon Web Services (AWS) Asia-Pacific (Mumbai Region) for secure cloud database hosting, authentication, and object storage.</li>
                    <li><strong className="text-nexzen-text">Transactional Communications:</strong> Resend and Twilio for dispatching transactional authentication emails, system notifications, and SMS OTP verifications.</li>
                    <li><strong className="text-nexzen-text">Edge Networking & Cyber Defense:</strong> Cloudflare for content delivery network (CDN) acceleration, DDoS mitigation, and Web Application Firewall (WAF) security.</li>
                    <li><strong className="text-nexzen-text">Application Telemetry & Monitoring:</strong> Sentry for real-time error diagnostics and infrastructure uptime monitoring.</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">6.4 Statutory & Law Enforcement Authorities</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    We may disclose your personal data if we determine, in good faith, that such disclosure is reasonably necessary to: (a) comply with a valid court order, search warrant, judicial summons, or lawful directive issued by an authorized government agency or Indian law enforcement authority under Section 91 CrPC/BNSS or Section 69 of the IT Act; (b) investigate or remediate potential violations of our Terms of Service; (c) combat cyber-fraud, security incidents, or intellectual property theft; or (d) protect the life, safety, or legal rights of our users, employees, or the general public.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-nexzen-text mb-1">6.5 Business Restructuring & Corporate Transfers</h3>
                  <p className="text-xs text-nexzen-muted leading-6">
                    In the event that NEXZEN is involved in a corporate merger, acquisition, consolidation, asset divestiture, reorganization, or bankruptcy, user personal data may constitute a transferred operational asset. In any such transfer, we will mandate that the successor entity continue to uphold all representations, safeguards, and rights guaranteed under this Privacy Policy.
                  </p>
                </div>
              </div>
            </Section>

            {/* 7. Data Retention & Disposal Schedule */}
            <Section title="7. Data Retention & Disposal Schedule">
              <p>
                NEXZEN retains your personal data only for as long as is strictly necessary to fulfill the operational purposes for which it was originally collected, or as required by applicable statutory, tax, or regulatory retention mandates:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Active User Accounts:</strong> We retain your account data, profile details, and portfolio information for the entire duration that your account remains active, enabling you to continuously access your hackathon history, digital badges, and verified participation certificates.
                </li>
                <li>
                  <strong className="text-nexzen-text">Dormant Accounts:</strong> Accounts exhibiting zero authentication activity for a continuous period of thirty-six (36) consecutive months are scheduled for automated dormancy notification. If no response is received within thirty (30) days of notice, the profile is archived and personal identifiers are de-identified or permanently purged.
                </li>
                <li>
                  <strong className="text-nexzen-text">Hackathon Submissions & Project Records:</strong> Project submissions, team rosters, and competition leaderboards are retained indefinitely as an immutable historical record of competitive hackathon achievements, public verification of credentials, and portfolio showcase, unless a Data Principal explicitly submits a verified deletion request.
                </li>
                <li>
                  <strong className="text-nexzen-text">Financial & Tax Records:</strong> All financial disbursement records, PAN information, bank transfer logs, and TDS deduction files associated with cash prize payouts are preserved for a mandatory period of seven (7) financial years following the date of transaction, in strict compliance with Section 44AA of the Indian Income Tax Act, 1961.
                </li>
                <li>
                  <strong className="text-nexzen-text">Security & Server Telemetry Logs:</strong> Ephemeral server access logs, IP audit trails, and cybersecurity telemetry are retained for a minimum rolling period of one hundred and eighty (180) days to comply with the statutory cyber-incident reporting directives issued by CERT-In under Section 70B of the IT Act.
                </li>
                <li>
                  <strong className="text-nexzen-text">Permanent Cryptographic Disposal:</strong> Upon expiry of the retention schedule or upon valid execution of an erasure request, digital records are permanently expunged utilizing cryptographic shredding and multi-pass zero-overwrite techniques compliant with DoD 5220.22-M standards.
                </li>
              </ul>
            </Section>

            {/* 8. Data Security Measures */}
            <Section title="8. Data Security Measures">
              <p>
                NEXZEN enforces comprehensive administrative, physical, and technical safeguards engineered to protect personal data against accidental loss, unauthorized access, destruction, misuse, alteration, or unlawful disclosure, in accordance with Rule 5(8) of the IT SPDI Rules 2011 and Section 8(5) of the DPDPA 2023:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">End-to-End Cryptographic Encryption:</strong> All data transmitted between your browser and our Platform is secured via Transport Layer Security (TLS 1.3) protocols with HTTP Strict Transport Security (HSTS) enforced. Sensitive personal data at rest, including database records and object storage assets, is secured using Advanced Encryption Standard with 256-bit keys (AES-256).
                </li>
                <li>
                  <strong className="text-nexzen-text">Cryptographic Credential Hashing:</strong> User passwords are encrypted utilizing industry-standard salted hashing algorithms (Argon2id/bcrypt) with high computational cost factors, rendering stored passwords resilient against brute-force, rainbow table, and dictionary attacks.
                </li>
                <li>
                  <strong className="text-nexzen-text">Role-Based Access Control (RBAC):</strong> Access to production database clusters and administrative backend systems is restricted strictly according to the Principle of Least Privilege (PoLP). NEXZEN engineering personnel must utilize hardware-backed Multi-Factor Authentication (MFA) and encrypted VPN tunnels to access administrative portals.
                </li>
                <li>
                  <strong className="text-nexzen-text">Defensive Web Security & DDoS Mitigation:</strong> Our platform architecture is shielded by Cloudflare&rsquo;s enterprise Web Application Firewall (WAF), automated rate limiting, cross-site request forgery (CSRF) protection tokens, Content Security Policies (CSP), and continuous DDoS traffic filtering.
                </li>
                <li>
                  <strong className="text-nexzen-text">Vulnerability Assessment & Penetration Testing (VAPT):</strong> We conduct continuous static and dynamic application security testing (SAST/DAST) across all software deployment pipelines, supplemented by periodic third-party security audits and code vulnerability assessments.
                </li>
                <li>
                  <strong className="text-nexzen-text">Incident Response & CERT-In Compliance:</strong> We maintain a structured Cyber Incident Response Plan (CIRP). In the unlikely event of a security breach involving personal data, we will: (a) notify the Indian Computer Emergency Response Team (CERT-In) within six (6) hours of confirmation as mandated by law; (b) inform the Data Protection Board of India; and (c) notify affected Data Principals without undue delay along with remediation guidance.
                </li>
              </ul>
            </Section>

            {/* 9. Your Rights */}
            <Section title="9. Your Rights as a Data Principal">
              <p>
                In accordance with Chapter III of the DPDPA 2023 and Chapter III of the GDPR, you are invested with comprehensive statutory rights concerning your personal data held by NEXZEN. We provide transparent, self-service mechanisms and dedicated support to exercise these rights:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Right to Access & Summary:</strong> You have the right to request a clear, readily comprehensible summary of all personal data currently being processed about you, along with the specific identities of all third-party entities with whom your data has been shared.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right to Correction & Rectification:</strong> You are entitled to correct, update, or complete any inaccurate, out-of-date, or incomplete personal data. You can directly edit your academic, profile, and contact details anytime via your account settings dashboard or by contacting our team.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You have the statutory right to demand the permanent deletion and erasure of your personal data when such data is no longer necessary for the purpose for which it was collected, or when you withdraw your consent, subject to our statutory retention duties under taxation or cybersecurity laws.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right to Data Portability:</strong> You have the right to obtain a digital copy of your profile information, hackathon application history, and team project records in a structured, commonly used, and machine-readable format (e.g., JSON or CSV) for transfer to another platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right to Restrict or Object to Processing:</strong> You possess the right to object to or restrict the processing of your personal data for specific discretionary activities, including algorithmic recommendation modeling, career outreach matching, or marketing communications.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right to Withdraw Consent:</strong> Where processing is premised upon your explicit consent, you may revoke such consent at any time. Withdrawal of consent does not affect the legality of data processing carried out prior to the revocation, nor does it preclude processing mandated by contractual or statutory obligations.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right of Grievance Redressal:</strong> You have the right to lodge a formal grievance with our Grievance Officer regarding any act or omission concerning the performance of our obligations under data protection legislation.
                </li>
                <li>
                  <strong className="text-nexzen-text">Right to Nominate:</strong> Pursuant to Section 14 of the DPDPA 2023, you have the right to nominate any natural person who shall, in the event of your death or incapacity, exercise your rights as a Data Principal under the Act.
                </li>
              </ul>
              <p className="mt-3">
                To formally exercise any of the statutory rights enumerated above, please transmit a written Data Subject Request (DSR) to our Data Protection Officer at <a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline">privacy@nexzen.in</a>. We will authenticate your identity and fulfill verified requests within thirty (30) calendar days, free of charge.
              </p>
            </Section>

            {/* 10. Cookies & Tracking Technologies */}
            <Section title="10. Cookies & Tracking Technologies">
              <p>
                NEXZEN utilizes cookies, web beacons, local storage objects (HTML5 LocalStorage and SessionStorage), and similar tracking technologies to guarantee technical functionality, maintain secure sessions, and analyze platform performance:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Strictly Necessary Cookies:</strong> Essential for the technical operation and security of the Platform. These manage user authentication tokens, CSRF protection hashes, and load balancing across server nodes. The Platform cannot function properly without these cookies.
                </li>
                <li>
                  <strong className="text-nexzen-text">Functional & Preference Cookies:</strong> Enable the Platform to remember your persistent UI preferences, such as your dark/light theme mode, preferred dashboard filter views, and collapsed/expanded sidebar states.
                </li>
                <li>
                  <strong className="text-nexzen-text">Performance & Analytics Cookies:</strong> Collect aggregate, pseudonymous telemetry regarding page load latencies, error frequencies, and user navigation paths. This data enables our engineering team to diagnose bottlenecks and optimize user flows.
                </li>
              </ul>
              <p className="mt-3">
                <strong className="text-nexzen-text">Managing Cookie Preferences:</strong> You can configure or modify your browser settings to accept, block, or delete cookies at your discretion. Please be advised that disabling or deleting strictly necessary cookies will compromise session authentication and prevent you from accessing authenticated areas of the Platform.
              </p>
            </Section>

            {/* 11. Third-Party Services & Integrations */}
            <Section title="11. Third-Party Services & External Integrations">
              <p>
                The Platform features hyperlinks to external websites, third-party repositories, collegiate portals, and developer communication platforms, including GitHub, GitLab, LinkedIn, Discord, Slack, Figma, Devpost, Devfolio, and institutional university domains.
              </p>
              <p>
                NEXZEN exercises no operational governance, supervisory authority, or ownership over the privacy practices, terms, or content of external third-party entities. Clicking on any third-party link or authorizing a third-party developer integration subjects your interactions to the distinct privacy policies and terms of service of those respective platforms. We strongly urge you to review the privacy notices of any third-party service before disclosing personal information or proprietary code.
              </p>
            </Section>

            {/* 12. International Data Transfers */}
            <Section title="12. International & Cross-Border Data Transfers">
              <p>
                NEXZEN prioritizes local data residency. Our primary database servers, authentication clusters, and user records are hosted physically within data centers located within the territory of the <strong className="text-nexzen-text">Republic of India</strong> (AWS Asia-Pacific Mumbai Region).
              </p>
              <p>
                Where cross-border data transfer is necessary—such as when utilizing globally distributed content delivery networks (CDNs), edge security nodes, or transactional communication infrastructure—such transfers are executed in strict accordance with <strong className="text-nexzen-text">Section 16 of the DPDPA 2023</strong> and applicable central government notifications. Where data belonging to European Economic Area (EEA) or UK participants is transferred outside those jurisdictions, NEXZEN ensures an adequate level of data protection by executing Standard Contractual Clauses (SCCs) approved by the European Commission or relying on statutory adequacy decisions.
              </p>
            </Section>

            {/* 13. Children's Privacy (Under 16 & Under 18 Safeguards) */}
            <Section title="13. Children&rsquo;s Privacy (Under 16 & Under 18 Safeguards)">
              <p>
                NEXZEN is an advanced technical platform engineered specifically for collegiate, polytechnic, university, and graduate students. The Platform is <strong className="text-nexzen-text">not intended for individuals under sixteen (16) years of age</strong>. We do not knowingly solicit, collect, or process personal data from any person under the age of 16 without verifiable parental or institutional guardian consent.
              </p>
              <p>
                In strict adherence to <strong className="text-nexzen-text">Section 9 of the DPDPA 2023</strong> governing data principals who are minors (under 18 years of age):
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>NEXZEN does not engage in behavioral monitoring, profiling, or targeted advertising directed toward any minor user.</li>
                <li>NEXZEN does not process personal data in any manner that is likely to cause an adverse effect on the physical, emotional, or educational well-being of a minor.</li>
              </ul>
              <p className="mt-3">
                If we discover that we have inadvertently collected personal data from a child under 16 without lawful parental consent, we will promptly execute secure deletion procedures to purge such records from our databases. If you believe a minor under 16 has registered an account with us, please notify us immediately at <a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline">privacy@nexzen.in</a>.
              </p>
            </Section>

            {/* 14. Data Protection Officer */}
            <Section title="14. Data Protection Officer (DPO)">
              <p>
                In compliance with best governance practices and statutory mandates under the DPDPA 2023, NEXZEN has designated a qualified, senior <strong className="text-nexzen-text">Data Protection Officer (DPO)</strong> tasked with overseeing platform privacy compliance, conducting internal data protection impact assessments, liaising with regulatory authorities, and serving as the primary point of contact for Data Principals:
              </p>
              <div className="bg-white/5 border border-white/8 rounded-xl p-5 mt-3 space-y-1.5 text-xs">
                <p className="text-nexzen-text font-semibold text-sm">Data Protection Officer</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Designation:</span> Head of Legal & Data Governance</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Entity:</span> NEXZEN Technologies Private Limited</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Physical Address:</span> NEXZEN Campus, Level 4, Tech Park, Koramangala, Bengaluru, Karnataka 560095, India</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Official Inquiries:</span> <a href="mailto:dpo@nexzen.in" className="text-nexzen-accent hover:underline">dpo@nexzen.in</a></p>
              </div>
            </Section>

            {/* 15. Changes to Privacy Policy */}
            <Section title="15. Changes to this Privacy Policy">
              <p>
                NEXZEN reserves the right to periodically update, revise, or amend this Privacy Policy to reflect modifications in statutory enactments, judicial rulings, industry standards, technological infrastructure, or new Platform capabilities.
              </p>
              <p>
                When material modifications are enacted, we will provide conspicuous advance notice at least <strong className="text-nexzen-text">fifteen (15) calendar days</strong> prior to the effective date by: (a) publishing a prominent banner notification across the Platform dashboard; and (b) transmitting a direct electronic communication to your registered account email address. The &ldquo;Last updated&rdquo; timestamp at the pinnacle of this Policy will reflect the date of the latest iteration.
              </p>
              <p>
                Your continued access or use of the Platform following the effective date of an updated Privacy Policy constitutes your explicit acknowledgment of and agreement to the revised terms. If you do not agree with any revised terms, you may cease using the Platform and request account deletion prior to the effective date.
              </p>
            </Section>

            {/* 16. Grievance Redressal */}
            <Section title="16. Grievance Redressal Mechanism (Indian IT Act, 2000)">
              <p>
                In strict compliance with <strong className="text-nexzen-text">Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong> and <strong className="text-nexzen-text">Section 13 of the DPDPA 2023</strong>, NEXZEN has established a dedicated, statutory Grievance Redressal Mechanism to address any questions, concerns, or complaints regarding data privacy, content moderation, or rights violations:
              </p>
              <div className="bg-white/5 border border-white/8 rounded-xl p-5 mt-3 space-y-1.5 text-xs">
                <p className="text-nexzen-text font-semibold text-sm">Statutory Grievance Redressal Officer</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Name:</span> Rajeshwar Nair</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Designation:</span> Chief Grievance Officer & Director of Trust</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Entity:</span> NEXZEN Technologies Private Limited</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Registered Office:</span> Level 4, Tech Park, 100 Feet Road, Koramangala, Bengaluru, Karnataka 560095, India</p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Email Address:</span> <a href="mailto:grievance@nexzen.in" className="text-nexzen-accent hover:underline">grievance@nexzen.in</a></p>
                <p className="text-nexzen-muted"><span className="text-nexzen-text">Operating Hours:</span> Monday through Friday, 10:00 AM &ndash; 6:00 PM IST (excluding national holidays)</p>
              </div>
              <p className="mt-3">
                <strong className="text-nexzen-text">Statutory Resolution Service Level Agreement (SLA):</strong> In accordance with the IT Rules 2021, the Grievance Officer shall acknowledge receipt of your complaint within <strong className="text-nexzen-text">twenty-four (24) hours</strong> of submission and shall investigate, resolve, and communicate a comprehensive determination on the grievance within <strong className="text-nexzen-text">fifteen (15) calendar days</strong> from the date of receipt.
              </p>
              <p className="mt-2 text-xs text-nexzen-subtle">
                If you remain dissatisfied with the determination of the Grievance Officer, you retain the statutory prerogative to lodge an appeal with the Appellate Authority under the IT Rules or file a formal complaint before the <strong className="text-nexzen-text">Data Protection Board of India</strong> established under the DPDPA 2023.
              </p>
            </Section>

            {/* 17. Contact Information */}
            <Section title="17. Contact Information & Legal Notices">
              <p>
                For questions, clarifications, legal inquiries, or official statutory communications regarding this Privacy Policy or our broader data governance framework, please contact our specialized teams through the designated channels below:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="bg-white/5 border border-white/8 rounded-xl p-4 space-y-1">
                  <h4 className="text-sm font-semibold text-nexzen-text">General Privacy Inquiries</h4>
                  <p className="text-nexzen-muted">For general questions concerning this policy or personal data handling:</p>
                  <p><a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline font-medium">privacy@nexzen.in</a></p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4 space-y-1">
                  <h4 className="text-sm font-semibold text-nexzen-text">Data Protection Officer</h4>
                  <p className="text-nexzen-muted">For statutory DSR requests and high-level governance inquiries:</p>
                  <p><a href="mailto:dpo@nexzen.in" className="text-nexzen-accent hover:underline font-medium">dpo@nexzen.in</a></p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4 space-y-1">
                  <h4 className="text-sm font-semibold text-nexzen-text">Grievance Redressal</h4>
                  <p className="text-nexzen-muted">For formal disputes, escalation, and statutory grievance filings:</p>
                  <p><a href="mailto:grievance@nexzen.in" className="text-nexzen-accent hover:underline font-medium">grievance@nexzen.in</a></p>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-4 space-y-1">
                  <h4 className="text-sm font-semibold text-nexzen-text">Cybersecurity & Disclosures</h4>
                  <p className="text-nexzen-muted">To report security vulnerabilities or data incidents:</p>
                  <p><a href="mailto:security@nexzen.in" className="text-nexzen-accent hover:underline font-medium">security@nexzen.in</a></p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-nexzen-subtle">
                <p>
                  <strong className="text-nexzen-muted">Registered Corporate Entity:</strong> NEXZEN Technologies Private Limited &bull; CIN: U72900KA2025PTC184920 &bull; Bengaluru, Karnataka 560095, India.
                </p>
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
