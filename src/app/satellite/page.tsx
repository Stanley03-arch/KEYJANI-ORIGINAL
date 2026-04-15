"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Crosshair, Globe, Layers, Radar, Shield, Zap } from "lucide-react";

const LAYERS = ["NDVI", "Moisture", "Biomass"] as const;

export default function SatellitePage() {
  const [activeLayer, setActiveLayer] = useState<(typeof LAYERS)[number]>("NDVI");
  const [isScanning, setIsScanning] = useState(true);

  return (
    <div className="page-shell page-transition-fade">
      <div className="mb-14 grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            Oracle - Verification Layer
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            Satellite truth for every carbon claim.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Keyjani combines multispectral imagery and field telemetry to verify sequestration with
            auditable confidence.
          </p>

          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <Shield size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Auditable Data</p>
                <p className="text-xs text-white/55">On-chain verification logs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <Globe size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Global Standards</p>
                <p className="text-xs text-white/55">VCM compliance ready</p>
              </div>
            </div>
          </div>
        </div>

        <div className="refined-border rounded-[2rem] p-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-white/10 bg-black">
            <div className="absolute inset-0 opacity-45 grayscale">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"
                alt="Satellite scan"
                className="h-full w-full object-cover"
              />
            </div>

            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 z-20 h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_18px_rgba(215,180,90,0.8)]"
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl border border-white/15 bg-black/70 p-3 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
                    Region Scanner
                  </p>
                  <p className="mt-1 font-mono text-sm text-white">KJ-RIFT-042 (BUNGOMA)</p>
                </div>

                <div className="rounded-xl border border-gold/25 bg-black/65 px-3 py-2 backdrop-blur-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/85">
                    Signal Stable
                  </p>
                </div>
              </div>

              <div className="mx-auto flex items-center justify-center">
                <div className="relative">
                  <Crosshair size={64} className="text-gold" />
                  <motion.div
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-gold/45"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/15 bg-black/70 p-3 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {LAYERS.map((layer) => (
                      <button
                        key={layer}
                        onClick={() => setActiveLayer(layer)}
                        className={`rounded-md border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                          activeLayer === layer
                            ? "border-gold bg-gold text-black"
                            : "border-white/20 bg-white/5 text-white/70"
                        }`}
                      >
                        {layer}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsScanning((prev) => !prev)}
                    className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold"
                  >
                    <Activity size={12} />
                    Live Feed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: <Radar size={20} />,
            title: "Real-time telemetry",
            desc: "Sentinel refresh cycles and field inputs maintain current sequestration confidence.",
          },
          {
            icon: <Layers size={20} />,
            title: "Multi-spectral analysis",
            desc: "Beyond visual greenness into moisture, biomass density, and persistence patterns.",
          },
          {
            icon: <Zap size={20} />,
            title: "Automatic settlements",
            desc: "Oracle updates trigger contract execution when verified thresholds are reached.",
          },
        ].map((feature) => (
          <article key={feature.title} className="refined-border rounded-3xl p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/12 text-gold">
              {feature.icon}
            </div>
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{feature.desc}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
