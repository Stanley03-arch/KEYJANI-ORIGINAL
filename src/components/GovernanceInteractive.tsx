"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, CheckCircle2, XCircle, 
  Clock, Tag, TrendingUp, 
  ArrowRight, ShieldCheck, Check
} from "lucide-react";
import { castVote } from "@/lib/actions";

interface Proposal {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  votes_for: number;
  votes_against: number;
  end_date: string;
  total_votes_needed: number;
}

export default function GovernanceInteractive({ 
  initialProposals 
}: { 
  initialProposals: Proposal[] 
}) {
  const [proposals, setProposals] = useState(initialProposals);
  const [isVoting, setIsVoting] = useState(false);
  const [activeTab, setActiveTab] = useState("Active Proposals");

  const handleVote = async (proposalId: number, side: 'for' | 'against') => {
    setIsVoting(true);
    const result = await castVote(proposalId, side);
    if (result.success) {
      // Optimistic update
      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            votes_for: side === 'for' ? p.votes_for + 1250 : p.votes_for,
            votes_against: side === 'against' ? p.votes_against + 1250 : p.votes_against
          };
        }
        return p;
      }));
    }
    setIsVoting(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="text-center space-y-6">
        <h1 className="mx-auto max-w-4xl font-serif text-5xl font-bold tracking-tight text-white md:text-6xl">
           Shape the future of <span className="italic text-gold">Keyjani governance.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/45">
          Your voice matters in building sustainable agriculture for Africa. Use your staked $AGRI power to vote on protocol upgrades and community initiatives.
        </p>
      </header>

      {/* Voting Power Banner */}
      <section className="refined-border bg-emerald-500/5 border-emerald-500/20 rounded-[2.5rem] p-10 backdrop-blur-md">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
               <div className="flex items-center gap-2 text-emerald-400 mb-4 justify-center md:justify-start">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified Governance Node</span>
               </div>
               <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Your Voting Power</p>
               <h2 className="text-5xl font-black text-white tracking-tighter">1,250 <span className="text-lg text-emerald-400">$AGRI tokens staked</span></h2>
            </div>
            <div className="text-center md:text-right">
               <p className="text-4xl font-black text-white tracking-tighter opacity-80">0.62%</p>
               <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">of total voting power</p>
            </div>
         </div>
      </section>

      {/* Tabs Menu */}
      <div className="flex gap-10 border-b border-white/5 pb-1 overflow-x-auto no-scrollbar">
        {["Active Proposals", "Completed", "Create Proposal"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${activeTab === tab ? 'text-gold border-b-2 border-gold font-black' : 'text-white/20 hover:text-white/50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-8">
         <AnimatePresence mode="wait">
            {activeTab === "Active Proposals" ? (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="grid gap-8"
               >
                  {proposals.map(proposal => {
                    const totalVotes = proposal.votes_for + proposal.votes_against;
                    const forPercent = totalVotes > 0 ? (proposal.votes_for / totalVotes) * 100 : 0;
                    const againstPercent = totalVotes > 0 ? (proposal.votes_against / totalVotes) * 100 : 0;
                    const progress = (totalVotes / proposal.total_votes_needed) * 100;

                    return (
                      <article key={proposal.id} className="refined-border bg-white/[0.02] rounded-[3rem] p-10 group hover:bg-white/[0.04] transition-all">
                         <div className="flex flex-col lg:flex-row gap-12">
                            <div className="flex-1 space-y-6">
                               <div className="flex justify-between items-start">
                                  <div className="space-y-4">
                                     <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">{proposal.title}</h3>
                                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-widest">{proposal.category}</span>
                                     </div>
                                     <p className="text-white/40 leading-relaxed text-sm">{proposal.description}</p>
                                  </div>
                                  <div className="text-right whitespace-nowrap">
                                     <div className="flex items-center gap-2 text-rose-500/80 mb-1 justify-end font-bold">
                                        <Clock size={14} />
                                        <span className="text-xs uppercase tracking-widest">{proposal.end_date} left</span>
                                     </div>
                                  </div>
                               </div>

                               <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                                     <span>Votes Cast</span>
                                     <span>{totalVotes.toLocaleString()} / {proposal.total_votes_needed.toLocaleString()}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                     <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: `${progress}%` }}
                                       className="h-full bg-emerald-500 rounded-full"
                                     />
                                  </div>
                               </div>
                            </div>

                            <aside className="lg:w-96 space-y-6 lg:border-l lg:border-white/5 lg:pl-12">
                               <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                           <CheckCircle2 size={16} />
                                           <span className="text-xs text-white">For</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{proposal.votes_for.toLocaleString()}</p>
                                        <p className="text-[10px] font-medium text-emerald-400">{forPercent.toFixed(1)}%</p>
                                     </div>
                                     <div className="space-y-2 text-right">
                                        <div className="flex items-center gap-2 text-rose-500/80 font-bold justify-end">
                                           <span className="text-xs text-white">Against</span>
                                           <XCircle size={16} />
                                        </div>
                                        <p className="text-2xl font-bold text-white">{proposal.votes_against.toLocaleString()}</p>
                                        <p className="text-[10px] font-medium text-rose-500">{againstPercent.toFixed(1)}%</p>
                                     </div>
                                  </div>

                                  <div className="h-1.5 w-full bg-white/5 rounded-full flex overflow-hidden">
                                     <div style={{ width: `${forPercent}%` }} className="h-full bg-emerald-500" />
                                     <div style={{ width: `${againstPercent}%` }} className="h-full bg-rose-500" />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 pt-4">
                                     <button 
                                       onClick={() => handleVote(proposal.id, 'for')}
                                       disabled={isVoting}
                                       className="btn-premium py-4 bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 text-[11px] disabled:opacity-50"
                                     >
                                        Vote For
                                     </button>
                                     <button 
                                       onClick={() => handleVote(proposal.id, 'against')}
                                       disabled={isVoting}
                                       className="btn-ghost py-4 border-rose-500/20 text-rose-500/60 hover:bg-rose-500/5 hover:text-rose-500 flex items-center justify-center gap-2 text-[11px] disabled:opacity-50"
                                     >
                                        Vote Against
                                     </button>
                                  </div>
                               </div>
                            </aside>
                         </div>
                      </article>
                    );
                  })}
               </motion.div>
            ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="refined-border bg-white/[0.02] rounded-[3rem] p-24 text-center"
               >
                  <Users size={48} className="mx-auto text-white/10 mb-6" />
                  <p className="text-white/30 text-lg">No {activeTab.toLowerCase()} data found at this time.</p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
