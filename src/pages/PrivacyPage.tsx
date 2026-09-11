import { motion } from 'framer-motion';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-nexzen-text mb-3">{title}</h2>
      <div className="text-nexzen-muted text-sm leading-7 space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-2">Privacy <span className="gradient-text">Policy</span></h1>
          <p className="text-nexzen-subtle text-sm mb-10">Last updated: September 2026</p>

          <div className="glass rounded-2xl border border-white/8 p-8">
            <Section title="1. Introduction">
              <p>NEXZEN ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.</p>
            </Section>

            <Section title="2. Information We Collect">
              <p><strong className="text-nexzen-text">Account Information:</strong> Name, email address, mobile number, college details, and password when you register.</p>
              <p><strong className="text-nexzen-text">Profile Information:</strong> Bio, skills, domains, social links, portfolio links, resume, and project information you voluntarily add to your profile.</p>
              <p><strong className="text-nexzen-text">Usage Data:</strong> Information about how you interact with our Platform, including pages visited, features used, and time spent.</p>
              <p><strong className="text-nexzen-text">Device Information:</strong> Browser type, operating system, IP address, and device identifiers.</p>
            </Section>

            <Section title="3. How We Use Your Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide and maintain the Platform and its features</li>
                <li>To personalize your hackathon discovery experience</li>
                <li>To send you notifications about applications, team requests, and hackathon updates</li>
                <li>To facilitate connections between students and hackathon organizers</li>
                <li>To improve our Platform and develop new features</li>
                <li>To comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="4. Information Sharing">
              <p>We share your profile information with hackathon organizers when you apply to their events. This includes your name, email, college, skills, and any information you include in your application.</p>
              <p>We do not sell your personal data to third parties. We may share aggregated, anonymized data with sponsors and partners for analytics purposes.</p>
              <p>We may disclose your information if required by law or to protect the safety and rights of our users.</p>
            </Section>

            <Section title="5. Data Security">
              <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the internet is 100% secure.</p>
            </Section>

            <Section title="6. Your Rights">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-nexzen-text">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-nexzen-text">Correction:</strong> Update inaccurate information via your profile settings</li>
                <li><strong className="text-nexzen-text">Deletion:</strong> Request deletion of your account and data</li>
                <li><strong className="text-nexzen-text">Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
              <p>To exercise these rights, contact us at <a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline">privacy@nexzen.in</a>.</p>
            </Section>

            <Section title="7. Cookies">
              <p>We use cookies and similar technologies to maintain your session, remember your preferences, and analyze Platform usage. You can control cookies through your browser settings.</p>
            </Section>

            <Section title="8. Data Retention">
              <p>We retain your account data as long as your account is active. You may request deletion of your account at any time. Some data may be retained for legal compliance purposes.</p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>NEXZEN is not intended for users under 16 years of age. We do not knowingly collect data from children under 16.</p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on the Platform.</p>
            </Section>

            <Section title="11. Contact Us">
              <p>For privacy-related questions, contact our Data Protection Officer at <a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline">privacy@nexzen.in</a>.</p>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
