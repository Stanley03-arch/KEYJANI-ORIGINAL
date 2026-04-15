import React from "react";
import { Cpu, ShieldCheck, TreePine, Terminal } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="page-shell page-transition-fade relative z-10">
      <header className="mb-20 text-center">
        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          Technical Documentation
        </span>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
          Protocol <span className="italic text-gold">Blueprint.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Explore the architecture of the Keyjani Nexus, from satellite ingestion pipelines to
          on-chain tokenized sequestration assets.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Sidebar Nav (Simplified) */}
        <aside className="lg:col-span-3 space-y-12">
           <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 px-3">Getting Started</h3>
              <ul className="space-y-1">
                 {["Introduction", "The $AGRI Token", "Economic Model"].map((item) => (
                    <li key={item}>
                       <button className="w-full text-left px-3 py-2 text-sm text-white/60 hover:text-gold hover:bg-white/5 rounded-lg transition-all">{item}</button>
                    </li>
                 ))}
              </ul>
           </div>
           <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 px-3">Infrastructure</h3>
              <ul className="space-y-1">
                 {["Satellite Oracle V2", "SoilVault Registry", "Nexus Node Setup"].map((item) => (
                    <li key={item}>
                       <button className="w-full text-left px-3 py-2 text-sm text-gold font-medium bg-gold/5 rounded-lg border-l-2 border-gold">{item}</button>
                    </li>
                 ))}
              </ul>
           </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9">
           <div className="refined-border rounded-[3rem] p-12 bg-charcoal/30 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                    <Cpu size={24} />
                 </div>
                 <h2 className="text-4xl font-semibold text-white">Satellite Oracle V2</h2>
              </div>

              <div className="prose prose-invert max-w-none space-y-8 text-white/70">
                 <p className="text-lg leading-relaxed">
                    The Satellite Oracle V2 ingest multispectral data from the Sentinel-2 constellation 
                    to determine Normalized Difference Vegetation Index (NDVI) and Soil Organic Carbon 
                    (SOC) estimates at sub-hectare resolutions.
                 </p>

                 <div className="bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
                    <div className="flex items-center gap-2 mb-4 text-white/40 border-b border-white/5 pb-2">
                       <Terminal size={14} /> <span>protocol-request-verification.sh</span>
                    </div>
                    <code className="text-emerald-400">
                       $ nexus verify --region KJ-RIFT-42 --methodology SOC-v3.2<br/>
                       [SYSTEM] Initializing telemetry handshake...<br/>
                       [SYSTEM] Received Sentinel-2 Layer: B08 (NIR) / B04 (Red)<br/>
                       [SYSTEM] Target: +0.42% SOC increase confirmed.<br/>
                       [SYSTEM] Oracle consensus reached via 5 validators.<br/>
                       [OK] Payout threshold achieved.
                    </code>
                 </div>

                 <div className="grid gap-6 md:grid-cols-2 mt-12">
                    <article className="p-8 rounded-3xl bg-white/5 border border-white/10">
                       <ShieldCheck className="text-gold mb-4" size={28} />
                       <h3 className="text-xl font-bold text-white mb-2">Cryptographic Proof</h3>
                       <p className="text-sm">Every verification is signed by the oracle cluster and anchored to the Nexus layer, ensuring immutability of climate claims.</p>
                    </article>
                    <article className="p-8 rounded-3xl bg-white/5 border border-white/10">
                       <TreePine className="text-gold mb-4" size={28} />
                       <h3 className="text-xl font-bold text-white mb-2">Biomass Registry</h3>
                       <p className="text-sm">A globally visible registry of every tree planted and every soil hectare improved through the protocol.</p>
                    </article>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
