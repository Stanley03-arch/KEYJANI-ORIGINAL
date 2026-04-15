import React from "react";
import GovernanceInteractive from "@/components/GovernanceInteractive";
import { getProposals } from "@/lib/actions";

export default async function GovernancePage() {
  const proposals = await getProposals();

  return (
    <div className="page-shell page-transition-fade relative z-10">
      <GovernanceInteractive initialProposals={proposals} />
    </div>
  );
}
