import React, { useEffect, useRef } from 'react';
import { Users, Search } from 'lucide-react';
import gsap from 'gsap';

interface TeamSelectionPopupProps {
  onCreateTeam: () => void;
  onJoinTeam: () => void;
}

export function TeamSelectionPopup({ onCreateTeam, onJoinTeam }: TeamSelectionPopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container scale in
      gsap.fromTo(containerRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" }
      );

      // Title fade in from top
      gsap.fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );

      // Cards stagger in from below
      gsap.fromTo([card1Ref.current, card2Ref.current],
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15, 
          delay: 0.4, 
          ease: "back.out(1.7)" 
        }
      );

      // Floating animation on cards
      gsap.to([card1Ref.current, card2Ref.current], {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.5,
        stagger: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div 
        ref={containerRef}
        className="glass-strong p-8 md:p-12 rounded-2xl border border-white/10 max-w-4xl w-full mx-4 shadow-2xl"
      >
        <div ref={titleRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nexzen-accent to-purple-500 bg-clip-text text-transparent">
            Welcome to NEXZEN Hackathon!
          </h1>
          <p className="text-nexzen-muted text-lg max-w-2xl mx-auto">
            To participate, you need to be part of a team. Choose an option below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Create Team */}
          <div 
            ref={card1Ref}
            onClick={onCreateTeam}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:border-nexzen-accent/50 hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-nexzen-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-nexzen-accent/20 flex items-center justify-center mb-6 group-hover:bg-nexzen-accent/30 transition-colors">
                <Users className="w-8 h-8 text-nexzen-accent" />
              </div>
              <h3 className="text-2xl font-bold text-nexzen-text mb-4">Create a Team</h3>
              <p className="text-nexzen-muted leading-relaxed">
                Start your own team and invite members. You'll get a unique Team ID to share.
              </p>
            </div>
          </div>

          {/* Card 2: Join Team */}
          <div 
            ref={card2Ref}
            onClick={onJoinTeam}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50 hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <Search className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-nexzen-text mb-4">Join a Team</h3>
              <p className="text-nexzen-muted leading-relaxed">
                Have a Team ID? Enter it to join an existing team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
