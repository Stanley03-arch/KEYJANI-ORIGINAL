"use client";

import React from "react";
import { Landmark, Briefcase, Database, Lock, Server, BarChart3, ArrowRight } from "lucide-react";

export default function InfrastructureSuite() {
  return (
    <div className="py-40 px-6 max-w-7xl mx-auto space-y-40">
      
      {/* 7. SoilVault System */}
      <div id="soilvault" className="flex flex-col lg:flex-row items-center gap-20">
         {/* Vault Visual */}
         <div className="flex-1 w-full max-w-xl">
            <div className="magical-border p-1">
               <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Landmark size={200} />
                  </div>
                  
                  <div className="space-y-10 relative z-10">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Lock size={20} /></div>
                           <h4 className="text-white font-bold text-lg tracking-tight">Active SoilVault</h4>
                        </div>
                        <span className="text-gold font-mono text-xs font-bold uppercase tracking-widest bg-gold/5 px-3 py-1 rounded-full border border-gold/20">Secured</span>
                     </div>

                     <div className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                           <div className="text-white/30 text-[10px] uppercase font-black mb-1">Locked Carbon Value (Total)</div>
                           <div className="text-white text-3xl font-black">4,285.5 <span className="text-gold/40 text-lg">tCO2</span></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                              <div className="text-white/30 text-[9px] uppercase font-bold mb-1">Compound Yield</div>
                              <div className="text-white font-mono text-sm">4.5% $AGRI</div>
                           </div>
                           <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                              <div className="text-white/30 text-[9px] uppercase font-bold mb-1">Storage Period</div>
                              <div className="text-white font-mono text-sm">7 Years Remaining</div>
                           </div>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-gold text-black rounded font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95 shadow-xl">
                           Manage Vault
                        </button>
                        <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded font-bold uppercase tracking-widest text-[10px] transition-all">
                           Get Loan
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 space-y-8 text-right">
            <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
               7. SoilVault System
            </div>
            <h2 className="text-5xl font-black leading-tight italic">
               The Carbon Bank. <br />
               <span className="text-gold not-italic font-serif">Growing Wealth Underground.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed font-light">
              SoilVault is the first long-term carbon banking mechanism. Farmers can store their validated soil carbon as a growing financial asset, using it as collateral for low-interest loans or long-term wealth accumulation.
            </p>
         </div>
      </div>

      {/* 9. PoSaaS (Proof-of-Sequestration-as-a-Service) */}
      <div id="posaas" className="flex flex-col-reverse lg:flex-row items-center gap-20">
         {/* Content */}
         <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
               9. PoSaaS Protocol
            </div>
            <h2 className="text-5xl font-black leading-tight">
               Infrastructure <br />
               <span className="text-gold italic font-serif underline decoration-gold/20">For the Continent.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed font-light">
              We aren&apos;t just a platform; we are the foundation. Our PoSaaS (Proof-of-Sequestration-as-a-Service) API allows other cooperatives, climate-tech labs, and national governments to use our satellite-oracle verification stack.
            </p>
            <button className="group relative bg-[#121212] border border-white/10 hover:border-gold px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-3">
               <Server size={14} className="text-gold" />
               Integrate API
               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         {/* Infrastructure Visual */}
         <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {[
              { title: "Verifiable Data Lake", icon: <Database />, desc: "High-resolution multi-spectral historical records." },
              { title: "Smart Contract Templates", icon: <Briefcase />, desc: "Ready-to-deploy tokens for any ecosystem." },
              { title: "Analytics Engine", icon: <BarChart3 />, desc: "AI predictive models for crop yield and carbon potential." },
              { title: "Global Compliance", icon: <Server />, desc: "VCM-ready reports for international accreditation." }
            ].map((node, i) => (
              <div key={i} className="magical-border p-1">
                 <div className="bg-[#121212] p-6 rounded-xl border border-white/5 h-full space-y-4 hover:border-gold/30 transition-all">
                    <div className="text-gold w-fit p-3 bg-gold/10 rounded">{node.icon}</div>
                    <h5 className="text-white font-bold text-sm leading-tight">{node.title}</h5>
                    <p className="text-white/30 text-[10px] leading-relaxed">{node.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
}
