import React from "react";
import MarketplaceInteractive from "@/components/MarketplaceInteractive";
import { getProjects } from "@/lib/actions";

export default async function MarketplacePage() {
  const projects = await getProjects();

  return (
    <div className="page-shell page-transition-fade">
      <header className="mb-14 space-y-7 md:mb-18">
        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          Carbon Nexus - Institutional Grade
        </span>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
              Marketplace <span className="italic text-gold">for verified soil carbon.</span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              Trade high-integrity carbon units from regenerative projects across Kenya, each backed
              by satellite verification and traceable farmer impact.
            </p>
          </div>

          <div className="refined-border rounded-3xl p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Global Floor Price
            </p>
            <p className="mt-3 font-mono text-3xl font-semibold text-gold">$18.75 / tCO2</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Updated with market depth and project quality multipliers.
            </p>
          </div>
        </div>
      </header>

      <MarketplaceInteractive initialProjects={projects} />
    </div>
  );
}
