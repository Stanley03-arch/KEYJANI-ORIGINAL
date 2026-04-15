"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ShieldCheck, Cpu, Zap, Coins, Key } from "lucide-react";

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const connect = () => {
    setConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setConnecting(false);
    }, 2000);
  };

  return (
    <div className="py-20 lg:py-40 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
      {/* Wallet Dashboard Visualization */}
      <div className="flex-1 w-full max-w-md">
         <div className="magical-border p-1 perspective-1000">
            <motion.div 
               whileHover={{ rotateY: 5, rotateX: 5 }}
               className="bg-[#121212] rounded-xl overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
            >
               {/* Wallet Header */}
               <div className="p-6 border-b border-white/5 bg-gradient-to-r from-gold/5 via-transparent to-transparent">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Keyjani Nexus Network</span>
                     <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 shadow-[0_0_10px_green]" : "bg-white/10"}`} />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                     <div className="text-3xl font-black text-white">{isConnected ? "1,248.50" : "0.00"}</div>
                     <span className="text-gold font-bold text-sm">$AGRI</span>
                  </div>
                  <div className="text-white/30 text-[10px] font-mono mt-1">
                     {isConnected ? "0x4F2...8E92" : "Wallet Disconnected"}
                  </div>
               </div>

               {/* Asset List */}
               <div className="p-6 space-y-6">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                           <Coins size={18} />
                        </div>
                        <div>
                           <div className="text-white text-sm font-bold">Staked $AGRI</div>
                           <div className="text-white/30 text-[10px]">Governance Rewards</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-white text-sm font-mono">{isConnected ? "8,500.00" : "0"}</div>
                        <div className="text-green-500 text-[10px]">+ 4.2% APY</div>
                     </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between opacity-80">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold/60">
                           <Zap size={18} />
                        </div>
                        <div>
                           <div className="text-white text-sm font-bold">$AGRI-CO2 NFTs</div>
                           <div className="text-white/30 text-[10px]">Verified Carbon Credits</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-white text-sm font-mono">{isConnected ? "14" : "0"}</div>
                        <div className="text-white/40 text-[10px]">Assets</div>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                     <button className="py-3 bg-gold/10 border border-gold/20 text-gold rounded font-bold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                        Swap
                     </button>
                     <button className="py-3 bg-white/5 border border-white/5 text-white/40 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                        Stake
                     </button>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-10">
         <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
            3. Smart Contracts (Web3)
         </div>
         <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Financial Freedom. <br />
            <span className="text-gold italic font-serif underline decoration-gold/20">Trustless & Direct.</span>
         </h2>
         <p className="text-white/60 text-lg leading-relaxed font-light">
           Keyjani leverages modern blockchain smart contracts to eliminate intermediaries. No high bank fees. No delays. Kenyan farmers receive their rewards as soon as the satellite verification is confirmed on-chain.
         </p>

         <div className="space-y-4">
           {!isConnected ? (
             <button 
               onClick={connect}
               disabled={connecting}
               className="bg-gold text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
             >
                {connecting ? (
                   <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Initializing Nexus...
                   </>
                ) : (
                   <>
                      <Wallet size={18} />
                      Install / Connect Wallet
                   </>
                )}
             </button>
           ) : (
             <div className="flex items-center gap-4 p-4 glass-gold rounded-full border border-gold/30">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black">
                   <ShieldCheck size={20} />
                </div>
                <div>
                   <div className="text-white font-bold text-sm">Wallet Connected Successfully</div>
                   <div className="text-gold/60 text-xs font-mono">ID: 0x4F2...8E92 · Network: Nexus Mainnet</div>
                </div>
             </div>
           )}
           <p className="text-white/30 text-[10px] font-medium tracking-tight px-4 leading-relaxed">
             Keyjani supports Celo, Ethereum, and M-Pesa Bridge for universal access across the continent.
           </p>
         </div>

         <div className="flex gap-10 pt-6">
            <div className="flex items-center gap-3">
               <Cpu className="text-gold/40" size={24} />
               <div className="text-white/60 text-xs font-bold uppercase transition-all">Audit: Passed</div>
            </div>
            <div className="flex items-center gap-3">
               <Key className="text-gold/40" size={24} />
               <div className="text-white/60 text-xs font-bold uppercase transition-all">Non-Custodial</div>
            </div>
         </div>
      </div>
    </div>
  );
}
