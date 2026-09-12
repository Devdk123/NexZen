import { motion } from 'framer-motion';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-nexzen-text mb-3">{title}</h2>
      <div className="text-nexzen-muted text-sm leading-7 space-y-3">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-2">Terms of <span className="gradient-text">Service</span></h1>
          <p className="text-nexzen-subtle text-sm mb-10">Last updated: September 2026</p>

          <div className="glass rounded-2xl border border-white/8 p-8">
            <Section title="1. Acceptance of Terms">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement entered into by and between you, whether personally or on behalf of an entity (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;), and <strong className="text-nexzen-text">NEXZEN Platforms Private Limited</strong> (&ldquo;NEXZEN&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), governing your access to and use of India&apos;s #1 student hackathon platform, accessible via nexzen.in, our mobile interfaces, APIs, software services, matching algorithms, and associated communication channels (collectively, the &ldquo;Platform&rdquo;).
              </p>
              <p>
                By registering for an account, browsing hackathons, applying to participate in any event, submitting code or projects, forming teams, or interacting with organizers, mentors, or sponsors on the Platform, you acknowledge that you have read, understood, and irrevocably agree to be bound by these Terms, our <a href="/privacy" className="text-nexzen-accent hover:underline">Privacy Policy</a>, our Community Code of Conduct, and any contest-specific rules incorporated herein by reference.
              </p>
              <p>
                <strong className="text-nexzen-text">IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, YOU ARE EXPRESSLY PROHIBITED FROM USING THE PLATFORM AND MUST IMMEDIATELY DISCONTINUE USE.</strong> Continued utilization of any feature or service provided by NEXZEN constitutes your unconditional assent to these Terms.
              </p>
            </Section>

            <Section title="2. Definitions">
              <p>For the purposes of these Terms, the following capitalized terms shall have the respective meanings assigned to them below:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">&ldquo;Platform&rdquo;:</strong> The web application hosted at nexzen.in, all related subdomains, mobile applications, APIs, developer tools, telemetry pipelines, and infrastructure operated by NEXZEN.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;User&rdquo;:</strong> Any individual, student, academic faculty member, community leader, judge, mentor, corporate representative, or institutional administrator accessing or interacting with the Platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Participant&rdquo; or &ldquo;Hacker&rdquo;:</strong> A registered student or eligible alumnus who applies for, registers, or participates in any hackathon, bounty, ideathon, or engineering challenge hosted on the Platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Organizer&rdquo;:</strong> Any verified student tech club, university department, college society, developer non-profit, or corporate enterprise that lists, curates, administers, coordinates, or evaluates a hackathon on NEXZEN.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Sponsor&rdquo;:</strong> Any commercial corporation, developer tooling company, venture fund, or academic patron that provides financial prizes, recruitment opportunities, API credits, cloud infrastructure, swags, or mentoring for hackathons on the Platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;User Content&rdquo;:</strong> Any text, graphics, source code, repository links, pitch decks, demo recordings, project documentation, resumes, messages, reviews, or other materials uploaded, transmitted, or published by Users on the Platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Submission&rdquo; or &ldquo;Project&rdquo;:</strong> The prototype, software program, hardware schematic, algorithm, pitch presentation, and technical documentation developed and submitted by a Participant or Team for judging during an official hackathon timeline.
                </li>
                <li>
                  <strong className="text-nexzen-text">&ldquo;Hackathon&rdquo;:</strong> Any time-bound competitive, collaborative engineering, design, or business innovation event organized, hosted, or managed through NEXZEN.
                </li>
              </ul>
            </Section>

            <Section title="3. Eligibility">
              <p>
                NEXZEN is purposefully engineered to accelerate student innovation across India. By accessing the Platform, you represent and warrant that you satisfy the following mandatory qualification criteria:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Enrolled Students:</strong> You must be an actively enrolled undergraduate, postgraduate, diploma, or polytechnic student in good standing at a recognized Indian educational institution (including universities, colleges, and institutes recognized by UGC, AICTE, IoE, or state education boards). Secondary school students enrolled in classes 11 or 12 are also eligible where designated.
                </li>
                <li>
                  <strong className="text-nexzen-text">Recent Alumni Window:</strong> Individuals who have graduated from an accredited Indian higher educational institution within the preceding twenty-four (24) months from the date of hackathon registration remain eligible to participate in tracks designated for alumni or open categories.
                </li>
                <li>
                  <strong className="text-nexzen-text">Age Requirement:</strong> You must be at least sixteen (16) years of age. If you are between 16 and 18 years of age (&ldquo;Minor&rdquo; under applicable Indian laws), you represent and warrant that your parent or legal guardian has reviewed and agreed to these Terms on your behalf, consents to your participation, and assumes legal responsibility for all your actions, prizes, and compliance.
                </li>
                <li>
                  <strong className="text-nexzen-text">Institutional & Identity Verification:</strong> NEXZEN and event Organizers reserve the unconditional right to require authentication via institutional email addresses (such as <code>.edu</code>, <code>.ac.in</code>, or verified university domain names), valid physical student identity cards, government-issued photo IDs (Aadhaar, Passport, Voter ID), or bona fide letters issued by your college administration. Failure to supply authentic verification credentials upon request will result in immediate disqualification, forfeiture of prizes, and account suspension.
                </li>
              </ul>
            </Section>

            <Section title="4. Account Registration & Security">
              <p>
                To utilize the core features of NEXZEN, including applying to hackathons, creating team workspaces, and submitting projects, you must register for a personal user account.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Truthful Account Information:</strong> You agree to provide accurate, current, and complete registration data, including your legal name, contact email, mobile phone number, academic institution, graduation year, and technical skills. You must promptly update your profile whenever your information changes.
                </li>
                <li>
                  <strong className="text-nexzen-text">One Person, One Account:</strong> Each individual user is entitled to maintain exactly one (1) active personal account. Registering duplicate, fraudulent, or &ldquo;sockpuppet&rdquo; accounts to bypass application caps, game matchmaking, or manipulate voting is strictly forbidden and constitutes grounds for an immediate and permanent platform-wide ban.
                </li>
                <li>
                  <strong className="text-nexzen-text">Credential Confidentiality:</strong> You are solely responsible for maintaining the confidentiality of your authentication credentials, passwords, session cookies, and single-sign-on (SSO) tokens. You accept full accountability for all actions performed under your account credentials.
                </li>
                <li>
                  <strong className="text-nexzen-text">Compromise Notification:</strong> You must notify NEXZEN immediately at <a href="mailto:security@nexzen.in" className="text-nexzen-accent hover:underline">security@nexzen.in</a> upon discovering or suspecting any unauthorized access, security breach, or compromised credentials. NEXZEN disclaims all liability for any losses or damages caused by unauthorized account utilization.
                </li>
              </ul>
            </Section>

            <Section title="5. User Content & Intellectual Property">
              <p>
                We believe in empowering student creators and strongly champion developer ownership:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Retention of Participant Ownership:</strong> Unless explicitly declared otherwise in the official, published rulebook of a specific sponsored challenge prior to your registration, you and your teammates retain one hundred percent (100%) intellectual property ownership over all original code, architecture, algorithms, and design assets developed during a hackathon.
                </li>
                <li>
                  <strong className="text-nexzen-text">Limited License to NEXZEN:</strong> By submitting project materials, demo links, GitHub repositories, pitch slides, and profile details, you grant NEXZEN a non-exclusive, worldwide, royalty-free, perpetual, transferable, and sublicensable license to host, display, index, reproduce, publish, benchmark, and promote your submission, team roster, and project outcomes across the Platform, social media channels, case studies, and investor presentations.
                </li>
                <li>
                  <strong className="text-nexzen-text">Third-Party & Open-Source Compliance:</strong> You warrant that your User Content does not infringe upon any third-party patent, copyright, trademark, trade secret, or proprietary right. Any open-source dependencies or libraries utilized must be legitimately licensed under standard permissive or copyleft licenses (e.g., MIT, Apache 2.0, BSD, GPL) and properly credited. You must never submit proprietary code belonging to your college, employer, or commercial client without explicit written authorization.
                </li>
                <li>
                  <strong className="text-nexzen-text">NEXZEN Proprietary Assets:</strong> All proprietary software, matching algorithms, platform interfaces, graphic designs, trademarks, service marks, logos, and documentation comprising the NEXZEN platform are the sole intellectual property of NEXZEN Platforms Private Limited and are protected by Indian and international copyright and trademark laws.
                </li>
              </ul>
            </Section>

            <Section title="6. Hackathon Applications & Participation">
              <p>
                NEXZEN functions as an interactive technology intermediary connecting aspiring student builders with hackathon organizers and corporate sponsors:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Intermediary Status:</strong> NEXZEN facilitates listing, application intake, team coordination, project submission, and judging evaluation. NEXZEN is not the legal employer, joint venturer, or co-organizer of independent hackathons unless an event is explicitly branded and certified as an &ldquo;Official NEXZEN Flagship Event&rdquo;.
                </li>
                <li>
                  <strong className="text-nexzen-text">Sole Discretion of Organizers:</strong> Acceptance, shortlisting, waitlisting, mentor allocation, judging criteria, and finalist selection reside entirely within the autonomous, unfettered discretion of the designated Event Organizers. NEXZEN exercises no control over admission decisions and disclaims all liability regarding application rejections.
                </li>
                <li>
                  <strong className="text-nexzen-text">Prize Fulfillment & Tax Liability:</strong> All cash prizes, venture grants, employment/internship offers, hardware equipment, cloud service credits, and swag bundles are pledged and disbursed directly by Event Organizers and Sponsors. NEXZEN does not hold funds in escrow and bears no responsibility for delayed disbursements or unfulfilled sponsor pledges. All cash prizes awarded within the territory of India are subject to statutory Tax Deducted at Source (TDS) pursuant to Section 194B/194BA of the Indian Income Tax Act, 1961, as well as applicable PAN verification.
                </li>
                <li>
                  <strong className="text-nexzen-text">Original Work & Prohibition of Pre-Built Projects:</strong> All project code must be authored during the official hackathon duration, save for baseline public boilerplates or libraries permitted by the Organizer&apos;s rules. Submitting pre-built applications, purchasing third-party code, or hiring surrogate programmers constitutes severe fraud, resulting in instantaneous disqualification, prize revocation, and a permanent ban across NEXZEN.
                </li>
              </ul>
            </Section>

            <Section title="7. Team Formation & Collaboration">
              <p>
                Collaboration is at the core of the hackathon ethos. When utilizing NEXZEN&apos;s team formation, matchmaking, and invite tools, you agree to the following standards:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Adherence to Team Size:</strong> Teams must strictly comply with the minimum and maximum member thresholds specified by the respective hackathon (typically 2 to 4 members). Enrolling &ldquo;ghost&rdquo; teammates or substituting members post-registration without express organizer approval is prohibited.
                </li>
                <li>
                  <strong className="text-nexzen-text">Joint and Several Responsibility:</strong> Every registered member of a team is jointly and severally responsible for the originality, ethics, and legality of the project submitted under their team banner. A code plagiarism infraction committed by one member warrants the disqualification of the entire team.
                </li>
                <li>
                  <strong className="text-nexzen-text">Internal Team Governance:</strong> NEXZEN does not intervene in or mediate internal team disputes concerning leadership hierarchy, credit attribution, work distribution, or prize money allocation. Teams are urged to settle collaboration agreements internally prior to final submission.
                </li>
              </ul>
            </Section>

            <Section title="8. Code of Conduct">
              <p>
                NEXZEN enforces a strict, zero-tolerance policy against harassment, hostility, and unethical conduct. All Users—including participants, judges, organizers, and campus leads—must conduct themselves with utmost integrity:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Respect and Inclusivity:</strong> We are committed to providing a safe, inclusive, and harassment-free environment regardless of gender, sexual orientation, disability, physical appearance, caste, race, religion, geographic origin, or technical experience.
                </li>
                <li>
                  <strong className="text-nexzen-text">Prohibited Conduct:</strong> Harassment, stalking, intimidation, sexualized imagery, unwelcome sexual advances, derogatory or offensive commentary, sustained disruption of talks or judging sessions, and publishing another person&apos;s private data without consent (&ldquo;doxxing&rdquo;) are strictly prohibited.
                </li>
                <li>
                  <strong className="text-nexzen-text">Academic & Competitive Honesty:</strong> Misleading judges regarding feature completeness, faking API responses without disclosure, sabotaging peer teams&apos; infrastructure, or colluding to bias community voting scores will result in punitive action.
                </li>
                <li>
                  <strong className="text-nexzen-text">Reporting & Enforcement:</strong> Violations should be reported immediately to <a href="mailto:conduct@nexzen.in" className="text-nexzen-accent hover:underline">conduct@nexzen.in</a>. NEXZEN reserves the unilateral right to issue formal reprimands, cancel prize eligibility, expel individuals from current hackathons, and terminate platform accounts.
                </li>
              </ul>
            </Section>

            <Section title="9. Prohibited Activities">
              <p>
                In connection with your access to or use of the Platform, you expressly agree that you shall NOT, under any circumstances, engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Automated Scraping & Harvesting:</strong> Systematic retrieval of data, resumes, user profiles, college listings, email addresses, or recruiter directories using bots, scrapers, spiders, crawlers, or automated scripts without prior written consent from NEXZEN.
                </li>
                <li>
                  <strong className="text-nexzen-text">Reverse Engineering:</strong> Decompiling, disassembling, reverse-engineering, deciphering, or otherwise attempting to derive source code, underlying algorithms, or proprietary telemetry of the Platform.
                </li>
                <li>
                  <strong className="text-nexzen-text">Security Exploitation:</strong> Probing, scanning, or testing vulnerabilities of our infrastructure; launching denial-of-service (DDoS) attacks; executing SQL injection, Cross-Site Scripting (XSS), or session spoofing attacks; or interfering with server operations outside authorized bug bounty engagements.
                </li>
                <li>
                  <strong className="text-nexzen-text">Sybil & Vote Manipulation:</strong> Creating synthetic identities, using click-farms, deploying automated vote bots, or orchestrating coordinated voting rings to falsify peer-review leaderboards or audience choice standings.
                </li>
                <li>
                  <strong className="text-nexzen-text">Malicious Code Distribution:</strong> Uploading or linking to software repositories containing trojans, ransomware, worms, spyware, logic bombs, cryptominers, or any code designed to infect or compromise host environments or judging sandbox environments.
                </li>
                <li>
                  <strong className="text-nexzen-text">Impersonation & Fraud:</strong> Falsely claiming affiliation with any academic institution, company, government agency, organizer, mentor, or NEXZEN administrator, or misrepresenting your academic credentials and graduation year.
                </li>
                <li>
                  <strong className="text-nexzen-text">Commercial Solicitation & Spam:</strong> Distributing unsolicited commercial advertisements, pyramid schemes, chain letters, multi-level marketing campaigns, cryptocurrency promotions, or mass marketing messages across student directories or community channels.
                </li>
                <li>
                  <strong className="text-nexzen-text">Circumvention of Sanctions:</strong> Bypassing active account suspensions or IP bans through virtual private networks (VPNs), alternate identity documents, or proxy services.
                </li>
              </ul>
            </Section>

            <Section title="10. Third-Party Links & Services">
              <p>
                The Platform provides integrations and hyperlinks to external third-party applications, services, and websites, including but not limited to GitHub, GitLab, Figma, Devpost, Discord, Telegram, Google Cloud, AWS, Supabase, Vercel, and various online payment gateways.
              </p>
              <p>
                NEXZEN does not inspect, monitor, control, or endorse any third-party resources, nor do we make any guarantees regarding their security, uptime, or data handling standards. Your interactions with third-party tools are governed solely by their respective terms of service and privacy documentation. NEXZEN disclaims all liability for any loss, damage, or legal dispute arising from your access to or reliance on third-party services.
              </p>
            </Section>

            <Section title="11. Disclaimer of Warranties">
              <p>
                <strong className="text-nexzen-text">
                  THE PLATFORM, ITS FEATURES, HACKATHON DIRECTORIES, MATCHMAKING ENGINES, APPLICATION WORKFLOWS, AND ALL CONTENT ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, OR STATUTORY.
                </strong>
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, NEXZEN EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO: (A) IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT; (B) WARRANTIES THAT THE PLATFORM WILL OPERATE UNINTERRUPTED, SECURELY, OR ERROR-FREE, OR THAT DEFECTS WILL BE TIMELY CORRECTED; (C) WARRANTIES AS TO THE ACCURACY, RELIABILITY, OR COMPLETENESS OF HACKATHON DETAILS, DATES, PRIZE AMOUNTS, OR ORGANIZER ACCREDITATIONS; AND (D) WARRANTIES REGARDING ANY CAREER OUTCOMES, INTERNSHIP PLACEMENTS, JOB OFFERS, PRIZE DISBURSEMENTS, OR VENTURE FUNDING.
              </p>
              <p>
                YOUR ACCESS TO AND USE OF THE PLATFORM IS UNDERTAKEN AT YOUR OWN VOLITION AND SOLE RISK. NO ORAL OR WRITTEN ADVICE OR INFORMATION OBTAINED FROM NEXZEN OR THROUGH THE PLATFORM SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN.
              </p>
            </Section>

            <Section title="12. Limitation of Liability">
              <p>
                <strong className="text-nexzen-text">
                  TO THE FULLEST EXTENT PERMITTED BY APPLICABLE INDIAN LAW, IN NO EVENT SHALL NEXZEN PLATFORMS PRIVATE LIMITED, ITS DIRECTORS, FOUNDERS, EMPLOYEES, AGENTS, INVESTORS, OR AFFILIATES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES WHATSOEVER.
                </strong>
              </p>
              <p>
                THIS EXCLUSION ENCOMPASSES, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF REPUTATION, LOSS OF DATA, LOSS OF ACADEMIC STANDING, WORK STOPPAGE, COMPUTER SYSTEM DAMAGE, OR FAILURE OF AN ORGANIZER OR SPONSOR TO HONOR EVENT REWARDS OR INTERNSHIP OFFERS, EVEN IF NEXZEN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, NEXZEN&apos;S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE PLATFORM, UNDER ANY CAUSE OF ACTION (WHETHER IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR BREACH OF STATUTORY DUTY), SHALL AT ALL TIMES BE STRICTLY LIMITED TO THE LESSER OF: (A) THE TOTAL AMOUNT PAID BY YOU DIRECTLY TO NEXZEN IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE CLAIM, OR (B) INR 1,000 (INDIAN RUPEES ONE THOUSAND ONLY).
              </p>
            </Section>

            <Section title="13. Indemnification">
              <p>
                You agree to defend, indemnify, and hold harmless NEXZEN Platforms Private Limited, its parent entity, subsidiaries, affiliates, officers, directors, campus ambassadors, mentors, and employees from and against any and all claims, liabilities, damages, losses, penalties, fines, judgments, costs, and expenses (including reasonable legal fees and court expenses) arising out of or related to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your access to, use of, or activities on the Platform;</li>
                <li>Any User Content, code, project submission, repository, or materials submitted by you or your hackathon teammates;</li>
                <li>Your breach or alleged violation of any provision of these Terms, the Code of Conduct, or referenced policies;</li>
                <li>Your infringement, misappropriation, or violation of any third-party intellectual property, privacy, confidentiality, or statutory right;</li>
                <li>Any dispute or conflict between you and any hackathon organizer, sponsor, mentor, teammate, or third-party service provider; or</li>
                <li>Your violation of any applicable municipal, state, national, or international statute, rule, or administrative regulation.</li>
              </ul>
              <p>
                NEXZEN reserves the right, at your expense, to assume exclusive defense and control of any matter otherwise subject to indemnification by you, and you agree to cooperate fully with our legal defense.
              </p>
            </Section>

            <Section title="14. Governing Law & Jurisdiction">
              <p>
                These Terms of Service and your relationship with NEXZEN shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong className="text-nexzen-text">Republic of India</strong>, without regard to its principles of conflict of laws.
              </p>
              <p>
                The Platform operates in full compliance with applicable Indian legislations, including the <strong className="text-nexzen-text">Information Technology Act, 2000</strong>, the <strong className="text-nexzen-text">Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, and the <strong className="text-nexzen-text">Digital Personal Data Protection Act, 2023 (DPDP)</strong>.
              </p>
              <p>
                Subject to the mandatory arbitration provisions outlined in Section 15 below, you and NEXZEN agree to submit to the exclusive personal and subject-matter jurisdiction of the competent courts located in <strong className="text-nexzen-text">Mumbai, Maharashtra, India</strong> for the resolution of any judicial claims, injunctive relief, or legal controversies.
              </p>
            </Section>

            <Section title="15. Dispute Resolution & Arbitration">
              <p>
                Please read this section carefully, as it governs the resolution of disputes through binding individual arbitration:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-nexzen-text">Mandatory Informal Conciliation:</strong> In the event of any controversy, claim, or dispute arising out of or relating to these Terms or the Platform, you and NEXZEN agree to first attempt to settle the matter amicably through good-faith informal negotiations for a period of no less than thirty (30) days by delivering a written notice of dispute to <a href="mailto:legal@nexzen.in" className="text-nexzen-accent hover:underline">legal@nexzen.in</a>.
                </li>
                <li>
                  <strong className="text-nexzen-text">Binding Arbitration:</strong> If the dispute is not successfully resolved through informal conciliation within thirty (30) calendar days, it shall be referred to and finally resolved by binding arbitration administered under the provisions of the Indian <strong className="text-nexzen-text">Arbitration and Conciliation Act, 1996</strong> (as amended from time to time).
                </li>
                <li>
                  <strong className="text-nexzen-text">Arbitral Mechanics:</strong>
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>The arbitral tribunal shall consist of a sole arbitrator mutually appointed by both parties, or in the absence of mutual consent within 30 days, appointed by the High Court of Judicature at Bombay.</li>
                    <li>The legal seat and territorial venue of arbitration shall be <strong className="text-nexzen-text">Mumbai, Maharashtra, India</strong>.</li>
                    <li>The arbitration proceedings shall be conducted exclusively in the English language.</li>
                    <li>The arbitral award shall be in writing, final, conclusive, and binding upon both parties, and enforceable in any court of competent jurisdiction.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-nexzen-text">Class Action Waiver:</strong> All claims, disputes, and arbitrations under these Terms must be brought in an individual capacity and not as a plaintiff, class member, or representative in any purported class, collective, or representative proceeding.
                </li>
              </ul>
            </Section>

            <Section title="16. Modifications to Terms">
              <p>
                NEXZEN reserves the right, in its sole and unfettered discretion, to update, modify, add, or remove portions of these Terms of Service at any time to accommodate platform advancements, statutory enactments, cybersecurity improvements, or operational evolutions.
              </p>
              <p>
                We will indicate significant changes by revising the &ldquo;Last updated&rdquo; timestamp at the top of this document. In the case of material alterations that affect your legal rights, we will provide additional advance notice, such as displaying a prominent modal banner on the Platform dashboard or transmitting an announcement to your registered email address.
              </p>
              <p>
                Your continued access to or utilization of the Platform following the publication of revised Terms establishes your conclusive and irrevocable acceptance of the modified Terms. If you object to any amendments, your sole and exclusive remedy is to discontinue your use of NEXZEN and delete your account.
              </p>
            </Section>

            <Section title="17. Severability & Non-Waiver">
              <p>
                <strong className="text-nexzen-text">Severability:</strong> If any provision, clause, or covenant of these Terms is determined by an arbitral tribunal or court of competent jurisdiction to be invalid, void, illegal, or unenforceable, such provision shall be severed or modified to the minimum extent necessary to make it enforceable, and all remaining provisions of these Terms shall continue in full force, validity, and effect.
              </p>
              <p>
                <strong className="text-nexzen-text">Non-Waiver:</strong> No failure, forbearance, or delay by NEXZEN in exercising any right, power, or legal remedy under these Terms shall operate as a waiver thereof, nor shall any single or partial exercise of any right preclude any other or further exercise of any other right or remedy.
              </p>
            </Section>

            <Section title="18. Entire Agreement">
              <p>
                These Terms of Service, along with our <a href="/privacy" className="text-nexzen-accent hover:underline">Privacy Policy</a>, Community Guidelines, and any individual hackathon participation agreements entered into on the Platform, constitute the entire, complete, and exclusive agreement between you and NEXZEN Platforms Private Limited regarding your use of the Platform.
              </p>
              <p>
                These Terms supersede and extinguish all prior or contemporaneous understandings, proposals, agreements, representations, and communications, whether oral or written, between you and NEXZEN with respect to the Platform.
              </p>
            </Section>

            <Section title="19. Grievance Redressal & Contact Information">
              <p>
                In compliance with the <strong className="text-nexzen-text">Information Technology Act, 2000</strong> and Rule 3(2) of the <strong className="text-nexzen-text">Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, NEXZEN has established a formal Grievance Redressal mechanism.
              </p>
              <p>
                If you have any questions regarding these Terms, seek legal clarifications, or wish to file a formal complaint or grievance regarding platform content or user conduct, please reach out to our designated Grievance Officer:
              </p>

              <div className="bg-white/4 rounded-xl border border-white/8 p-5 space-y-2 mt-4">
                <p className="text-nexzen-text font-semibold">Grievance Officer &amp; Legal Compliance Desk</p>
                <p><strong className="text-nexzen-text">Corporate Entity:</strong> NEXZEN Platforms Private Limited</p>
                <p><strong className="text-nexzen-text">Registered Office:</strong> Level 5, Tech Innovation Hub, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India</p>
                <p><strong className="text-nexzen-text">Legal &amp; Grievance Email:</strong> <a href="mailto:legal@nexzen.in" className="text-nexzen-accent hover:underline">legal@nexzen.in</a> / <a href="mailto:grievance@nexzen.in" className="text-nexzen-accent hover:underline">grievance@nexzen.in</a></p>
                <p><strong className="text-nexzen-text">General Support:</strong> <a href="mailto:support@nexzen.in" className="text-nexzen-accent hover:underline">support@nexzen.in</a></p>
                <p className="text-xs text-nexzen-subtle pt-2">
                  Statutory Turnaround: As required by Indian law, all grievances are formally acknowledged within twenty-four (24) hours of receipt and addressed within fifteen (15) days.
                </p>
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
