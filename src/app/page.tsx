"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GrowthAnimation from "@/components/GrowthAnimation";
import { ArrowDown, ArrowRight, Globe, ShieldCheck, Zap, Sprout } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <GrowthAnimation />

      <div className="relative z-10">
        {/* Scroll Buffer for Animation */}
        <div className="h-[400vh] pointer-events-none" />

        <div className="relative bg-charcoal/40 backdrop-blur-sm">
          <section className="page-shell flex min-h-screen items-center justify-center py-20 text-center">
            <ScrollControlledHero />
          </section>

          <section className="page-shell py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="refined-border luxury-glow rounded-[3rem] p-10 md:p-20"
            >
              <div className="mb-12 flex justify-center gap-10 text-gold/60">
                <ShieldCheck size={32} />
                <Globe size={32} />
                <Zap size={32} />
              </div>
              <h2 className="mx-auto max-w-4xl font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
                Beyond a harvest.
                <span className="block italic text-gold">Toward a climate-positive economy.</span>
              </h2>
              <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
                Keyjani turns regenerative farming outcomes into trusted financial assets. We connect
                farmers, cooperatives, and global buyers through one auditable infrastructure layer
                built for the African continent.
              </p>
              <div className="mt-14 flex flex-col items-center justify-center gap-6 md:flex-row">
                <Link href="/market" className="btn-premium px-12 py-5 text-sm">
                  Enter Carbon Market <ArrowRight size={16} />
                </Link>
                <Link href="/satellite" className="btn-ghost px-12 py-5 text-sm">
                  Explore Oracle Stack
                </Link>
              </div>
            </motion.div>
          </section>

          <section className="page-shell py-20">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-6 rounded-[2.5rem] border border-white/5 bg-black/40 p-10 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Sprout size={24} />
                </div>
                <h3 className="text-3xl font-semibold text-white">For Farmers</h3>
                <p className="text-lg leading-relaxed text-white/60">
                  Access direct payouts for your soil health. No intermediaries, no delays. Just
                  verifiable impact paid directly to your wallet.
                </p>
                <Link href="/portal" className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
                  Launch Portal <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-6 rounded-[2.5rem] border border-white/5 bg-black/40 p-10 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Globe size={24} />
                </div>
                <h3 className="text-3xl font-semibold text-white">For Buyers</h3>
                <p className="text-lg leading-relaxed text-white/60">
                  Acquire high-integrity carbon credits verified by satellite oracles. Meet your ESG
                  goals with absolute transparency and trust.
                </p>
                <Link href="/market" className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
                  View Marketplace <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          <footer className="page-shell pb-20 pt-10 text-center">
            <div className="mx-auto mb-8 h-px w-32 bg-gold/30" />
            <div className="flex flex-col items-center gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/50">
                Built for Kenya - Propagated Globally
              </p>
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <Link href="/about" className="hover:text-gold transition-colors">About</Link>
                <Link href="/impact" className="hover:text-gold transition-colors">Impact</Link>
                <Link href="/docs" className="hover:text-gold transition-colors">Docs</Link>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                © 2026 Keyjani Solutions · Nexus Protocol V2
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function ScrollControlledHero() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <motion.div style={{ opacity, scale, y }} className="max-w-5xl px-2">
      <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-gold/35 bg-gold/12 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.27em] text-gold backdrop-blur-md md:text-[11px]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
        Kenya Regenerative Finance Layer
      </div>

      <h1 className="font-serif text-5xl font-semibold leading-[0.94] text-white md:text-8xl">
        The Soil Pays
        <span className="block italic text-gold">the Farmer.</span>
      </h1>

      <p className="mx-auto mb-12 mt-8 max-w-2xl px-2 text-base leading-relaxed text-white/70 md:text-lg">
        AI agronomy, satellite proof, and Web3 settlement in one operating system for smallholder
        farmers and high-integrity carbon buyers.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Link href="/portal" className="btn-premium w-full max-w-xs px-10 py-4">
          Launch Farmer Portal <ArrowRight size={14} />
        </Link>
        <Link href="/market" className="btn-ghost w-full max-w-xs px-10 py-4">
          Explore Marketplace
        </Link>
      </div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mt-16 flex flex-col items-center gap-2 text-gold/30"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll for Narrative</span>
        <ArrowDown size={16} />
      </motion.div>
    </motion.div>
  );
}
