import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, Users, Trophy, ChevronRight, CheckCircle2, AlertTriangle, 
  MapPin, ShieldAlert, FileText, CheckSquare, Target, Mail, ArrowRight, ExternalLink,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/Accordion';
import { cn } from '../utils';
import { 
  NEXZEN_EVENT, NEXZEN_LINKS, NEXZEN_THEMES, NEXZEN_TIMELINE, NEXZEN_RULES, 
  NEXZEN_AI_POLICY, NEXZEN_JUDGING, NEXZEN_PRIZES, NEXZEN_RECOGNITION, 
  NEXZEN_CAREER_BENEFITS, NEXZEN_SUBMISSION, NEXZEN_REG_STEPS, NEXZEN_VERIFICATION, 
  NEXZEN_WARNINGS, NEXZEN_FAQS 
} from '../data/nexzenHackathon';

const SectionHeader = ({ title, subtitle, eyebrow }: { title: React.ReactNode, subtitle: string, eyebrow: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <Badge variant="cyan" className="mb-4">{eyebrow}</Badge>
    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
      {title}
    </h2>
    <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
  </motion.div>
);

export default function NexzenHackathonPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(NEXZEN_EVENT.startDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-nexzen-bg text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-nexzen-bg via-cyan-950/10 to-nexzen-bg min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8 max-w-4xl">
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-3">
              <Badge variant="success" className="px-3 py-1 text-sm uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2 inline-block"></span>
                {NEXZEN_EVENT.registrationStatus === 'open' ? 'Registrations Open' : 'Coming Soon'}
              </Badge>
              <Badge variant="accent" className="px-3 py-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {new Date(NEXZEN_EVENT.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Badge>
              <Badge variant="cyan" className="px-3 py-1 flex items-center gap-2">
                <Clock className="w-4 h-4" /> {NEXZEN_EVENT.duration}
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
              {NEXZEN_EVENT.name.split(' ')[0]} <span className="gradient-text">{NEXZEN_EVENT.name.split(' ')[1]}</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto">
              {NEXZEN_EVENT.tagline}
            </motion.p>
            
            {/* Countdown */}
            <motion.div variants={fadeIn} className="flex justify-center gap-4 py-6">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="glass-strong rounded-xl w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-2xl md:text-4xl font-bold font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                as="a" href={NEXZEN_LINKS.websiteRegistration} 
                variant="primary" size="xl" glow
                className="w-full sm:w-auto min-h-[48px]"
                iconRight={<ArrowRight className="w-5 h-5" />}
              >
                Register on Website
              </Button>
              <Button 
                as="a" href={NEXZEN_LINKS.unstopRegistration} target="_blank" rel="noopener noreferrer"
                variant="glass" size="xl"
                className="w-full sm:w-auto min-h-[48px]"
                iconRight={<ExternalLink className="w-5 h-5" />}
              >
                Register on Unstop
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. About */}
      <section className="py-20 px-6 bg-nexzen-surface/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="ABOUT THE EVENT"
            title={<>What is <span className="gradient-text">NEXZEN</span>?</>}
            subtitle={NEXZEN_EVENT.description}
          />
          
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {[
              { icon: Clock, title: 'Duration', val: NEXZEN_EVENT.duration },
              { icon: MapPin, title: 'Format', val: 'Online' },
              { icon: Target, title: 'Level', val: NEXZEN_EVENT.level },
              { icon: Users, title: 'Team Size', val: `${NEXZEN_EVENT.minTeamSize}-${NEXZEN_EVENT.maxTeamSize} Members` }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="glass card-hover rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-900/40 flex items-center justify-center mb-4 text-cyan-400">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">{stat.title}</h3>
                <p className="text-xl font-bold text-white">{stat.val}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Themes */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            eyebrow="TRACKS"
            title={<>Hackathon <span className="gradient-text">Themes</span></>}
            subtitle="Choose a track that aligns with your passion or build anything under Open Innovation."
          />
          
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {NEXZEN_THEMES.map((theme, i) => (
              <motion.div key={i} variants={fadeIn} className={cn("glass card-hover rounded-2xl p-6 border-t-2", theme.border)}>
                <div className="text-4xl mb-4">{theme.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{theme.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{theme.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Timeline */}
      <section className="py-20 px-6 bg-nexzen-surface/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            eyebrow="SCHEDULE"
            title={<>Event <span className="gradient-text">Timeline</span></>}
            subtitle="Important dates and deadlines you need to keep track of."
          />
          
          <div className="relative mt-12 pl-4 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2" />
            
            {NEXZEN_TIMELINE.map((item, i) => {
              const isPast = new Date(item.date).getTime() < new Date().getTime();
              const isCurrent = item.status === 'current';
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={cn("relative flex items-center justify-between mb-8 md:mb-12", i % 2 === 0 ? "md:flex-row-reverse" : "")}
                >
                  <div className="hidden md:block w-[45%]" />
                  
                  {/* Dot */}
                  <div className="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 bg-nexzen-bg border-2 flex items-center justify-center z-10"
                    style={{ borderColor: isPast ? '#00d2ff' : (isCurrent ? '#00d2ff' : '#4b5563') }}>
                    {isPast && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute" />}
                  </div>
                  
                  <div className="w-[calc(100%-40px)] md:w-[45%] ml-10 md:ml-0">
                    <div className={cn("glass rounded-xl p-5", isCurrent ? "glow-border ring-1 ring-cyan-500/50" : "")}>
                      <div className="text-cyan-400 text-sm font-semibold mb-1">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Rules & Guidelines */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="GUIDELINES"
            title={<>Rules & <span className="gradient-text">Policies</span></>}
            subtitle="Please read carefully to ensure your submission is valid."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Main Rules */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="text-cyan-400" /> General Rules
              </h3>
              <div className="glass p-6 rounded-2xl h-[500px] overflow-y-auto custom-scrollbar">
                <ol className="space-y-4 list-decimal list-inside text-gray-300 text-sm leading-relaxed">
                  {NEXZEN_RULES.map((rule, i) => (
                    <li key={i} className="pl-2">{rule}</li>
                  ))}
                </ol>
              </div>
            </div>
            
            {/* AI Policy & Warnings */}
            <div className="space-y-8">
              {/* AI Policy */}
              <div className="glass-strong border border-cyan-500/30 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Target className="text-cyan-400" /> {NEXZEN_AI_POLICY.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{NEXZEN_AI_POLICY.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Allowed:</h4>
                    <ul className="space-y-1">
                      {NEXZEN_AI_POLICY.allowed.map((item, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-400 mb-2">Required:</h4>
                    <ul className="space-y-1">
                      {NEXZEN_AI_POLICY.required.map((item, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 text-orange-400 mt-0.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Anti Fraud */}
              <div className="glass border border-red-500/20 p-6 rounded-2xl bg-red-950/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="text-red-400" /> Important Warnings
                </h3>
                <ul className="space-y-3">
                  {NEXZEN_WARNINGS.slice(0,3).map((w, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-xl">{w.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-gray-200">{w.title}</h4>
                        <p className="text-xs text-gray-400">{w.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Judging */}
      <section className="py-20 px-6 bg-nexzen-surface/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            eyebrow="EVALUATION"
            title={<>Judging <span className="gradient-text">Criteria</span></>}
            subtitle="How your project will be scored by the jury."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {NEXZEN_JUDGING.map((crit, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-lg font-bold text-white">{crit.criterion}</h4>
                  <span className="text-cyan-400 font-bold">{crit.weight}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${crit.weight}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                    className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-2 rounded-full"
                  />
                </div>
                <p className="text-gray-400 text-sm">{crit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Prizes */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="REWARDS"
            title={<>Prizes & <span className="gradient-text">Recognition</span></>}
            subtitle="Compete for amazing rewards and career opportunities."
          />
          
          {/* Main Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {NEXZEN_PRIZES.map((prize, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1 }}
                className={cn(
                  "glass rounded-2xl p-8 text-center relative overflow-hidden flex flex-col items-center",
                  i === 0 ? "border-yellow-500/40 transform md:-translate-y-4 shadow-[0_0_30px_rgba(234,179,8,0.15)]" : 
                  i === 1 ? "border-gray-400/40" : "border-amber-700/40"
                )}
              >
                {i === 0 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />}
                <h3 className="text-2xl font-bold text-white mb-2">{prize.position}</h3>
                
                <div className="my-6">
                  <Badge variant="cyan" className="text-lg px-4 py-1 animate-pulse">{prize.amount}</Badge>
                </div>
                
                <p className="text-gray-300 text-sm mb-6">{prize.description}</p>
                
                <div className="w-full h-[1px] bg-gray-800 mb-6" />
                
                <ul className="text-left w-full space-y-3">
                  {prize.perks.map((perk, j) => (
                    <li key={j} className="text-xs text-gray-400 flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Recognition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Object.values(NEXZEN_RECOGNITION).map((rec, i) => (
              <div key={i} className="glass p-6 rounded-xl text-center">
                <Trophy className="w-8 h-8 mx-auto text-cyan-400 mb-4" />
                <h4 className="font-bold text-white mb-2">{rec.title}</h4>
                <p className="text-xs text-gray-400">{rec.description}</p>
              </div>
            ))}
          </div>
          
          {/* Career Benefits */}
          <div className="mt-12 glass p-6 rounded-xl border border-cyan-900/50 bg-cyan-950/10 text-center max-w-3xl mx-auto">
            <h4 className="text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Users className="text-cyan-400" /> Career Opportunities
            </h4>
            <p className="text-sm text-gray-300">{NEXZEN_CAREER_BENEFITS}</p>
          </div>
        </div>
      </section>

      {/* 8. Submission & 9. Registration Steps */}
      <section className="py-20 px-6 bg-nexzen-surface/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* How to Participate */}
          <div>
            <div className="mb-10">
              <Badge variant="cyan" className="mb-4">PROCESS</Badge>
              <h2 className="text-3xl font-bold text-white">How to <span className="gradient-text">Participate</span></h2>
            </div>
            
            <div className="space-y-6">
              {NEXZEN_REG_STEPS.map((step, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-500/30">
                      {step.step}
                    </div>
                    {i !== NEXZEN_REG_STEPS.length - 1 && <div className="w-0.5 h-full bg-gray-800 my-2" />}
                  </div>
                  <div className="pb-6">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-xl">{step.icon}</span> {step.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1 mb-3">{step.description}</p>
                    {step.link && (
                      <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-xs hover:underline inline-flex items-center gap-1">
                        Complete Step <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Submission Checklist */}
          <div>
            <div className="mb-10">
              <Badge variant="cyan" className="mb-4">DELIVERABLES</Badge>
              <h2 className="text-3xl font-bold text-white">Submission <span className="gradient-text">Checklist</span></h2>
            </div>
            
            <div className="glass p-6 md:p-8 rounded-2xl">
              <p className="text-sm text-gray-400 mb-6">Make sure you have all these items ready before the submission deadline on Devfolio/Unstop.</p>
              
              <ul className="space-y-4">
                {NEXZEN_SUBMISSION.map((item, i) => (
                  <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/40 border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <CheckSquare className={cn("w-5 h-5", item.required ? "text-cyan-400" : "text-gray-500")} />
                      <span className="text-sm font-medium text-gray-200">{item.field}</span>
                    </div>
                    {item.required ? (
                      <Badge variant="danger" className="text-[10px]">Required</Badge>
                    ) : (
                      <Badge variant="default" className="text-[10px]">Optional</Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </section>

      {/* 10. Mandatory Verification */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            eyebrow="MANDATORY"
            title={<>Social <span className="gradient-text">Verification</span></>}
            subtitle="To be eligible for certificates and prizes, you must complete these verification steps."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {NEXZEN_VERIFICATION.map((ver, i) => (
              <a 
                key={i} href={ver.link} target="_blank" rel="noopener noreferrer"
                className="glass card-hover p-6 rounded-xl flex flex-col items-center text-center group cursor-pointer block"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{ver.icon}</div>
                <h4 className="font-bold text-white mb-2">{ver.platform}</h4>
                <p className="text-xs text-gray-400">{ver.action}</p>
              </a>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button as="a" href={NEXZEN_LINKS.googleForm} target="_blank" rel="noopener noreferrer" variant="primary" iconRight={<ArrowRight className="w-4 h-4" />}>
              Submit Verification Proof
            </Button>
            <p className="text-xs text-gray-500 mt-3">Requires screenshots uploaded to Google Form</p>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-20 px-6 bg-nexzen-surface/30">
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            eyebrow="FAQ"
            title={<>Got <span className="gradient-text">Questions?</span></>}
            subtitle="Find answers to common questions about NEXZEN 2026."
          />
          
          <div className="mt-12">
            <Accordion 
              items={NEXZEN_FAQS.map(faq => ({
                id: faq.id,
                trigger: faq.question,
                content: faq.answer
              }))}
              allowMultiple
            />
          </div>
        </div>
      </section>

      {/* 12. Contact & Social */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-4">CONTACT</Badge>
          <h2 className="text-3xl font-bold text-white mb-6">Need Help?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            If you have any other questions, feel free to reach out to our support team or join the community.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button as="a" href={`mailto:${NEXZEN_LINKS.supportEmail}`} variant="glass" icon={<Mail className="w-4 h-4" />}>
              {NEXZEN_LINKS.supportEmail}
            </Button>
            <Button as="a" href={NEXZEN_LINKS.whatsappGroup} target="_blank" rel="noopener noreferrer" variant="glass" icon={<MessageCircle className="w-4 h-4" />}>
              Join WhatsApp Group
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
}

// Temporary icon to avoid import error
function MessageCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
