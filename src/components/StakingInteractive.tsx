"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lock, ArrowUpRight, Award, 
  TrendingUp, PieChart, Coins, 
  ChevronRight, Calculator, Check 
} from "lucide-react";
import { stakeTokens, claimRewards } from "@/lib/actions";

interface Pool {
  id: number;
  name: string;
  apy: number;
  lock_period: string;
  min_stake: number;
  capacity_total: number;
  capacity_current: number;
  status: string;
}

export default function StakingInteractive({ 
  initialPools, 
  farmer 
}: { 
  initialPools: Pool[], 
  farmer: any 
}) {
  const [pools, setPools] = useState(initialPools);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClaim = async () => {
    setIsProcessing(true);
    const result = await claimRewards();
    if (result.success) {
      setMessage("Rewards claimed successfully!");
      setTimeout(() => setMessage(null), 3000);
    }
    setIsProcessing(false);
  };

  const handleStake = async (poolId: number, amount: number) => {
    setIsProcessing(true);
    const result = await stakeTokens(poolId, amount);
    if (result.success) {
      setMessage("Tokens staked successfully!");
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <header>
        <div className="flex items-center gap-3 mb-4">
           <div className="bg-gold/10 p-2 rounded-lg text-gold">
              <Award size={20} />
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">Staking Rewards Phase 1</span>
        </div>
        <h1 className="font-serif text-5xl font-bold tracking-tight text-white mb-4">Earn yield from sustainable growth</h1>
        <p className="text-white/45 text-lg max-w-2xl">Stake your $AGRI tokens to earn revenue share from carbon credit sales and platform protocol fees.</p>
      </header>

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Your Staked Tokens", val: `${farmer.staked_agri.toLocaleString()} AGRI`, sub: "+12.5% APY", icon: <Lock size={18} />, color: "text-emerald-400" },
          { label: "Available to Stake", val: `${farmer.balance_kes.toLocaleString()} AGRI`, sub: "Ready for staking", icon: <Coins size={18} />, color: "text-gold" },
          { label: "Pending Rewards", val: `$${farmer.pending_rewards.toFixed(2)}`, sub: "Claimable in 2 days", icon: <Award size={18} />, color: "text-gold" },
          { label: "Total Earned", val: "$127.45", sub: "All-time rewards", icon: <TrendingUp size={18} />, color: "text-emerald-400" },
        ].map((stat, i) => (
          <div key={i} className="refined-border bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 group hover:bg-white/[0.05] transition-all">
             <div className="flex justify-between items-start mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                <div className={`text-white/20 group-hover:${stat.color} transition-colors`}>{stat.icon}</div>
             </div>
             <div>
                <p className="text-3xl font-bold text-white tracking-tighter mb-1">{stat.val}</p>
                <p className={`text-[11px] font-medium ${stat.color}`}>{stat.sub}</p>
             </div>
          </div>
        ))}
      </section>

      {/* Main Actions */}
      <div className="grid gap-8 md:grid-cols-3">
         <div className="refined-border bg-white/[0.02] rounded-[2.5rem] p-10 flex flex-col items-center text-center">
            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
               <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Stake Tokens</h3>
            <p className="text-white/40 text-sm mb-8 px-4">Lock your AGRI tokens to earn consistent rewards and voting power.</p>
            <button className="btn-premium w-full py-4 bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40">Stake Now</button>
         </div>

         <div className="refined-border bg-white/[0.02] rounded-[2.5rem] p-10 flex flex-col items-center text-center">
            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-gold/10 text-gold mb-6">
               <Award size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Claim Rewards</h3>
            <p className="text-white/40 text-sm mb-8 px-4">Collect your earned staking rewards directly to your wallet.</p>
            <button 
              onClick={handleClaim}
              disabled={isProcessing || farmer.pending_rewards <= 0}
              className="btn-premium w-full py-4 bg-gold text-black hover:bg-gold/90 shadow-gold/20 disabled:opacity-50"
            >
              Claim ${farmer.pending_rewards.toFixed(2)}
            </button>
         </div>

         <div className="refined-border bg-white/[0.02] rounded-[2.5rem] p-10 flex flex-col items-center text-center">
            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 text-white/60 mb-6">
               <Calculator size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Calculate Returns</h3>
            <p className="text-white/40 text-sm mb-8 px-4">Estimate your potential earnings based on stake amount and period.</p>
            <button className="btn-ghost w-full py-4 border-white/10 hover:bg-white/5 text-white/60">Use Calculator</button>
         </div>
      </div>

      {/* Staking Pools */}
      <section className="space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-4">
              <PieChart size={24} className="text-gold" /> Available Staking Pools
            </h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-widest">Active Phases: 3</span>
            </div>
         </div>

         <div className="grid gap-8 md:grid-cols-3">
            {pools.map(pool => (
              <motion.div 
                key={pool.id}
                whileHover={{ y: -6 }}
                className="refined-border bg-white/[0.02] rounded-[2.5rem] overflow-hidden group"
              >
                <div className="p-8 space-y-8">
                   <div className="text-center">
                      <p className="text-4xl font-black text-white tracking-tighter mb-2">{pool.apy}%</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Annual Percentage Yield</p>
                   </div>

                   <div className="space-y-4 pt-4">
                      {[
                        { label: "Lock Period", val: pool.lock_period },
                        { label: "Min. Stake", val: `${pool.min_stake} AGRI` },
                        { label: "Pool Capacity", val: `${((pool.capacity_current/pool.capacity_total)*100).toFixed(1)}% Full` },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                           <span className="text-white/30">{item.label}</span>
                           <span className="text-white font-medium">{item.val}</span>
                        </div>
                      ))}
                      
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-6">
                         <div 
                           className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                           style={{ width: `${(pool.capacity_current/pool.capacity_total)*100}%` }}
                         />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold font-mono text-white/20">
                         <span>{pool.capacity_current.toLocaleString()} AGRI</span>
                         <span>{pool.capacity_total.toLocaleString()} AGRI</span>
                      </div>
                   </div>

                   <div className="space-y-2 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Features:</p>
                      <div className="space-y-2">
                         {pool.lock_period === "No lock" ? (
                           <>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> No lock period</div>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> Lower APY</div>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> Instant unstaking</div>
                           </>
                         ) : pool.lock_period === "30 days" ? (
                           <>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> 30-day lock period</div>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> Medium APY</div>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> Compound rewards</div>
                           </>
                         ) : (
                           <>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> 1-year lock period</div>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> Highest APY</div>
                             <div className="flex items-center gap-2 text-xs text-white/60"><Check size={12} className="text-emerald-400" /> Bonus multipliers</div>
                           </>
                         )}
                      </div>
                   </div>

                   <div className="pt-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Amount to Stake</p>
                      <div className="flex gap-2 mb-6">
                         <div className="flex-1 rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white/40">
                            Min. {pool.min_stake} AGRI
                         </div>
                         <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-white/60">Max</button>
                      </div>

                      <button 
                        onClick={() => handleStake(pool.id, 100)}
                        disabled={isProcessing}
                        className="btn-premium w-full py-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 group-hover:scale-[1.02] transition-all"
                      >
                         <Lock size={14} /> Stake Tokens
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/40 flex items-center gap-3"
        >
          <Check size={20} /> {message}
        </motion.div>
      )}
    </div>
  );
}
