import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, Bookmark, BookmarkCheck, Share2, ExternalLink, Clock, ChevronRight, Tag, Award, ArrowRight } from 'lucide-react';
import { hackathonService } from '../services/hackathons';
import { useToast } from '../components/ui/Toast';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { Skeleton } from '../components/ui/Skeleton';
import { cn, formatDate, daysUntil, MODE_LABELS, MODE_COLORS, DIFFICULTY_COLORS, REG_STATUS_COLORS } from '../utils';
import type { Hackathon } from '../types';

const TABS = ['Overview', 'Problem Statements', 'Timeline', 'Prizes', 'Rules', 'Sponsors', 'FAQs'] as const;

export default function HackathonDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Overview');
  const [saved, setSaved] = useState(false);
  const { success } = useToast();

  useEffect(() => {
    if (!slug) return;
    hackathonService.getById(slug).then((h) => {
      if (!h) { navigate('/404'); return; }
      setHackathon(h);
      setSaved(hackathonService.isSaved(h.id));
      setLoading(false);
    });
  }, [slug, navigate]);

  const handleSave = () => {
    if (!hackathon) return;
    if (saved) { hackathonService.unsaveHackathon(hackathon.id); setSaved(false); success('Removed from saved'); }
    else { hackathonService.saveHackathon(hackathon.id); setSaved(true); success('Saved!'); }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success('Link copied!', 'Share this hackathon with your friends.');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-56 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!hackathon) return null;
  const days = daysUntil(hackathon.registrationDeadline);
  const isOpen = hackathon.registrationStatus === 'open';

  return (
    <div className="min-h-screen bg-nexzen-bg">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src={hackathon.bannerImage || hackathon.logo} alt={hackathon.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-nexzen-bg via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6">
          <div className="max-w-7xl mx-auto flex items-end gap-4">
            <img src={hackathon.logo} alt={hackathon.name} className="w-20 h-20 rounded-2xl border-2 border-white/20 object-cover flex-shrink-0 shadow-card" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge size="sm" className={cn('border', REG_STATUS_COLORS[hackathon.registrationStatus])} dot>
                  {hackathon.registrationStatus === 'open' ? 'Registration Open' : hackathon.registrationStatus}
                </Badge>
                <Badge size="sm" className={cn('border', MODE_COLORS[hackathon.mode])}>{MODE_LABELS[hackathon.mode]}</Badge>
                <Badge size="sm" className={cn('border', DIFFICULTY_COLORS[hackathon.difficulty])} >{hackathon.difficulty}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-nexzen-text">{hackathon.name}</h1>
              <p className="text-nexzen-muted mt-2">{hackathon.organizer}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-nexzen-muted">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(hackathon.startDate)} – {formatDate(hackathon.endDate)}</span>
                {hackathon.city && <span className="flex items-center gap-1.5"><MapPin size={14} /> {hackathon.city}</span>}
                <span className="flex items-center gap-1.5"><Users size={14} /> {hackathon.minTeamSize}–{hackathon.maxTeamSize} members</span>
                <span className="flex items-center gap-1.5 text-nexzen-accent font-semibold"><Trophy size={14} /> {hackathon.prizePool}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 glass rounded-xl border border-white/8 overflow-x-auto no-scrollbar">
              {TABS.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn('relative px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors', activeTab === tab ? 'text-nexzen-text bg-white/10' : 'text-nexzen-muted hover:text-nexzen-text')}>
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {activeTab === 'Overview' && (
                  <div className="space-y-6">
                    <div className="glass rounded-2xl border border-white/8 p-6">
                      <h2 className="font-bold text-nexzen-text mb-3">About this Hackathon</h2>
                      <p className="text-nexzen-muted leading-relaxed text-sm">{hackathon.description}</p>
                    </div>
                    {hackathon.eligibility && hackathon.eligibility.length > 0 && (
                      <div className="glass rounded-2xl border border-white/8 p-6">
                        <h2 className="font-bold text-nexzen-text mb-3">Eligibility</h2>
                        <ul className="space-y-2">
                          {hackathon.eligibility.map((e, i) => <li key={i} className="flex items-start gap-2 text-sm text-nexzen-muted"><span className="text-nexzen-accent mt-0.5">✓</span>{e}</li>)}
                        </ul>
                      </div>
                    )}
                    {hackathon.skills && hackathon.skills.length > 0 && (
                      <div className="glass rounded-2xl border border-white/8 p-6">
                        <h2 className="font-bold text-nexzen-text mb-3">Relevant Skills</h2>
                        <div className="flex flex-wrap gap-2">{hackathon.skills.map((s) => <Badge key={s} size="sm" className="border bg-white/5 text-nexzen-muted border-white/10">{s}</Badge>)}</div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'Problem Statements' && (
                  <div className="space-y-4">
                    {hackathon.problemStatements && hackathon.problemStatements.length > 0 ? (
                      <Accordion allowMultiple items={hackathon.problemStatements.map((ps, i) => ({
                        id: ps.id || String(i),
                        trigger: (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge size="xs" variant="accent">PS {i + 1}</Badge>
                              <Badge size="xs" className={cn('border', DIFFICULTY_COLORS[ps.difficulty])}>{ps.difficulty}</Badge>
                            </div>
                            <p className="font-semibold text-nexzen-text text-sm">{ps.title}</p>
                          </div>
                        ),
                        content: <p className="text-sm text-nexzen-muted leading-relaxed">{ps.description}</p>,
                      }))} />
                    ) : <p className="text-nexzen-muted text-sm">Problem statements will be announced soon.</p>}
                  </div>
                )}

                {activeTab === 'Timeline' && (
                  <div className="glass rounded-2xl border border-white/8 p-6">
                    <div className="space-y-0">
                      {hackathon.timeline && hackathon.timeline.map((event, i) => {
                        const isPast = new Date(event.date) < new Date();
                        return (
                          <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={cn('w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1', isPast ? 'bg-nexzen-accent border-nexzen-accent' : 'border-white/30 bg-transparent')} />
                              {i < hackathon.timeline!.length - 1 && <div className={cn('w-0.5 flex-1 my-1', isPast ? 'bg-nexzen-accent/40' : 'bg-white/10')} />}
                            </div>
                            <div className="pb-6">
                              <p className="text-xs text-nexzen-subtle">{formatDate(event.date, 'dd MMM yyyy, hh:mm a')}</p>
                              <p className={cn('font-semibold text-sm mt-0.5', isPast ? 'text-nexzen-text' : 'text-nexzen-muted')}>{event.title}</p>
                              {event.description && <p className="text-xs text-nexzen-subtle mt-0.5">{event.description}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'Prizes' && (
                  <div className="space-y-4">
                    {hackathon.prizes && hackathon.prizes.map((prize, i) => (
                      <div key={i} className={cn('glass rounded-2xl border p-5', i === 0 ? 'border-yellow-500/30' : i === 1 ? 'border-gray-400/30' : 'border-amber-600/30')}>
                        <div className="flex items-center gap-3 mb-3">
                          <Award size={20} className={i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : 'text-amber-600'} />
                          <div>
                            <p className="font-bold text-nexzen-text">{prize.position}</p>
                            <p className="text-xl font-extrabold gradient-text">{prize.amount}</p>
                          </div>
                        </div>
                        {prize.perks && prize.perks.length > 0 && (
                          <ul className="space-y-1">{prize.perks.map((p, j) => <li key={j} className="text-xs text-nexzen-muted flex items-center gap-1.5"><span className="text-nexzen-accent">+</span>{p}</li>)}</ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Rules' && (
                  <div className="glass rounded-2xl border border-white/8 p-6">
                    {hackathon.rules && hackathon.rules.length > 0 ? (
                      <ol className="space-y-3">{hackathon.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-nexzen-muted">
                          <span className="w-6 h-6 rounded-lg bg-nexzen-accent/15 text-nexzen-accent text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          {rule}
                        </li>
                      ))}</ol>
                    ) : <p className="text-nexzen-muted text-sm">Rules will be announced soon.</p>}
                  </div>
                )}

                {activeTab === 'Sponsors' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hackathon.sponsors && hackathon.sponsors.map((s) => (
                      <div key={s.id} className="glass rounded-2xl border border-white/8 p-4 flex flex-col items-center gap-3 text-center">
                        <img src={s.logo} alt={s.name} className="w-14 h-14 rounded-xl object-cover" />
                        <p className="font-semibold text-nexzen-text text-sm">{s.name}</p>
                        {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs text-nexzen-accent hover:underline flex items-center gap-1"><ExternalLink size={12} />Visit</a>}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'FAQs' && (
                  <Accordion allowMultiple items={(hackathon.faqs || []).map((faq, i) => ({
                    id: String(i),
                    trigger: <p className="font-semibold text-nexzen-text text-sm">{faq.question}</p>,
                    content: <p className="text-sm text-nexzen-muted leading-relaxed">{faq.answer}</p>,
                  }))} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky sidebar CTA */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="glass rounded-2xl border border-white/10 p-6 space-y-5">
              <div className="text-center">
                <p className="text-xs text-nexzen-muted mb-1">Total Prize Pool</p>
                <p className="text-3xl font-extrabold gradient-text">{hackathon.prizePool}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-white/8">
                  <span className="text-nexzen-muted flex items-center gap-1.5"><Clock size={13} />Registration Closes</span>
                  <span className={cn('font-medium', days <= 5 && isOpen ? 'text-red-400' : 'text-nexzen-text')}>{formatDate(hackathon.registrationDeadline)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/8">
                  <span className="text-nexzen-muted flex items-center gap-1.5"><Users size={13} />Team Size</span>
                  <span className="text-nexzen-text font-medium">{hackathon.minTeamSize}–{hackathon.maxTeamSize}</span>
                </div>
                {hackathon.allowIndividual && (
                  <div className="py-2 border-b border-white/8">
                    <Badge size="xs" variant="success">Solo participation allowed</Badge>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className="text-nexzen-muted flex items-center gap-1.5"><Users size={13} />Participants</span>
                  <span className="text-nexzen-text font-medium">{hackathon.participantsCount?.toLocaleString() || 'N/A'}</span>
                </div>
              </div>

              {isOpen ? (
                <Link to={`/hackathons/${hackathon.slug}/apply`}>
                  <Button variant="primary" size="lg" fullWidth glow iconRight={<ArrowRight size={16} />}>Apply Now</Button>
                </Link>
              ) : (
                <Button variant="secondary" size="lg" fullWidth disabled>
                  {hackathon.registrationStatus === 'upcoming' ? 'Opens Soon' : 'Registration Closed'}
                </Button>
              )}

              <div className="flex gap-2">
                <Button variant="glass" size="sm" fullWidth icon={saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />} onClick={handleSave}>
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="glass" size="sm" fullWidth icon={<Share2 size={15} />} onClick={handleShare}>Share</Button>
              </div>
            </div>

            {/* Organizer */}
            <div className="glass rounded-2xl border border-white/8 p-4">
              <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Organized by</p>
              <p className="text-sm font-semibold text-nexzen-text">{hackathon.organizer}</p>
              {hackathon.organizerWebsite && (
                <a href={hackathon.organizerWebsite} target="_blank" rel="noopener noreferrer" className="text-xs text-nexzen-accent hover:underline flex items-center gap-1 mt-2"><ExternalLink size={12} />Visit Website</a>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-strong border-t border-white/8 z-30 flex gap-3">
        <Button variant="glass" size="md" icon={saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />} onClick={handleSave} className="flex-shrink-0" />
        {isOpen ? (
          <Link to={`/hackathons/${hackathon.slug}/apply`} className="flex-1">
            <Button variant="primary" size="md" fullWidth>Apply Now</Button>
          </Link>
        ) : (
          <Button variant="secondary" size="md" fullWidth disabled>Registration Closed</Button>
        )}
      </div>
    </div>
  );
}
