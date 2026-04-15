"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Vote, FileText, BarChart3, Users, Clock, CheckCircle2 } from "lucide-react";

const PROPOSALS = [
  { id: "KJ-DAO-12", title: "Expand SoilVault to Coastal Mangrove Restoration", status: "Active", votes: "1.2M $AGRI", end: "48h left", progress: 65, color: "text-blue-400" },
  { id: "KJ-DAO-11", title: "Increase Staking APY for Smallholder Cooperatives", status: "Passed", votes: "4.8M $AGRI", end: "Closed", progress: 92, color: "text-green-500" },
  { id: "KJ-DAO-10", title: "Allocation of 500k $AGRI for Youth Agritech Grants", status: "Passed", votes: "2.1M $AGRI", end: "Closed", progress: 78, color: "text-gold" },
];

export default function DAOGovernance() {
  const [voted, setVoted] = useState(false);

  return (
    <div className="py-20 lg:py-40 px-6 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-24 space-y-6 max-w-3xl">
         <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
            8. DAO Governance (Phase 3)
         </div>
         <h2 className="text-5xl md:text-6xl font-black">
           Power to the <span className="text-gold italic font-serif underline decoration-gold/20">Collective.</span>
         </h2>
         <p className="text-white/40 text-lg font-light leading-relaxed">
           Keyjani is not just a platform; it&apos;s a movement. As we transition to Phase 3, $AGRI token holders will directly influence the direction of Kenyan climate policy and regenerative funding.
         </p>
         
         {/* Treasury Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 bg-charcoal-light/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            {[
              { label: "Community Treasury", val: "$4.1M", icon: <BarChart3 size={14} /> },
              { label: "Active Proposers", val: "1,248", icon: <Users size={14} /> },
              { label: "Proposals Passed", val: "112", icon: <CheckCircle2 size={14} /> },
              { label: "Staking Participant", val: "82%", icon: <Vote size={14} /> },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left space-y-1">
                 <div className="text-gold flex items-center justify-center md:justify-start gap-2 mb-1">
                    {stat.icon}
                    <span className="text-white/30 text-[9px] uppercase font-bold tracking-widest">{stat.label}</span>
                 </div>
                 <div className="text-white font-mono text-lg font-bold">{stat.val}</div>
              </div>
            ))}
         </div>
      </div>

      {/* Proposals List */}
      <div className="w-full max-w-4xl space-y-4">
         <div className="flex justify-between items-center px-4 mb-6">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
               <FileText className="text-gold" size={16} /> Live Proposals
            </h4>
            <button className="text-[10px] text-gold font-bold uppercase tracking-widest bg-gold/5 border border-gold/20 px-4 py-2 rounded-full hover:bg-gold hover:text-black transition-all">
               New Proposal +
            </button>
         </div>

         {PROPOSALS.map((prop, i) => (
           <motion.div 
             key={prop.id}
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.1 }}
             className="magical-border group"
           >
              <div className="bg-[#121212] p-6 lg:p-8 rounded-xl border border-white/10 flex flex-col md:flex-row items-center gap-8 hover:bg-[#1A1A1A] transition-colors relative overflow-hidden">
                 {/* Progress Bar Background */}
                 <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prop.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gold"
                    />
                 </div>

                 <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                       <span className="text-gold font-mono text-xs">{prop.id}</span>
                       <span className={`px-2 py-0.5 rounded-[4px] bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest ${prop.color}`}>
                          {prop.status}
                       </span>
                    </div>
                    <h5 className="text-white font-bold text-xl group-hover:text-gold transition-colors leading-tight">
                       {prop.title}
                    </h5>
                 </div>

                 <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="text-right">
                       <div className="text-white font-mono text-sm">{prop.votes}</div>
                       <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${prop.status === "Active" ? "text-blue-400" : "text-white/20"}`}>
                          <Clock size={10} /> {prop.end}
                       </div>
                    </div>
                    <button 
                       onClick={() => prop.status === "Active" && setVoted(true)}
                       className={`p-4 rounded-full border transition-all active:scale-95 ${
                          voted && prop.status === "Active"
                          ? "bg-gold text-black border-gold"
                          : "bg-transparent text-white/40 border-white/10 hover:border-gold hover:text-gold"
                       }`}
                    >
                       {voted && prop.status === "Active" ? <CheckCircle2 size={24} /> : <Vote size={24} />}
                    </button>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Info Footnote */}
      <div className="mt-20 flex items-center gap-4 text-white/30 text-[10px] uppercase font-bold tracking-[0.3em]">
         <div className="h-[1px] w-20 bg-white/10" />
         KEYJANI GOVERNANCE PROTOCOL V2.0
         <div className="h-[1px] w-20 bg-white/10" />
      </div>
    </div>
  );
}
