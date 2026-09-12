import { motion } from 'framer-motion';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-nexzen-text mb-3">{title}</h2>
      <div className="text-nexzen-muted text-sm leading-7 space-y-3">{children}</div>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-nexzen-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-2">Cookie <span className="gradient-text">Policy</span></h1>
          <p className="text-nexzen-subtle text-sm mb-10">Last updated: September 2026</p>

          <div className="glass rounded-2xl border border-white/8 p-8">
            <Section title="1. What Are Cookies">
              <p>Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work efficiently, provide a better browsing experience, and supply analytical information to the website operators.</p>
              <p>Cookies may be set by the website you are visiting ("<strong className="text-nexzen-text">first-party cookies</strong>") or by third-party services that have content embedded on the page you are viewing ("<strong className="text-nexzen-text">third-party cookies</strong>").</p>
              <p>Similar technologies such as web beacons, pixel tags, local storage objects (LSOs), and browser fingerprinting may also be used by NEXZEN and are collectively referred to as "cookies" in this policy for convenience.</p>
            </Section>

            <Section title="2. How NEXZEN Uses Cookies">
              <p>NEXZEN Platforms Private Limited ("<strong className="text-nexzen-text">NEXZEN</strong>", "<strong className="text-nexzen-text">we</strong>", "<strong className="text-nexzen-text">us</strong>", or "<strong className="text-nexzen-text">our</strong>") uses cookies and similar tracking technologies on the NEXZEN platform (accessible at <a href="https://nexzen.in" className="text-nexzen-accent hover:underline">nexzen.in</a>) for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>To authenticate and maintain your user session securely</li>
                <li>To remember your preferences and settings (such as theme mode, language, and display preferences)</li>
                <li>To understand how visitors interact with our platform, enabling us to improve usability and performance</li>
                <li>To detect and prevent security threats, fraudulent activity, and abuse</li>
                <li>To deliver relevant sponsor content and hackathon recommendations based on your interests and domain preferences</li>
                <li>To measure the effectiveness of our marketing campaigns and referral programs</li>
                <li>To comply with legal obligations under applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDPA)</li>
              </ul>
            </Section>

            <Section title="3. Types of Cookies We Use">
              <div className="space-y-5">
                <div>
                  <p className="font-semibold text-nexzen-text mb-1">3.1 Strictly Necessary Cookies</p>
                  <p>These cookies are essential for the platform to function properly. Without them, certain features — such as logging in to your account, maintaining your session across pages, submitting hackathon applications, and processing team invitations — would not work. These cookies do not collect personally identifiable information for marketing purposes.</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-nexzen-text">Session Cookie</strong> — Maintains your authenticated session after login. Expires when you close your browser or after 24 hours of inactivity.</li>
                    <li><strong className="text-nexzen-text">CSRF Token</strong> — Protects against Cross-Site Request Forgery attacks by validating that form submissions originate from our platform.</li>
                    <li><strong className="text-nexzen-text">Security Cookie</strong> — Detects unusual login patterns, bot activity, and brute-force attempts using device fingerprinting and IP geolocation.</li>
                    <li><strong className="text-nexzen-text">Load Balancer Cookie</strong> — Ensures your requests are routed to the correct server instance for optimal performance.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-nexzen-text mb-1">3.2 Performance & Analytics Cookies</p>
                  <p>These cookies collect aggregated and anonymized information about how visitors use NEXZEN — which pages are visited most frequently, how users navigate the platform, and where errors occur. This data helps us identify pain points, optimize page load times, and improve the overall user experience.</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-nexzen-text">Google Analytics</strong> — Tracks page views, session duration, bounce rates, user acquisition channels, and conversion funnels. Data is anonymized via IP masking.</li>
                    <li><strong className="text-nexzen-text">Sentry</strong> — Captures frontend JavaScript errors, stack traces, and performance metrics (Core Web Vitals, Largest Contentful Paint, First Input Delay) to monitor platform stability and quality.</li>
                    <li><strong className="text-nexzen-text">Mixpanel / PostHog</strong> — Records anonymized event-level analytics such as button clicks, feature adoption rates, hackathon application flow completion rates, and team formation patterns.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-nexzen-text mb-1">3.3 Functionality Cookies</p>
                  <p>These cookies allow the platform to remember choices you make — such as your preferred language, theme (dark/light mode), notification settings, and previously viewed hackathons — so that your experience is personalized and consistent across sessions.</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-nexzen-text">Theme Preference</strong> — Remembers your selected display theme across visits.</li>
                    <li><strong className="text-nexzen-text">Notification Settings</strong> — Stores your preferences for email and push notification frequencies.</li>
                    <li><strong className="text-nexzen-text">Recently Viewed</strong> — Tracks hackathons and events you have recently browsed to provide personalized recommendations on the dashboard.</li>
                    <li><strong className="text-nexzen-text">Domain & Skill Filters</strong> — Remembers your preferred hackathon domain and skill filters to streamline your discovery experience.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-nexzen-text mb-1">3.4 Targeting & Advertising Cookies</p>
                  <p>NEXZEN may use targeting cookies to deliver relevant sponsor placements, hackathon recommendations, and personalized content based on your browsing behavior, domain interests, and application history. These cookies may be set by our advertising and sponsorship partners.</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong className="text-nexzen-text">Sponsor Placement Cookies</strong> — Enable corporate sponsors (e.g., Google, Microsoft, AWS) to display relevant opportunities, challenges, and brand messaging to users based on their stated technical interests and domain preferences.</li>
                    <li><strong className="text-nexzen-text">Social Media Cookies</strong> — Set by platforms such as LinkedIn, Twitter/X, and Instagram when you use social sharing buttons or when embedded social content is loaded on NEXZEN pages.</li>
                  </ul>
                  <p className="mt-2">You may opt out of targeted advertising at any time by adjusting your cookie preferences or contacting us at <a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline">privacy@nexzen.in</a>.</p>
                </div>
              </div>
            </Section>

            <Section title="4. Third-Party Cookies">
              <p>Certain cookies on our platform are placed by third-party service providers who assist us with analytics, security, content delivery, and advertising. These third parties have their own privacy and cookie policies, and we encourage you to review them:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-nexzen-text">Google LLC</strong> — Google Analytics, Google Tag Manager, reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">Google Privacy Policy</a></li>
                <li><strong className="text-nexzen-text">Cloudflare, Inc.</strong> — CDN, DDoS protection, Web Application Firewall, Bot Management. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">Cloudflare Privacy Policy</a></li>
                <li><strong className="text-nexzen-text">Sentry (Functional Software, Inc.)</strong> — Error tracking and application performance monitoring. <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">Sentry Privacy Policy</a></li>
                <li><strong className="text-nexzen-text">GitHub, Inc.</strong> — OAuth authentication, repository integrations. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">GitHub Privacy Statement</a></li>
                <li><strong className="text-nexzen-text">Social Media Platforms</strong> — LinkedIn, Twitter/X, Instagram embed widgets and share buttons may set cookies when loaded on our pages.</li>
              </ul>
              <p>We do not control third-party cookies and are not responsible for their data practices. Please refer to the respective third-party privacy policies for information on how they handle your data.</p>
            </Section>

            <Section title="5. Cookie Duration">
              <p>Cookies used on NEXZEN fall into two categories based on their lifespan:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-nexzen-text">Session Cookies:</strong> These temporary cookies are stored in your browser's memory and are automatically deleted when you close the browser. They are used primarily for authentication, CSRF protection, and maintaining your active session.</li>
                <li><strong className="text-nexzen-text">Persistent Cookies:</strong> These cookies remain on your device for a specified duration (ranging from 30 days to 24 months, depending on the cookie) or until you manually delete them. They are used for remembering preferences, analytics tracking, and personalized recommendations.</li>
              </ul>
              <p>The specific retention period of each cookie depends on its purpose. Strictly necessary cookies typically expire within 24 hours of session inactivity, while analytics cookies may persist for up to 13 months in accordance with regulatory guidelines.</p>
            </Section>

            <Section title="6. How to Manage and Control Cookies">
              <p>You have the right to control and manage the cookies placed on your device. You can exercise this right through the following methods:</p>

              <p className="font-semibold text-nexzen-text mt-3">6.1 Browser Settings</p>
              <p>Most modern web browsers allow you to view, manage, block, or delete cookies through their settings. The process varies by browser:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-nexzen-text">Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong className="text-nexzen-text">Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong className="text-nexzen-text">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong className="text-nexzen-text">Microsoft Edge:</strong> Settings → Cookies and Site Permissions → Manage and delete cookies</li>
                <li><strong className="text-nexzen-text">Brave:</strong> Settings → Shields → Cookies</li>
              </ul>

              <p className="font-semibold text-nexzen-text mt-3">6.2 Opt-Out of Analytics</p>
              <p>You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>

              <p className="font-semibold text-nexzen-text mt-3">6.3 Opt-Out of Targeted Advertising</p>
              <p>You may opt out of interest-based advertising through industry self-regulatory bodies such as the <a href="https://youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">European Interactive Digital Advertising Alliance (EDAA)</a> or the <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-nexzen-accent hover:underline">Network Advertising Initiative (NAI)</a>.</p>
            </Section>

            <Section title="7. Impact of Disabling Cookies">
              <p>While you are free to restrict or block cookies, please be aware that doing so may affect your experience on NEXZEN. Specifically:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You may be unable to log in to your account or maintain an active session across pages</li>
                <li>Your preferences (theme, notification settings, filters) may not be saved between visits</li>
                <li>Personalized hackathon recommendations and dashboard content may not function correctly</li>
                <li>Certain interactive features such as team formation, real-time notifications, and application tracking may be degraded</li>
                <li>Security features such as CSRF protection and bot detection may be impaired, potentially affecting the safety of your account</li>
              </ul>
              <p>Strictly necessary cookies cannot be disabled through our cookie preferences as they are essential for the platform to operate. However, you can still block them via your browser settings, understanding that this will likely prevent you from using NEXZEN altogether.</p>
            </Section>

            <Section title="8. Do Not Track (DNT) Signals">
              <p>Some web browsers transmit a "Do Not Track" (DNT) signal to websites. There is currently no universally accepted standard for how websites should respond to DNT signals, and the World Wide Web Consortium (W3C) has retired the DNT specification.</p>
              <p>NEXZEN currently does not alter its data collection or tracking practices in response to DNT signals. However, we respect your privacy choices and encourage you to use the cookie management options described in Section 6 above to control your tracking preferences.</p>
              <p>We will continue to monitor developments in browser-level privacy controls and update our practices as industry standards evolve.</p>
            </Section>

            <Section title="9. Cookies and Indian Data Protection Law">
              <p>NEXZEN's use of cookies complies with applicable Indian data protection legislation, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-nexzen-text">Information Technology Act, 2000</strong> — Governs the collection, storage, and processing of electronic data in India.</li>
                <li><strong className="text-nexzen-text">IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> — Mandates clear notice and consent for collecting Sensitive Personal Data or Information (SPDI).</li>
                <li><strong className="text-nexzen-text">Digital Personal Data Protection Act, 2023 (DPDPA)</strong> — Establishes the framework for lawful processing of personal data, Data Principal rights, and consent management. NEXZEN acts as a Data Fiduciary under the DPDPA.</li>
              </ul>
              <p>Where cookies process personal data, we ensure that such processing is conducted in accordance with the lawful bases described in our <a href="/privacy" className="text-nexzen-accent hover:underline">Privacy Policy</a>, including explicit consent, contractual necessity, or legitimate business interests.</p>
            </Section>

            <Section title="10. Updates to This Cookie Policy">
              <p>We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, legal requirements, or regulatory guidance. When we make material changes, we will:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Update the "Last updated" date at the top of this page</li>
                <li>Display a prominent banner or notification on the NEXZEN platform</li>
                <li>Send an email notification to registered users for significant changes affecting their rights</li>
              </ul>
              <p>We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and related technologies. Your continued use of the platform after the publication of changes constitutes your acceptance of the updated policy.</p>
            </Section>

            <Section title="11. Contact Us">
              <p>If you have any questions, concerns, or requests regarding this Cookie Policy, our use of cookies, or your privacy rights, please contact us through the following channels:</p>
              <div className="glass rounded-xl p-4 border border-white/8 space-y-2 mt-2">
                <p><strong className="text-nexzen-text">Privacy & Cookie Inquiries:</strong> <a href="mailto:privacy@nexzen.in" className="text-nexzen-accent hover:underline">privacy@nexzen.in</a></p>
                <p><strong className="text-nexzen-text">Data Protection Officer:</strong> <a href="mailto:dpo@nexzen.in" className="text-nexzen-accent hover:underline">dpo@nexzen.in</a></p>
                <p><strong className="text-nexzen-text">General Support:</strong> <a href="mailto:support@nexzen.in" className="text-nexzen-accent hover:underline">support@nexzen.in</a></p>
                <p className="text-xs text-nexzen-subtle mt-2">NEXZEN Platforms Private Limited<br />Registered Office: 4th Floor, Innovation Hub, Andheri East, Mumbai — 400069, Maharashtra, India</p>
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
