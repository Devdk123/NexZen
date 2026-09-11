import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion } from '../components/ui/Accordion';
import { Search } from 'lucide-react';

const FAQS = [
  { category: 'General', items: [
    { q: 'What is NEXZEN?', a: 'NEXZEN is India\'s premier platform for student hackathons, innovation challenges, and tech events. We help students discover opportunities, form teams, apply, and track their journey — all in one place.' },
    { q: 'Is NEXZEN free to use?', a: 'Yes! NEXZEN is completely free for students. We make money through hackathon organizer partnerships and sponsor placements, never by charging students.' },
    { q: 'Who can use NEXZEN?', a: 'Any student currently enrolled in an Indian college or university — from Diploma to PhD. We welcome students from all disciplines, not just engineering.' },
    { q: 'Can alumni use NEXZEN?', a: 'Yes, recent graduates (within 2 years) can still use NEXZEN for many opportunities. Mark your profile as "Alumni" during signup.' },
  ]},
  { category: 'Hackathons & Applications', items: [
    { q: 'How do I apply to a hackathon?', a: 'Browse hackathons on the Discover page, click on one you\'re interested in, and hit "Apply Now". Fill in the multi-step application form and submit. Track your status in "My Applications".' },
    { q: 'Can I apply individually?', a: 'It depends on the hackathon. Many allow solo participation. If a hackathon requires teams, you\'ll need to create or join a team before applying.' },
    { q: 'How do I create or join a team?', a: 'Go to Teams → Create Team to set up your team with details about what you\'re building and what roles you need. Or browse open teams on the "Find a Team" page and request to join.' },
    { q: 'What happens after I apply?', a: 'The hackathon organizer reviews your application and updates your status (Applied → Under Review → Shortlisted → Selected). You\'ll receive notifications for each status change.' },
    { q: 'Can I apply to multiple hackathons?', a: 'Absolutely! There\'s no limit. Many students apply to multiple hackathons simultaneously. Use "My Applications" to track all of them.' },
  ]},
  { category: 'Profile & Account', items: [
    { q: 'How do I complete my profile?', a: 'Go to Profile → Edit Profile. Add your education, skills, domains, social links, and live project links. A complete profile makes you more visible to team leaders looking for members.' },
    { q: 'Can I upload my resume?', a: 'Yes! You can upload your CV/resume when applying to hackathons. PDF files up to 5MB are supported.' },
    { q: 'Is my data secure?', a: 'Your data is encrypted and stored securely. We never share your personal information with third parties without your consent. Read our Privacy Policy for full details.' },
  ]},
  { category: 'Organizers & Sponsors', items: [
    { q: 'I want to list my hackathon on NEXZEN. How?', a: 'Email us at partnerships@nexzen.in or use the Contact form. We\'ll review your event and onboard it within 48 hours.' },
    { q: 'How can my company sponsor a hackathon on NEXZEN?', a: 'Visit our Sponsors page or email sponsors@nexzen.in. We offer various sponsorship tiers with different visibility and engagement levels.' },
  ]},
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...FAQS.map((f) => f.category)];
  const filtered = FAQS
    .filter((cat) => activeCategory === 'all' || cat.category === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-3">Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p className="text-nexzen-muted">Everything you need to know about NEXZEN.</p>
        </motion.div>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..." className="input-base pl-10" />
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((c) => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all capitalize ${activeCategory === c ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'glass border-white/10 text-nexzen-muted hover:text-nexzen-text'}`}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-nexzen-muted">No results found for "{search}"</div>
          ) : (
            filtered.map((cat) => (
              <div key={cat.category}>
                <p className="text-xs font-semibold text-nexzen-accent uppercase tracking-widest mb-3">{cat.category}</p>
                <Accordion allowMultiple items={cat.items.map((item, i) => ({
                  id: `${cat.category}-${i}`,
                  trigger: <p className="font-semibold text-nexzen-text text-sm text-left">{item.q}</p>,
                  content: <p className="text-sm text-nexzen-muted leading-relaxed">{item.a}</p>,
                }))} />
              </div>
            ))
          )}
        </div>

        <div className="glass rounded-2xl border border-white/8 p-6 text-center mt-12">
          <p className="text-nexzen-text font-semibold mb-1">Still have questions?</p>
          <p className="text-nexzen-muted text-sm mb-4">Our team is happy to help!</p>
          <a href="/contact" className="text-nexzen-accent text-sm hover:underline font-medium">Contact Support →</a>
        </div>
      </div>
    </div>
  );
}
