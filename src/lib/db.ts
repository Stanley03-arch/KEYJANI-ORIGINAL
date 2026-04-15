import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "keyjani.db");
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS pre_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    wallet_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS carbon_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmer_id TEXT,
    action TEXT,
    tonnes_sequestered REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    balance TEXT NOT NULL,
    price TEXT NOT NULL,
    zone TEXT NOT NULL,
    img TEXT NOT NULL,
    description TEXT,
    farmer_name TEXT,
    carbon_score INTEGER,
    location TEXT,
    practices TEXT,
    verified_date TEXT
  );

  CREATE TABLE IF NOT EXISTS farmer_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    balance_kes INTEGER DEFAULT 14820,
    balance_tco2 REAL DEFAULT 1.25,
    total_earnings REAL DEFAULT 247.80,
    farm_health TEXT DEFAULT 'Excellent',
    carbon_score REAL DEFAULT 87.5,
    staked_agri REAL DEFAULT 847.0,
    pending_rewards REAL DEFAULT 24.80,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount TEXT NOT NULL,
    color TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS staking_pools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    apy REAL NOT NULL,
    lock_period TEXT NOT NULL,
    min_stake INTEGER NOT NULL,
    capacity_total INTEGER NOT NULL,
    capacity_current INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Active'
  );

  CREATE TABLE IF NOT EXISTS user_stakes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pool_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    staked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(pool_id) REFERENCES staking_pools(id)
  );

  CREATE TABLE IF NOT EXISTS proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    votes_for INTEGER DEFAULT 0,
    votes_against INTEGER DEFAULT 0,
    end_date TEXT NOT NULL,
    total_votes_needed INTEGER DEFAULT 20000
  );
