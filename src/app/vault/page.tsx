"use client";

import React from "react";
import { Landmark, Lock, ShieldCheck, TrendingUp } from "lucide-react";

export default function VaultPage() {
  return (
    <div className="page-shell page-transition-fade">
      <div className="mb-14 grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            Vault - Regenerative Banking
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            Collateralize verified soil value.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Store validated carbon output in structured vaults and unlock lower-cost credit for farm
            operations, resilience, and long-term wealth planning.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="btn-premium px-10 py-4">Open Vault</button>
            <button className="btn-ghost px-10 py-4">View Collateral Rules</button>
          </div>
        </div>

        <div className="refined-border relative overflow-hidden rounded-[2.2rem] p-8 md:p-10">
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/5 text-gold/8">
            <Landmark size={280} />
          </div>

          <div className="relative z-10 space-y-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Lock size={18} />
                </div>
                <h2 className="text-xl font-semibold text-white">Active Vault KJ-01</h2>
              </div>
              <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                Secured
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
                Locked Asset Value
              </p>
              <p className="mt-3 text-4xl font-semibold text-white">
                4,285.5 <span className="text-xl text-gold/70">tCO2</span>
              </p>
              <p className="mt-2 flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                <TrendingUp size={12} /> +2.1% total yield YTD
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
                  Staking APY
                </p>
                <p className="mt-2 font-mono text-xl text-gold">4.8% AGRI</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
                  Time to Maturity
                </p>
                <p className="mt-2 font-mono text-xl text-white">~28 months</p>
              </div>
            </div>

            <button className="btn-premium w-full">Withdraw Rewards</button>
          </div>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Deep liquidity",
            desc: "Convert part of vault value into working capital without liquidating long-term position.",
          },
          {
            title: "Insurance protocol",
            desc: "Risk pools help absorb severe weather shocks and preserve lender confidence.",
          },
          {
            title: "Inheritance model",
            desc: "Smart contract succession protects family ownership of long-term soil assets.",
          },
        ].map((feature) => (
          <article key={feature.title} className="refined-border rounded-3xl p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/12 text-gold">
              <ShieldCheck size={18} />
            </div>
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{feature.desc}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
