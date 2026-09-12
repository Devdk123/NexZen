import { Link } from 'react-router-dom';
import { Code2, Briefcase, Camera, Video, Send } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative mt-20 border-t border-white/8">
      {/* Gradient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-nexzen-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <img src="/part2.png" alt="Logo" className="w-8 h-8 object-contain" />
              <img src="/part 1.png" alt="NexZen" className="h-8 object-contain" />
            </Link>
            <p className="text-sm text-nexzen-muted max-w-xs leading-relaxed">
              India's premier platform for student hackathons, tech events, and innovation challenges. Discover, build, and compete.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: '#', icon: <Code2 size={18} />, label: 'GitHub' },
                { href: '#', icon: <Briefcase size={18} />, label: 'LinkedIn' },
                { href: '#', icon: <Camera size={18} />, label: 'Instagram' },
                { href: '#', icon: <Video size={18} />, label: 'YouTube' },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg text-nexzen-subtle hover:text-nexzen-accent hover:bg-nexzen-accent/10 transition-all border border-white/8 hover:border-nexzen-accent/30">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-nexzen-text">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/hackathons', label: 'Hackathons' },
                { to: '/events', label: 'Events' },
                { to: '/teams/join', label: 'Find a Team' },
                { to: '/sponsors', label: 'Sponsors' },
                { to: '/about', label: 'About NEXZEN' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-nexzen-muted hover:text-nexzen-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-nexzen-text">Support</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '/faq', label: 'FAQ' },
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/cookies', label: 'Cookie Policy' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-nexzen-muted hover:text-nexzen-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-nexzen-text">Stay Updated</h4>
            <p className="text-xs text-nexzen-muted">Get notified about new hackathons matching your interests.</p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-sm text-green-400">
                ✓ Subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-base text-sm py-2.5"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-nexzen-accent to-nexzen-violet text-white text-sm font-medium hover:shadow-glow transition-all"
                >
                  <Send size={14} />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nexzen-subtle">
            © {new Date().getFullYear()} NEXZEN. All rights reserved. Built for student innovators.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-xs text-nexzen-subtle hover:text-nexzen-muted transition-colors">Terms</Link>
            <Link to="/privacy" className="text-xs text-nexzen-subtle hover:text-nexzen-muted transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-xs text-nexzen-subtle hover:text-nexzen-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

