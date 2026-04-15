import React from "react";
import db from "@/lib/db";
import DashboardInteractive from "@/components/DashboardInteractive";

export default async function DashboardPage() {
  const farmerState = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get() as any;

  return (
    <div className="page-shell page-transition-fade">
      <DashboardInteractive farmerState={farmerState} />
    </div>
  );
}
