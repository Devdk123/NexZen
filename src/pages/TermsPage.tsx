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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-2">Terms of <span className="gradient-text">Service</span></h1>
          <p className="text-nexzen-subtle text-sm mb-10">Last updated: September 2026</p>

          <div className="glass rounded-2xl border border-white/8 p-8">
            <Section title="1. Acceptance of Terms">
              <p>By accessing or using NEXZEN ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform.</p>
              <p>These terms apply to all users of the Platform, including students, hackathon organizers, and sponsors.</p>
            </Section>

            <Section title="2. Eligibility">
              <p>You must be a currently enrolled student (or recent graduate within 2 years) at an accredited educational institution to use NEXZEN as a student. Hackathon organizers and sponsors may register separately.</p>
              <p>You must be at least 16 years of age to use the Platform.</p>
            </Section>

            <Section title="3. User Accounts">
              <p>You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activities that occur under your account.</p>
              <p>You must provide accurate, current, and complete information during registration. NEXZEN reserves the right to suspend accounts with inaccurate information.</p>
            </Section>

            <Section title="4. User Content">
              <p>You retain ownership of all content you submit to NEXZEN, including your profile information, project links, and portfolio items.</p>
              <p>By submitting content, you grant NEXZEN a non-exclusive, worldwide, royalty-free license to display and distribute that content as part of the Platform's services.</p>
              <p>You may not post content that is illegal, harmful, defamatory, or infringes on the intellectual property rights of others.</p>
            </Section>

            <Section title="5. Hackathon Applications">
              <p>NEXZEN facilitates connections between students and hackathon organizers. We are not responsible for the conduct of organizers or the outcomes of hackathons.</p>
              <p>Acceptance or rejection from a hackathon is at the sole discretion of the organizer. NEXZEN does not influence or guarantee admission.</p>
            </Section>

            <Section title="6. Prohibited Activities">
              <ul className="list-disc pl-5 space-y-1">
                <li>Creating fake or misleading profiles</li>
                <li>Spamming other users or organizers</li>
                <li>Attempting to hack or reverse-engineer the Platform</li>
                <li>Using the Platform for commercial solicitation without authorization</li>
                <li>Impersonating another person or entity</li>
              </ul>
            </Section>

            <Section title="7. Termination">
              <p>NEXZEN reserves the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.</p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>NEXZEN is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Platform.</p>
            </Section>

            <Section title="9. Changes to Terms">
              <p>We may modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.</p>
            </Section>

            <Section title="10. Contact">
              <p>For questions about these Terms, contact us at <a href="mailto:legal@nexzen.in" className="text-nexzen-accent hover:underline">legal@nexzen.in</a>.</p>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
