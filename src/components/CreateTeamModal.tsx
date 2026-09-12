import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Users, Loader2 } from 'lucide-react';
import { useToast } from './ui/Toast';
import { createTeam } from '../services/teamSupabase';
import { Button } from './ui/Button';

export interface CreateTeamModalProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    mobile?: string;
    college?: string;
    github?: string;
    linkedin?: string;
  };
  onClose: () => void;
  onSuccess: (teamCode: string) => void;
}

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export function CreateTeamModal({ user, onClose, onSuccess }: CreateTeamModalProps) {
  const { error, success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [teamName, setTeamName] = useState('');
  
  // Leader State
  const [leaderPhone, setLeaderPhone] = useState(user.mobile || '');
  const [leaderCollege, setLeaderCollege] = useState(user.college || '');
  const [leaderGithub, setLeaderGithub] = useState(user.github || '');
  const [leaderLinkedin, setLeaderLinkedin] = useState(user.linkedin || '');

  // Members State
  const [members, setMembers] = useState<TeamMember[]>([{ name: '', email: '', phone: '', github: '', linkedin: '' }]);
  const [hasConsent, setHasConsent] = useState(false);

  const handleAddMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: '', email: '', phone: '', github: '', linkedin: '' }]);
    }
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!teamName.trim()) return error('Team name is required');
    if (!leaderCollege.trim()) return error('Leader college is required');
    if (!leaderGithub.trim()) return error('Leader GitHub is required');
    if (!leaderLinkedin.trim()) return error('Leader LinkedIn is required');
    if (!hasConsent) return error('You must agree to the hackathon rules and conditions');

    // Filter out members that don't have an email
    const validMembers = members.filter(m => m.email.trim() !== '');

    setIsSubmitting(true);
    try {
      const result = await createTeam({
        teamName,
        leaderUserId: user.id,
        leaderName: user.fullName,
        leaderEmail: user.email,
        leaderPhone: leaderPhone,
        leaderCollege: leaderCollege,
        leaderGithub: leaderGithub,
        leaderLinkedin: leaderLinkedin,
        members: validMembers,
      });

      if (result.error) {
        error(result.error);
        return;
      }

      const teamCode = result.teamCode;
      if (teamCode) {
        success('Team created successfully!');
        if (validMembers.length === 0) {
          // Toast warning for single member
          error("Warning: Your team needs at least 2 members for a valid submission. Add members before the registration deadline or your submission won't be valid.");
        }
        onSuccess(teamCode);
      }
    } catch (err: any) {
      error(err.message || 'Failed to create team');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl border border-white/10 shadow-2xl bg-nexzen-bg text-nexzen-text"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-nexzen-bg/95 backdrop-blur">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-nexzen-accent">
              <Users className="w-6 h-6" />
              Create Team
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-nexzen-muted hover:text-nexzen-text transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Section 1: Team Info */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-nexzen-text border-b border-white/10 pb-2">Team Info</h3>
              <div>
                <label className="block text-sm font-medium text-nexzen-muted mb-1">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="input-base w-full"
                  placeholder="Enter team name"
                  required
                />
              </div>
            </section>

            {/* Section 2: Team Leader */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-nexzen-text border-b border-white/10 pb-2">Team Leader</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-1">Name</label>
                  <input
                    type="text"
                    value={user.fullName}
                    className="input-base w-full opacity-70 cursor-not-allowed bg-black/20"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="input-base w-full opacity-70 cursor-not-allowed bg-black/20"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-1">Phone</label>
                  <input
                    type="tel"
                    value={leaderPhone}
                    onChange={(e) => setLeaderPhone(e.target.value)}
                    className="input-base w-full"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-1">
                    College <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={leaderCollege}
                    onChange={(e) => setLeaderCollege(e.target.value)}
                    className="input-base w-full"
                    placeholder="Enter college name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-1">
                    GitHub URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={leaderGithub}
                    onChange={(e) => setLeaderGithub(e.target.value)}
                    className="input-base w-full"
                    placeholder="https://github.com/username"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nexzen-muted mb-1">
                    LinkedIn URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={leaderLinkedin}
                    onChange={(e) => setLeaderLinkedin(e.target.value)}
                    className="input-base w-full"
                    placeholder="https://linkedin.com/in/username"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Team Members */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-semibold text-nexzen-text">Team Members (Optional)</h3>
                {members.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center gap-1 text-sm text-nexzen-accent hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {members.map((member, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4 relative group">
                    {(members.length > 1 || member.email !== '') && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="absolute top-4 right-4 p-1 text-nexzen-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    <h4 className="text-sm font-medium text-nexzen-subtle">Member {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-nexzen-muted mb-1">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          className="input-base w-full text-sm"
                          placeholder="Member Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-nexzen-muted mb-1">
                          Email {member.name ? <span className="text-red-500">*</span> : ''}
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          className="input-base w-full text-sm"
                          placeholder="Member Email"
                          required={!!member.name}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-nexzen-muted mb-1">Phone</label>
                        <input
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                          className="input-base w-full text-sm"
                          placeholder="Phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-nexzen-muted mb-1">GitHub URL</label>
                        <input
                          type="url"
                          value={member.github}
                          onChange={(e) => handleMemberChange(index, 'github', e.target.value)}
                          className="input-base w-full text-sm"
                          placeholder="GitHub URL"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-nexzen-muted mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={member.linkedin}
                          onChange={(e) => handleMemberChange(index, 'linkedin', e.target.value)}
                          className="input-base w-full text-sm"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Consent Section */}
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <input
                type="checkbox"
                id="team-consent"
                checked={hasConsent}
                onChange={(e) => setHasConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent text-nexzen-accent focus:ring-nexzen-accent focus:ring-offset-nexzen-bg cursor-pointer"
              />
              <label htmlFor="team-consent" className="text-sm text-nexzen-muted leading-relaxed cursor-pointer">
                I confirm that all team members agree to participate and adhere to the hackathon's rules and code of conduct. I understand that teams with fewer than 2 members before the registration deadline will have invalid submissions.
              </label>
            </div>

            {/* Footer / Submit */}
            <div className="pt-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-nexzen-bg/95 backdrop-blur p-4 -mx-6 -mb-6 rounded-b-2xl">
              <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Create Team'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
