import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Users, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from './ui/Toast';
import { getTeamByCode, joinTeam } from '../services/teamSupabase';
import { Button } from './ui/Button';

interface JoinTeamModalProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    mobile?: string;
    github?: string;
    linkedin?: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function JoinTeamModal({ user, onClose, onSuccess }: JoinTeamModalProps) {
  const { error, success } = useToast();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [teamCode, setTeamCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [team, setTeam] = useState<any>(null);
  
  // Join form state
  const [formData, setFormData] = useState({
    mobile: user.mobile || '',
    github: user.github || '',
    linkedin: user.linkedin || ''
  });
  const [isJoining, setIsJoining] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamCode.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
    setTeam(null);
    
    try {
      const foundTeam = await getTeamByCode(teamCode);
      if (!foundTeam) {
        setSearchError('No team found with this code. Check the code and try again.');
      } else {
        setTeam(foundTeam);
        setStep(2);
      }
    } catch (err: any) {
      setSearchError(err.message || 'Error searching for team');
    } finally {
      setIsSearching(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);
    
    try {
      await joinTeam(team.code, {
        user_id: user.id,
        full_name: user.fullName,
        email: user.email,
        mobile: formData.mobile,
        github: formData.github,
        linkedin: formData.linkedin
      });
      success("You've successfully joined the team!");
      onSuccess();
    } catch (err: any) {
      error(err.message || 'Failed to join team. The team might be full.');
    } finally {
      setIsJoining(false);
    }
  };

  const isTeamFull = team && (team.members?.length >= (team.max_size || 4));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg glass-strong border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-semibold text-nexzen-text">Join a Team</h2>
          <button
            onClick={onClose}
            className="p-2 text-nexzen-muted hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSearch}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-2">
                    Team Code
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexzen-muted" />
                    <input
                      type="text"
                      value={teamCode}
                      onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                      placeholder="Enter Team Code (e.g., NX-A3K9F2)"
                      className="input-base w-full pl-10 h-12 text-lg uppercase"
                      autoFocus
                    />
                  </div>
                </div>

                {searchError && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">{searchError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!teamCode.trim() || isSearching}
                  className="w-full h-12 flex items-center justify-center gap-2 bg-nexzen-accent hover:bg-nexzen-accent/90 text-white"
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Search Team
                    </>
                  )}
                </Button>
              </motion.form>
            )}

            {step === 2 && team && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{team.name}</h3>
                    <p className="text-nexzen-muted">Leader: {team.leader_name || team.leader?.full_name}</p>
                  </div>

                  <div className="flex items-center justify-between py-4 border-y border-white/10">
                    <div className="flex items-center gap-2 text-nexzen-subtle">
                      <Users className="w-5 h-5" />
                      <span>Members</span>
                    </div>
                    <span className="font-medium text-white">
                      {team.members?.length || 1} / {team.max_size || 4}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {team.members?.map((member: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-nexzen-text">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          {member.full_name?.charAt(0) || '?'}
                        </div>
                        {member.full_name}
                      </div>
                    ))}
                  </div>
                </div>

                {isTeamFull ? (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      ⚠️ This team is full (4/4 members). You cannot join this team.
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={() => setStep(3)}
                    className="w-full h-12 bg-nexzen-accent hover:bg-nexzen-accent/90 text-white"
                  >
                    Join This Team
                  </Button>
                )}
                
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-nexzen-muted hover:text-white transition-colors"
                >
                  Back to Search
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleJoin}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-nexzen-muted mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user.fullName}
                      readOnly
                      className="input-base w-full bg-white/5 opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-nexzen-muted mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="input-base w-full bg-white/5 opacity-70 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-nexzen-muted mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className="input-base w-full"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-nexzen-muted mb-1.5">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.github}
                    onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                    className="input-base w-full"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-nexzen-muted mb-1.5">
                    LinkedIn URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="input-base w-full"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isJoining || !formData.github || !formData.linkedin}
                    className="w-full h-12 flex items-center justify-center gap-2 bg-nexzen-accent hover:bg-nexzen-accent/90 text-white"
                  >
                    {isJoining ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Confirm & Join
                      </>
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full mt-4 text-sm text-nexzen-muted hover:text-white transition-colors"
                  >
                    Back to Team Info
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
