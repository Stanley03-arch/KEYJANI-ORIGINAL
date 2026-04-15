"use server";

import db from "./db";
import { revalidatePath } from "next/cache";

interface Project {
  id: number;
  name: string;
  type: string;
  balance: string;
  price: string;
  zone: string;
  img: string;
  description?: string;
  farmer_name?: string;
  carbon_score?: number;
  location?: string;
  practices?: string;
  verified_date?: string;
}

interface FarmerState {
  id: number;
  balance_kes: number;
  balance_tco2: number;
  total_earnings: number;
  farm_health: string;
  carbon_score: number;
  staked_agri: number;
  pending_rewards: number;
  last_updated: string;
}

interface StakingPool {
  id: number;
  name: string;
  apy: number;
  lock_period: string;
  min_stake: number;
  capacity_total: number;
  capacity_current: number;
  status: string;
}

interface Proposal {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  votes_for: number;
  votes_against: number;
  end_date: string;
  total_votes_needed: number;
}

interface ActivityLog {
  id: number;
  title: string;
  amount: string;
  color: string;
  timestamp: string;
}

// Marketplace Actions
export async function getProjects(): Promise<Project[]> {
  return db.prepare("SELECT * FROM projects").all() as Project[];
}

export async function purchaseProject(projectId: number, amountKes: number) {
  try {
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(projectId) as Project | undefined;
    if (!project) throw new Error("Project not found");

    const farmer = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get() as FarmerState | undefined;
    if (!farmer) throw new Error("Farmer state not found");
    if (farmer.balance_kes < amountKes) throw new Error("Insufficient balance");

    const transaction = db.transaction(() => {
      db.prepare("UPDATE farmer_state SET balance_kes = balance_kes - ? WHERE id = 1").run(amountKes);
      db.prepare("INSERT INTO activity_log (title, amount, color) VALUES (?, ?, ?)").run(
        `Purchase: ${project.name}`,
        `-${amountKes.toLocaleString()}`,
        "text-white/50"
      );
    });

    transaction();
    revalidatePath("/market");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// DeFi Actions
export async function stakeTokens(poolId: number, amount: number) {
  try {
    const farmer = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get() as any;
    if (farmer.balance_kes < amount) throw new Error("Insufficient balance to convert to AGRI");

    const transaction = db.transaction(() => {
      db.prepare("UPDATE farmer_state SET balance_kes = balance_kes - ?, staked_agri = staked_agri + ? WHERE id = 1").run(amount, amount);
      db.prepare("INSERT INTO user_stakes (pool_id, amount) VALUES (?, ?)").run(poolId, amount);
      db.prepare("UPDATE staking_pools SET capacity_current = capacity_current + ? WHERE id = ?").run(amount, poolId);
      
      db.prepare("INSERT INTO activity_log (title, amount, color) VALUES (?, ?, ?)").run(
        "Staked tokens",
        `-${amount.toLocaleString()} AGRI`,
        "text-white/50"
      );
    });

    transaction();
    revalidatePath("/staking");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function claimRewards() {
  try {
    const farmer = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get() as any;
    const rewards = farmer.pending_rewards;
    
    const transaction = db.transaction(() => {
      db.prepare("UPDATE farmer_state SET balance_kes = balance_kes + ?, pending_rewards = 0 WHERE id = 1").run(rewards);
      db.prepare("INSERT INTO activity_log (title, amount, color) VALUES (?, ?, ?)").run(
        "Claimed rewards",
        `+${rewards.toLocaleString()} KES`,
        "text-gold"
      );
    });

    transaction();
    revalidatePath("/staking");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function castVote(proposalId: number, side: 'for' | 'against') {
  try {
    const field = side === 'for' ? 'votes_for' : 'votes_against';
    const amount = 1250; // User's voting power
    
    db.prepare(`UPDATE proposals SET ${field} = ${field} + ? WHERE id = ?`).run(amount, proposalId);
    
    db.prepare("INSERT INTO activity_log (title, amount, color) VALUES (?, ?, ?)").run(
      `Voted ${side.toUpperCase()} proposal #${proposalId}`,
      "+1,250 Power",
      side === 'for' ? "text-emerald-400" : "text-rose-400"
    );

    revalidatePath("/governance");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Data Fetching
export async function getStakingData() {
  const pools = db.prepare("SELECT * FROM staking_pools").all() as StakingPool[];
  const farmer = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get() as FarmerState;
  return { pools, farmer };
}

export async function getProposals(): Promise<Proposal[]> {
  return db.prepare("SELECT * FROM proposals").all() as Proposal[];
}

export async function getFarmerState() {
  const farmer = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get() as FarmerState;
  const activity = db.prepare("SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 5").all() as ActivityLog[];
  return { ...farmer, activity };
}
