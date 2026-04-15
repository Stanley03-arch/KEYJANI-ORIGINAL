"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Sprout, ShieldCheck, User, MessageCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function FarmerPortal() {

  return (
    <div className="flex flex-col lg:flex-row items-center gap-20 py-40 px-6 max-w-7xl mx-auto">
      {/* Intro Text */}
      <div className="flex-1 space-y-8">
        <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
          4. Farmer Portal (Mobile App)
        </div>
        <h2 className="text-5xl font-bold leading-tight">
          Your Farm. <br />
          <span className="text-gold italic font-serif">In Your Pocket.</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed font-light">
          The Keyjani mobile portal gives Kenyan farmers a direct link to the carbon economy. No banks required. No paperwork needed. Just the soil and your smartphone.
        </p>
        
        <ul className="space-y-4">
           {[
             { title: "Direct $AGRI-CO2 Payouts", desc: "Receive tokenized carbon rewards instantly upon satellite validation." },
             { title: "AI Agronomy", desc: "Localized crop advice in Kiswahili, Kalenjin, and Kikuyu." },
             { title: "Soil Health Tracking", desc: "Monitor your carbon sequestration progress using multi-spectral data." }
           ].map((item, i) => (
             <li key={i} className="flex gap-4 group">
                <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <ShieldCheck size={14} />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm tracking-tight">{item.title}</h4>
                   <p className="text-white/40 text-xs mt-1">{item.desc}</p>
                </div>
             </li>
           ))}
        </ul>
      </div>

      {/* Phone Simulator */}
      <div className="relative">
         {/* Glow Effect Background */}
         <div className="absolute inset-0 bg-gold/20 blur-[120px] rounded-full scale-75 animate-pulse" />
         
         {/* Phone Case */}
         <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-4 border-[#2A2A2A] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
               <div className="w-12 h-1 bg-[#121212] rounded-full" />
            </div>

            {/* App UI */}
            <div className="bg-[#0E0E0E] h-full flex flex-col pt-10 px-4">
               {/* App Header */}
               <div className="flex justify-between items-center mb-8 px-2">
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold text-black">K</div>
                     <span className="text-white text-xs font-bold">Keyjani Portal</span>
                  </div>
                  <User size={16} className="text-white/40" />
               </div>

               {/* Wallet Card */}
               <div className="bg-gradient-to-br from-gold to-[#B8860B] rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden group">
                  <div className="relative z-10">
                     <div className="text-black/50 text-[10px] font-bold uppercase mb-1">Total Carbon Rewards</div>
                     <div className="text-black text-3xl font-black mb-4">KES 48,250</div>
                     <div className="flex justify-between items-center text-black/60 text-[10px] font-medium border-t border-black/10 pt-3">
                        <span>4.2 $AGRI-CO2</span>
                        <div className="flex items-center gap-1"><TrendingUp size={10} /> +12% this month</div>
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                     <Sprout size={80} />
                  </div>
               </div>

               {/* Actions */}
               <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-[#1A1A1A] rounded-xl p-3 flex flex-col items-center gap-2 border border-white/5 active:scale-95 transition-transform">
                     <ArrowUpRight className="text-gold" size={18} />
                     <span className="text-white/60 text-[10px] font-medium">M-Pesa Out</span>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-3 flex flex-col items-center gap-2 border border-white/5 active:scale-95 transition-transform">
                     <MessageCircle className="text-gold" size={18} />
                     <span className="text-white/60 text-[10px] font-medium">AI Advisor</span>
                  </div>
               </div>

               {/* Activity */}
               <div className="flex-1 space-y-4">
                  <h5 className="text-white/40 text-[10px] font-bold uppercase tracking-widest px-1">Recent Credits</h5>
                  {[
                    { date: "Oct 12", type: "Sequestration", amount: "+ 1.25 tCO2", icon: <ArrowDownLeft size={14} /> },
                    { date: "Oct 08", type: "Mint Reward", amount: "KES 5,420", icon: <TrendingUp size={14} /> },
                    { date: "Oct 01", type: "Soil Verification", amount: "+ 0.85 tCO2", icon: <ArrowDownLeft size={14} /> }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold">
                             {item.icon}
                          </div>
                          <div>
                             <div className="text-white text-[11px] font-bold">{item.type}</div>
                             <div className="text-white/30 text-[9px]">{item.date}</div>
                          </div>
                       </div>
                       <div className="text-gold text-[11px] font-black">{item.amount}</div>
                    </div>
                  ))}
               </div>

               {/* Bottom Nav */}
               <div className="flex justify-around items-center py-6 border-t border-white/5 mt-auto">
                  <Wallet size={18} className="text-gold" />
                  <MessageCircle size={18} className="text-white/20" />
                  <TrendingUp size={18} className="text-white/20" />
                  <User size={18} className="text-white/20" />
               </div>
            </div>
         </div>
         
         {/* Side UI elements */}
         <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-12 top-20 glass-gold p-4 rounded-xl border border-gold/20 backdrop-blur-md shadow-2xl z-[60]"
         >
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold"><TrendingUp size={12} /></div>
               <div>
                  <div className="text-gold font-bold text-[10px]">Verification Success</div>
                  <div className="text-white/60 text-[8px]">Zone KJ-482 confirmed.</div>
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
