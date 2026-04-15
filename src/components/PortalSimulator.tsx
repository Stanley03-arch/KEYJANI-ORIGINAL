"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, MessageCircle, Phone, Smartphone, Sprout, TrendingUp, User } from "lucide-react";

type ActivityLog = {
  title: string;
  amount: string;
  color: string;
};

type FarmerState = {
  balance_kes: number;
  balance_tco2: number;
  activity?: ActivityLog[];
};

export default function PortalSimulator({ farmerState }: { farmerState: FarmerState }) {
  const activities = farmerState.activity ?? [];

  return (
    <div className="relative mx-auto w-fit">
      <div className="pointer-events-none absolute inset-0 -z-10 scale-105 rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative h-[680px] w-[340px] overflow-hidden rounded-[3rem] border-[5px] border-[#1f2e24] bg-[#060b08] p-3 shadow-[0_45px_90px_-40px_rgba(0,0,0,0.95)]"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#08120d]">
          <header className="border-b border-white/10 bg-gradient-to-b from-gold/12 to-transparent px-5 pb-5 pt-9">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                  Keyjani Nexus
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/45">
                  Farmer Dashboard
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70">
                <User size={14} />
              </div>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Available Balance
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              KES {farmerState.balance_kes.toLocaleString()}
            </p>
          </header>

          <div className="flex-1 space-y-5 px-5 py-5">
            <section className="rounded-2xl bg-gold p-4 text-black shadow-[0_14px_30px_-18px_rgba(215,180,90,0.8)]">
              <div className="mb-3 flex items-center justify-between">
                <Sprout size={18} />
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/55">
                  Verified Zone
                </span>
              </div>
              <p className="text-xl font-semibold">+{farmerState.balance_tco2.toFixed(2)} tCO2</p>
              <p className="text-[10px] font-medium text-black/70">Active sequestration position</p>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-white/10 bg-white/6 p-3 text-left text-white/80 transition-colors hover:bg-white/10">
                <MessageCircle size={16} className="text-gold" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em]">Ask AI</p>
              </button>
              <button className="rounded-xl border border-white/10 bg-white/6 p-3 text-left text-white/80 transition-colors hover:bg-white/10">
                <TrendingUp size={16} className="text-gold" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em]">Performance</p>
              </button>
            </section>

            <section className="space-y-2">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Recent Activity
              </h2>
              {activities.length > 0 ? (
                activities.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span className="text-[11px] text-white/75">{item.title}</span>
                    <span className={`font-mono text-[11px] font-medium ${item.color}`}>{item.amount}</span>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-[10px] uppercase tracking-[0.12em] text-white/40">
                  No recent transactions
                </p>
              )}
            </section>
          </div>

          <footer className="mt-auto flex items-center justify-around border-t border-white/10 bg-black/30 py-4">
            <Smartphone size={18} className="text-gold" />
            <Globe size={18} className="text-white/40" />
            <Phone size={18} className="text-white/40" />
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
