import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, UserPlus, Github, Linkedin, Copy } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import type { Team } from '../types';

interface TeamDetailsModalProps {
  team: Team;
  currentUserId: string;
  onClose: () => void;
}

export function TeamDetailsModal({ team, currentUserId, onClose }: TeamDetailsModalProps) {
  const isLeader = team.leaderId === currentUserId;
  const { success } = useToast();

  const handleCopyId = () => {
    navigator.clipboard.writeText(team.id);
    success('Copied!', 'Team ID copied to clipboard. Share this with your friends so they can join.');
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
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-nexzen-accent">
                {team.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-nexzen-muted">Team ID: <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{team.id}</span></p>
                <button onClick={handleCopyId} className="text-nexzen-subtle hover:text-white transition-colors" title="Copy Team ID">
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-nexzen-muted hover:text-nexzen-text transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Team Info */}
            <section className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h3 className="text-lg font-semibold text-nexzen-text flex items-center gap-2">
                  <Users size={18} />
                  Team Members ({team.members.length}/{team.maxSize})
                </h3>
                {isLeader && team.members.length < team.maxSize && (
                  <Button variant="primary" size="sm" icon={<UserPlus size={14} />} onClick={handleCopyId}>
                    Invite Member
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {team.members.map((member, idx) => {
                  // In Supabase team_members, the member.id might not be the user UUID for non-leaders, but leaderId matches leader's user UUID.
                  // For the UI, we just check if this member is the leader based on the isLeader flag or email.
                  const memberIsLeader = member.isLeader || member.id === team.leaderId;
                  
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center font-bold text-white shadow-lg">
                          {member.fullName?.[0] || '?'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">{member.fullName}</p>
                            {memberIsLeader && (
                              <Badge variant="accent" size="xs">Leader</Badge>
                            )}
                          </div>
                          <p className="text-xs text-nexzen-muted mt-0.5">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 text-nexzen-muted hover:text-white bg-white/5 rounded-lg transition-colors" title="GitHub">
                            <Github size={16} />
                          </a>
                        )}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-nexzen-muted hover:text-blue-400 bg-white/5 rounded-lg transition-colors" title="LinkedIn">
                            <Linkedin size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {team.members.length < team.maxSize && (
                <div className="p-4 bg-nexzen-accent/10 border border-nexzen-accent/20 rounded-xl mt-4">
                  <p className="text-sm text-nexzen-accent">
                    <strong>Tip:</strong> You have {team.maxSize - team.members.length} spot{team.maxSize - team.members.length > 1 ? 's' : ''} left. 
                    Share your Team ID (<code className="bg-black/30 px-1 py-0.5 rounded">{team.id}</code>) with others so they can join via the Dashboard.
                  </p>
                </div>
              )}
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
