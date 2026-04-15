import React from "react";
import { Users, Leaf, Calendar } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="page-shell page-transition-fade relative z-10">
      <header className="mb-20 text-center">
        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          Real-Time Impact Metrics
        </span>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
          Making every gram <br />
          <span className="italic text-gold">accountable.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Transparency isn&apos;t just a buzzword. It&apos;s the technical foundation of the Keyjani Nexus.
          See the direct results of regenerative agriculture across Kenya.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {[
          { label: "Total Carbon Sequestered", val: "148,250", unit: "tCO2", sub: "Verified by Sentinel-2" },
          { label: "Total Farmer Payouts", val: "$3.4M", unit: "USD", sub: "Paid via M-Pesa & AGRI" },
          { label: "Hectares Restored", val: "12,400", unit: "Ha", sub: "Across 42 Counties" },
        ].map((stat, i) => (
          <div key={i} className="refined-border luxury-glow rounded-[2.5rem] p-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">{stat.label}</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-white tracking-tighter">{stat.val}</span>
              <span className="text-xl font-serif italic text-gold">{stat.unit}</span>
            </div>
            <p className="mt-6 text-xs font-mono text-gold/60 uppercase tracking-widest">{stat.sub}</p>
          </div>
        ))}
      </div>

      <section className="mt-24 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="refined-border rounded-[3rem] p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             <Leaf size={300} />
          </div>
          <h2 className="text-4xl font-semibold text-white mb-8">The Carbon Log</h2>
          <div className="space-y-6">
            {[
              { date: "Oct 14, 2026", region: "Bungoma", amount: "+420 tCO2", type: "Reforestation" },
              { date: "Oct 12, 2026", region: "Machakos", amount: "+125 tCO2", type: "Soil Health" },
              { date: "Oct 10, 2026", region: "Mt. Kenya", amount: "+890 tCO2", type: "Agroforestry" },
              { date: "Oct 08, 2026", region: "Nandi", amount: "+340 tCO2", type: "Regenerative" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">{log.region}</span>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase text-white/40">{log.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/30 mt-1 uppercase tracking-widest">
                    <Calendar size={10} /> {log.date}
                  </div>
                </div>
                <div className="text-gold font-mono font-bold">{log.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="refined-border rounded-[2.5rem] p-8 bg-gold/5 border-gold/20">
            <h3 className="text-xl font-semibold text-gold mb-4">Direct Verification</h3>
            <p className="text-sm leading-relaxed text-white/70">
              Unlike traditional models, Keyjani uses LiDAR and multispectral imaging to verify
              biomass density updates every 14 days. This reduces verification costs by 90% and
              increases trust by 100%.
            </p>
          </div>
          <div className="refined-border rounded-[2.5rem] p-8">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                   <Users size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white">Social Impact</h3>
             </div>
             <p className="text-sm leading-relaxed text-white/60 mb-6">
                85% of every dollar spent on the marketplace goes directly to the verified farmer.
                This has resulted in a 42% average income increase for participating households.
             </p>
             <button className="btn-ghost w-full py-4 text-[10px]">Read Social Audit Report</button>
          </div>
        </div>
      </section>
    </div>
  );
}
