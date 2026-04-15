import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Sprout, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page-shell page-transition-fade relative z-10">
      <header className="mb-20 text-center">
        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          Our Mission - Rooted in Truth
        </span>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
          Restoring the Earth, <br />
          <span className="italic text-gold">One hectare at a time.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Keyjani was founded with a single premise: those who restore the planet should be the ones
          who benefit most from its recovery.
        </p>
      </header>

      <section className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="refined-border rounded-[2.5rem] p-10">
            <h2 className="text-3xl font-semibold text-white mb-6">The Problem</h2>
            <p className="text-lg leading-relaxed text-white/70">
              For decades, carbon markets have been opaque, expensive, and inaccessible to the
              smallholder farmers who actually do the work of sequestration. Brokers take the
              majority of the value, leaving the stewards of the land with pennies.
            </p>
          </div>
          <div className="refined-border rounded-[2.5rem] p-10 bg-gold/5">
            <h2 className="text-3xl font-semibold text-gold mb-6">The Nexus Solution</h2>
            <p className="text-lg leading-relaxed text-white/70">
              By using satellite oracles and decentralized finance, we remove the middleman. Every
              ton of carbon sequestered is verified by space-borne sensors and paid directly to the
              farmer via mobile money.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: <Shield size={24} />, title: "Trustless", desc: "Verified by physics, not paperwork." },
            { icon: <Users size={24} />, title: "Community", desc: "Owned and governed by the participants." },
            { icon: <Sprout size={24} />, title: "Growth", desc: "Incentivizing long-term soil health." },
            { icon: <Globe size={24} />, title: "Global", desc: "Standardizing the truth for the planet." },
          ].map((item, i) => (
            <div key={i} className="refined-border flex flex-col items-center justify-center rounded-[2rem] p-8 text-center">
              <div className="mb-4 text-gold">{item.icon}</div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-32 text-center">
        <h2 className="font-serif text-4xl text-white italic">&quot;The soil pays the farmer, and the truth pays the planet.&quot;</h2>
      </footer>
    </div>
  );
}
