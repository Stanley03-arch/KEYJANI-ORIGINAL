"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Recycle, ExternalLink, Leaf, ShieldCheck, Info } from "lucide-react";

interface Project {
  id: number;
  name: string;
  type: string;
  balance: string;
  price: string;
  zone: string;
  img: string;
}

const PROJECTS = [
  { id: 1, name: "Bungoma Rift Sequestration", type: "Reforestation", balance: "142.5 tCO2", price: "$22.50", zone: "KJ-482", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800" },
  { id: 2, name: "Mount Kenya Soil Vault", type: "Regenerative Farming", balance: "89.2 tCO2", price: "$25.00", zone: "KJ-012", img: "https://images.unsplash.com/photo-1523348830342-d0187cf0c283?w=800" },
  { id: 3, name: "Machakos Agroforestry", type: "Agroforestry", balance: "215.0 tCO2", price: "$18.75", zone: "KJ-105", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800" },
];

export default function MarketplaceExpanded() {
  const [activeTab, setActiveTab] = useState("buy");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="py-40 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20 space-y-6">
         <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
            6. Carbon Credit Marketplace
         </div>
         <h2 className="text-6xl font-black italic">The $AGRI-CO2 <span className="text-gold">Nexus.</span></h2>
         <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
           A institutional-grade marketplace where verified carbon sequestration becomes a liquid, tradable asset. Fund the farmers directly by acquiring and retiring their verified credits.
         </p>

         <div className="flex justify-center gap-4 pt-10">
            <button 
              onClick={() => setActiveTab("buy")}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                activeTab === "buy" ? "bg-gold text-black shadow-lg" : "bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
               Acquire
            </button>
            <button 
              onClick={() => setActiveTab("retire")}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                activeTab === "retire" ? "bg-gold text-black shadow-lg" : "bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
               Retire (ESG)
            </button>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {PROJECTS.map((project) => (
           <motion.div 
             key={project.id}
             whileHover={{ y: -10 }}
             className="magical-border group relative flex flex-col h-full"
           >
              <div className="bg-[#121212] rounded-xl overflow-hidden border border-white/5 h-full flex flex-col">
                 {/* Image */}
                 <div className="relative h-56 overflow-hidden">
                    <img src={project.img} alt={project.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 flex gap-2">
                       <span className="bg-gold/90 text-black text-[9px] font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                          <ShieldCheck size={10} /> VERIFIED
                       </span>
                       <span className="bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-bold px-2 py-1 rounded-sm">
                          {project.type}
                       </span>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h4 className="text-white font-bold text-lg leading-tight mb-1">{project.name}</h4>
                          <span className="text-gold/60 font-mono text-[10px] uppercase tracking-widest">{project.zone}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 bg-white/5 p-4 rounded-lg border border-white/5">
                       <div>
                          <div className="text-white/30 text-[9px] uppercase font-bold mb-1">Available</div>
                          <div className="text-white font-mono text-sm">{project.balance}</div>
                       </div>
                       <div>
                          <div className="text-white/30 text-[9px] uppercase font-bold mb-1">Floor Price</div>
                          <div className="text-gold font-mono text-sm underline decoration-gold/20">{project.price}</div>
                       </div>
                    </div>

                    <div className="mt-auto space-y-3">
                       <button 
                         onClick={() => setSelectedProject(project)}
                         className="w-full py-3 bg-gold text-black rounded font-black text-xs uppercase tracking-widest hover:bg-[#C5A02E] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                       >
                          <ShoppingCart size={14} /> {activeTab === "buy" ? "Initalize Order" : "Initiate Retirement"}
                       </button>
                       <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/60 rounded font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                          <Info size={12} /> View Certificate
                       </button>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Info Banner */}
      <div className="mt-20 glass-gold p-8 rounded-2xl border border-gold/20 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
         <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold">
            <Recycle size={32} />
         </div>
         <div className="flex-1 space-y-2">
            <h4 className="text-xl font-bold">Direct-to-Farmer Pipeline</h4>
            <p className="text-white/50 text-sm leading-relaxed max-w-3xl">
              Unlike traditional carbon offset markets where brokers take up to 70%, the Keyjani Marketplace ensures **minimum 85% of every dollar** goes directly into the hands of the regenerative farmer.
            </p>
         </div>
         <button className="whitespace-nowrap bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:invert transition-all active:scale-95">
            Become a Partner
         </button>
      </div>

      {/* Simplified Modal Simulation */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="max-w-md w-full glass-gold p-8 rounded-3xl border border-gold/40 shadow-2xl relative"
             >
                <button 
                   onClick={() => setSelectedProject(null)}
                   className="absolute top-4 right-4 text-white/40 hover:text-white"
                >
                  <ExternalLink size={20} />
                </button>
                <div className="text-center space-y-6">
                   <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto border-2 border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                      <Leaf size={40} />
                   </div>
                   <h3 className="text-3xl font-bold">Finalize Intent</h3>
                   <p className="text-white/60 text-sm">
                      You are about to initiate a {activeTab} order for **{selectedProject.name}**. This action will be verifiable on the Keyjani Nexus blockchain.
                   </p>
                   <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-left">
                      <div className="flex justify-between mb-2">
                         <span className="text-white/40 text-xs">Unit Cost:</span>
                         <span className="text-white font-mono text-xs">{selectedProject.price} / tCO2</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-white/40 text-xs">Verification ID:</span>
                         <span className="text-gold font-mono text-[10px]">{selectedProject.zone}-VER-99</span>
                      </div>
                   </div>
                   <button className="w-full py-4 bg-gold text-black rounded-full font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                      Confirm & Pay
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
