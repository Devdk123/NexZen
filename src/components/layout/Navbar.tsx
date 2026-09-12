import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, Bell, ChevronDown, User, LayoutDashboard, Bookmark,
  FileText, Users, LogOut, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import { Button } from '../ui/Button';
import { cn } from '../../utils';

const NAV_LINKS = [
  { to: '/hackathons', label: 'Hackathons' },
  { to: '/events', label: 'Events' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-strong rounded-2xl border border-white/15 overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                  <Search size={20} className="text-nexzen-muted flex-shrink-0" />
                  <input
                    autoFocus
                    placeholder="Search hackathons, events, teams, sponsors..."
                    className="flex-1 bg-transparent text-nexzen-text placeholder-nexzen-subtle outline-none text-base"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) { navigate(`/hackathons?search=${encodeURIComponent(val)}`); setSearchOpen(false); }
                      }
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-nexzen-subtle hover:text-nexzen-text">
                    <X size={18} />
                  </button>
                </div>
                <div className="border-t border-white/8 px-4 py-3">
                  <p className="text-xs text-nexzen-subtle">Quick: Hackathons · Events · Teams · Sponsors</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header
        className={cn(
          'pointer-events-auto transition-all duration-300 w-full max-w-6xl',
          mobileOpen ? 'rounded-3xl' : 'rounded-full',
          'border border-white/10 bg-[#080b14]/40 backdrop-blur-xl'
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/part2.png" alt="Logo" className="w-8 h-8 object-contain transition-all" />
              <img src="/part 1.png" alt="NexZen" className="h-8 object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive ? 'text-nexzen-text bg-white/8' : 'text-nexzen-muted hover:text-nexzen-text hover:bg-white/5'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-nexzen-muted hover:text-nexzen-text hover:bg-white/8 transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {isAuthenticated && user ? (
                <>
                  {/* Notifications */}
                  <div ref={notifRef} className="relative">
                    <button
                      onClick={() => setNotifOpen((v) => !v)}
                      className="relative p-2 rounded-xl text-nexzen-muted hover:text-nexzen-text hover:bg-white/8 transition-all"
                      aria-label={`Notifications (${unreadCount} unread)`}
                    >
                      <Bell size={18} />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-nexzen-accent text-white text-[10px] font-bold flex items-center justify-center animate-pulse-glow">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {notifOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-80 glass-strong rounded-2xl border border-white/10 shadow-card overflow-hidden"
                        >
                          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                            <span className="font-semibold text-sm text-nexzen-text">Notifications</span>
                            <button onClick={markAllAsRead} className="text-xs text-nexzen-accent hover:underline">Mark all read</button>
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.slice(0, 6).map((n) => (
                              <button
                                key={n.id}
                                onClick={() => { markAsRead(n.id); setNotifOpen(false); navigate(n.link || '#'); }}
                                className={cn('w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0', !n.isRead && 'bg-nexzen-accent/5')}
                              >
                                <div className="flex items-start gap-2">
                                  {!n.isRead && <span className="w-2 h-2 rounded-full bg-nexzen-accent mt-1.5 flex-shrink-0" />}
                                  <div className={cn('flex-1', n.isRead && 'ml-4')}>
                                    <p className="text-xs font-semibold text-nexzen-text">{n.title}</p>
                                    <p className="text-xs text-nexzen-muted mt-0.5 line-clamp-2">{n.message}</p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile menu */}
                  <div ref={profileRef} className="relative">
                    <button
                      onClick={() => setProfileOpen((v) => !v)}
                      className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-white/8 transition-all"
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=6366F1&color=fff`}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full object-cover border border-white/15"
                      />
                      <span className="hidden lg:block text-sm font-medium text-nexzen-text max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
                      <ChevronDown size={14} className={cn('text-nexzen-muted transition-transform duration-200 hidden sm:block', profileOpen && 'rotate-180')} />
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl border border-white/10 shadow-card py-2 overflow-hidden"
                        >
                          <div className="px-4 py-2 border-b border-white/8 mb-1">
                            <p className="text-sm font-semibold text-nexzen-text truncate">{user.fullName}</p>
                            <p className="text-xs text-nexzen-muted truncate">{user.email}</p>
                          </div>
                          {[
                            { to: '/dashboard', icon: <LayoutDashboard size={15} />, label: 'Dashboard' },
                            { to: `/profile/${user.id}`, icon: <User size={15} />, label: 'My Profile' },
                            { to: '/my/applications', icon: <FileText size={15} />, label: 'My Applications' },
                            { to: '/my/teams', icon: <Users size={15} />, label: 'My Teams' },
                            { to: '/my/saved', icon: <Bookmark size={15} />, label: 'Saved' },
                          ].map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-nexzen-muted hover:text-nexzen-text hover:bg-white/5 transition-all"
                            >
                              <span className="text-nexzen-subtle">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                          <div className="border-t border-white/8 mt-1 pt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
                            >
                              <LogOut size={15} />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log In</Button>
                  <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-xl text-nexzen-muted hover:text-nexzen-text hover:bg-white/8 transition-all"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/8 glass-strong overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn('block px-4 py-3 rounded-xl text-sm font-medium transition-all', isActive ? 'text-nexzen-text bg-white/8' : 'text-nexzen-muted hover:text-nexzen-text hover:bg-white/5')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                {!isAuthenticated && (
                  <div className="flex gap-2 pt-3 border-t border-white/8">
                    <Button variant="secondary" size="sm" fullWidth onClick={() => { navigate('/login'); setMobileOpen(false); }}>Log In</Button>
                    <Button variant="primary" size="sm" fullWidth onClick={() => { navigate('/signup'); setMobileOpen(false); }}>Sign Up</Button>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="pt-3 border-t border-white/8 space-y-1">
                    {[
                      { to: '/dashboard', label: 'Dashboard' },
                      { to: '/my/applications', label: 'My Applications' },
                      { to: '/my/teams', label: 'My Teams' },
                      { to: '/my/saved', label: 'Saved' },
                    ].map((item) => (
                      <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm text-nexzen-muted hover:text-nexzen-text hover:bg-white/5 rounded-xl">
                        {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl">Sign Out</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      </div>
    </>
  );
}