`);

// Migrations for existing DB
try {
  db.prepare("ALTER TABLE projects ADD COLUMN farmer_name TEXT").run();
  db.prepare("ALTER TABLE projects ADD COLUMN carbon_score INTEGER").run();
  db.prepare("ALTER TABLE projects ADD COLUMN location TEXT").run();
  db.prepare("ALTER TABLE projects ADD COLUMN practices TEXT").run();
  db.prepare("ALTER TABLE projects ADD COLUMN verified_date TEXT").run();
} catch (e) {}

try {
  db.prepare("ALTER TABLE farmer_state ADD COLUMN total_earnings REAL DEFAULT 247.80").run();
  db.prepare("ALTER TABLE farmer_state ADD COLUMN farm_health TEXT DEFAULT 'Excellent'").run();
  db.prepare("ALTER TABLE farmer_state ADD COLUMN carbon_score REAL DEFAULT 87.5").run();
  db.prepare("ALTER TABLE farmer_state ADD COLUMN staked_agri REAL DEFAULT 847.0").run();
  db.prepare("ALTER TABLE farmer_state ADD COLUMN pending_rewards REAL DEFAULT 24.80").run();
} catch (e) {}

const tableInfo = db.prepare("PRAGMA table_info(proposals)").all() as any[];
if (!tableInfo.some(col => col.name === 'category')) {
  db.prepare("DROP TABLE IF EXISTS proposals").run();
  db.exec(`
    CREATE TABLE proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      votes_for INTEGER DEFAULT 0,
      votes_against INTEGER DEFAULT 0,
      end_date TEXT NOT NULL,
      total_votes_needed INTEGER DEFAULT 20000
    )
  `);
}

// Initialize farmer state if not exists
const row = db.prepare("SELECT * FROM farmer_state WHERE id = 1").get();
if (!row) {
  db.prepare(`
    INSERT INTO farmer_state (id, balance_kes, balance_tco2, total_earnings, farm_health, carbon_score, staked_agri, pending_rewards) 
    VALUES (1, 14820, 1.25, 247.80, 'Excellent', 87.5, 847.0, 24.80)
  `).run();
  
  // Seed initial activity
  const initialActivity = [
    { title: "M-Pesa Out", amount: "-4,000", color: "text-white/50" },
    { title: "SOC Verification", amount: "+2,450", color: "text-gold" },
    { title: "AGRI Yield", amount: "+ 820", color: "text-gold" },
  ];
  
  const insertActivity = db.prepare("INSERT INTO activity_log (title, amount, color) VALUES (?, ?, ?)");
  initialActivity.forEach(act => insertActivity.run(act.title, act.amount, act.color));
}

// Seed Staking Pools if empty
const poolCount = db.prepare("SELECT COUNT(*) as count FROM staking_pools").get() as { count: number };
if (poolCount.count === 0) {
  const pools = [
    { name: "Flexi Stake", apy: 8.5, lock_period: "No lock", min_stake: 10, capacity_total: 500000, capacity_current: 125000 },
    { name: "Monthly Growth", apy: 12.5, lock_period: "30 days", min_stake: 50, capacity_total: 200000, capacity_current: 89000 },
    { name: "Annual Harvest", apy: 18.2, lock_period: "365 days", min_stake: 100, capacity_total: 150000, capacity_current: 67000 },
  ];
  const insertPool = db.prepare("INSERT INTO staking_pools (name, apy, lock_period, min_stake, capacity_total, capacity_current) VALUES (?, ?, ?, ?, ?, ?)");
  pools.forEach(p => insertPool.run(p.name, p.apy, p.lock_period, p.min_stake, p.capacity_total, p.capacity_current));
}

// Seed Proposals if empty
const proposalCount = db.prepare("SELECT COUNT(*) as count FROM proposals").get() as { count: number };
if (proposalCount.count === 0) {
  const proposals = [
    { title: "Increase Carbon Credit Verification Standards", description: "Proposal to implement stricter verification requirements for carbon credits to enhance trust and market value.", category: "Standards", votes_for: 12500, votes_against: 3200, end_date: "5 days" },
    { title: "Launch Farmer Education Program", description: "Allocate 500,000 $AGRI tokens to fund comprehensive regenerative agriculture training programs across Kenya and Uganda.", category: "Education", votes_for: 18900, votes_against: 1100, end_date: "2 days" },
  ];
  const insertProposal = db.prepare("INSERT INTO proposals (title, description, category, votes_for, votes_against, end_date) VALUES (?, ?, ?, ?, ?, ?)");
  proposals.forEach(p => insertProposal.run(p.title, p.description, p.category, p.votes_for, p.votes_against, p.end_date));
}

// Seed Projects if empty (Re-seeding with more details)
db.prepare("DELETE FROM projects").run(); // Refresh projects for new schema
const initialProjectsStates = [
  {
    name: "Green Valley Farm",
    type: "Soil Sequestration",
    balance: "3.5 tonnes",
    price: "$43.75",
    zone: "$12.5 / tonne",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    description: "High-quality regenerative project with third-party verification and transparent payout mechanics.",
    farmer_name: "Samuel Kiprotich",
    carbon_score: 87,
    location: "Nakuru, Kenya",
    practices: "Cover Cropping, Composting",
    verified_date: "1/15/2024"
  },
  {
    name: "Sunrise Agriculture",
    type: "Regenerative Grazing",
    balance: "2.8 tonnes",
    price: "$30.80",
    zone: "$11 / tonne",
    img: "https://images.unsplash.com/photo-1523348830342-d0187cf0c283?w=800",
    description: "Optimizing soil organic carbon through no-till practices and cover cropping in high-altitude volcanic soils.",
    farmer_name: "Grace Nakato",
    carbon_score: 82,
    location: "Mbarara, Uganda",
    practices: "Rotational Grazing, Organic Fertilizer",
    verified_date: "1/12/2024"
  },
  {
    name: "Highland Harvest",
    type: "Agroforestry",
    balance: "4.2 tonnes",
    price: "$57.96",
    zone: "$13.8 / tonne",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    description: "Integrating nitrogen-fixing trees with traditional crops to improve yields and diversify carbon income.",
    farmer_name: "John Mwangi",
    carbon_score: 91,
    location: "Arusha, Tanzania",
    practices: "Permaculture, Biochar",
    verified_date: "1/10/2024"
  }
];

const insertProject = db.prepare(`
  INSERT INTO projects (name, type, balance, price, zone, img, description, farmer_name, carbon_score, location, practices, verified_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

initialProjectsStates.forEach(p => {
  insertProject.run(p.name, p.type, p.balance, p.price, p.zone, p.img, p.description, p.farmer_name, p.carbon_score, p.location, p.practices, p.verified_date);
});

export default db;

