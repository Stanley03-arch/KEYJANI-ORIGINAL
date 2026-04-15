"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Shield, Activity, Crosshair, Radar } from "lucide-react";

export default function SatelliteOracleUI() {
  const [scanning, setScanning] = useState(true);
  const [activeLayer, setActiveLayer] = useState("NDVI");

  return (
    <div className="relative py-40 px-6 bg-charcoal-light/30 border-y border-white/5 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Interactive Map/Scanner */}
        <div className="flex-1 w-full max-w-2xl">
           <div className="magical-border p-1">
              <div className="relative aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/10 group">
                 {/* Map Visualization (CSS-based) */}
                 <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000')] bg-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
                 </div>

                 {/* Scan Overlay */}
                 <AnimatePresence>
                   {scanning && (
                     <motion.div 
                        initial={{ top: -100 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent z-20 shadow-[0_0_20px_var(--gold)]"
                     />
                   )}
                 </AnimatePresence>

                 {/* Data Points */}
                 <div className="absolute inset-0 p-8">
                    <div className="flex justify-between items-start">
                       <div className="bg-black/60 backdrop-blur-md p-3 rounded border border-white/10">
                          <div className="text-[10px] text-gold font-mono uppercase tracking-[0.2em] mb-1">Scanning Region</div>
                          <div className="text-white font-bold text-sm tracking-tighter">KJ-RIFT-042 (BUNGOMA)</div>
                       </div>
                       <div className="flex flex-col gap-2">
                          <div className="bg-black/80 p-2 rounded border border-gold/20 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                             <div className="text-[10px] text-white/80 font-mono">SIGNAL: STABLE</div>
                          </div>
                          <div className="bg-black/80 p-2 rounded border border-white/10 flex items-center gap-2">
                             <Radar size={12} className="text-gold animate-spin" />
                             <div className="text-[10px] text-white/80 font-mono">LAT: 0.567° N</div>
                          </div>
                       </div>
                    </div>

                    {/* Target Reticles */}
                    <div className="absolute top-1/2 left-1/3 -translate-y-1/2">
                       <motion.div 
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.5 }}
                         className="relative"
                       >
                          <Crosshair className="text-gold w-12 h-12 animate-pulse" />
                          <div className="absolute top-full mt-2 w-32 bg-gold/90 text-black p-2 text-[9px] font-bold rounded shadow-2xl">
                             VEGETATION INDEX: 0.82 <br />
                             SEQUESTRATION: +1.2t / HA
                          </div>
                       </motion.div>
                    </div>
                 </div>

                 {/* Bottom Bar UI */}
                 <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 flex justify-between items-center">
                    <div className="flex gap-4">
                       {["NDVI", "SOIL MOISTURE", "THERMAL"].map(layer => (
                          <button 
                             key={layer}
                             onClick={() => setActiveLayer(layer)}
                             className={`text-[10px] font-mono px-3 py-1 rounded border transition-all ${
                               activeLayer === layer ? "bg-gold text-black border-gold" : "bg-transparent text-white/40 border-white/10"
                             }`}
                          >
                             {layer}
                          </button>
                       ))}
                    </div>
                    <button 
                      onClick={() => setScanning(!scanning)}
                      className="flex items-center gap-2 text-gold font-bold text-[10px] hover:text-white transition-colors"
                    >
                       <Activity size={14} /> LIVE FEED
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-10">
           <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold">
              2. Satellite + IoT Oracle Stack
           </div>
           <h2 className="text-5xl md:text-6xl font-black leading-tight">
              Absolute Truth. <br />
              <span className="text-gold italic font-serif">Verified from Space.</span>
           </h2>
           <p className="text-white/60 text-lg leading-relaxed font-light">
             Keyjani removes the &ldquo;Trust Gap&rdquo; in carbon markets. We don&apos;t just ask farmers; we see the results. Using multi-spectral satellite imagery and deep-soil IoT sensors, we confirm every gram of carbon sequestered.
           </p>

           <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-3">
                 <div className="w-10 h-10 rounded shadow-lg flex items-center justify-center bg-gold/10 text-gold border border-gold/30">
                    <Shield size={20} />
                 </div>
                 <h4 className="text-white font-bold tracking-tight">Trustless Proof</h4>
                 <p className="text-white/40 text-sm leading-snug">Autonomous data collection prevents manipulation or double-counting of carbon credits.</p>
              </div>
              <div className="space-y-3">
                 <div className="w-10 h-10 rounded shadow-lg flex items-center justify-center bg-gold/10 text-gold border border-gold/30">
                    <Globe size={20} />
                 </div>
                 <h4 className="text-white font-bold tracking-tight">Global Compliance</h4>
                 <p className="text-white/40 text-sm leading-snug">Auditable records that meet the highest international gold-standard VCM requirements.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
