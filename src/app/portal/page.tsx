import React from "react";
import { Languages, Zap } from "lucide-react";
import PortalSimulator from "@/components/PortalSimulator";
import { getFarmerState } from "@/lib/actions";

export default async function FarmerPortalPage() {
  const farmerState = await getFarmerState();

  return (
    <div className="page-shell page-transition-fade">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] xl:gap-18">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            Farmer Portal - Mobile First Access
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            One app for farm intelligence, payouts, and proof.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Keyjani Portal is designed for low-bandwidth environments, helping farmers turn verified
            regenerative outcomes into predictable income.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="refined-border rounded-2xl p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Languages size={18} />
              </div>
              <h2 className="text-lg font-semibold text-white">Localized guidance</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Voice and text support in Kiswahili, Kalenjin, and Kikuyu for daily agronomy actions.
              </p>
            </article>

            <article className="refined-border rounded-2xl p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Zap size={18} />
              </div>
              <h2 className="text-lg font-semibold text-white">Fast settlements</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Automated conversion from verified carbon value to M-Pesa-ready payout workflows.
              </p>
            </article>
          </div>

          <button className="btn-premium px-9 py-4">Download Pilot APK</button>
        </div>

        <PortalSimulator farmerState={farmerState} />
      </div>
    </div>
  );
}
