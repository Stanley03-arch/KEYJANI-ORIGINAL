import React from "react";
import StakingInteractive from "@/components/StakingInteractive";
import { getStakingData } from "@/lib/actions";

export default async function StakingPage() {
  const { pools, farmer } = await getStakingData();

  return (
    <div className="page-shell page-transition-fade relative z-10">
      <StakingInteractive initialPools={pools} farmer={farmer} />
    </div>
  );
}
