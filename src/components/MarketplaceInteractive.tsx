"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Filter, Leaf, Search, ShieldCheck, X, 
  MapPin, User, TrendingUp, Calendar, 
  ChevronDown, Check, ShoppingCart, Globe
} from "lucide-react";
import Link from "next/link";
import { purchaseProject } from "@/lib/actions";

type Project = {
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
};

export default function MarketplaceInteractive({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  
  // States for filters
  const [priceRange, setPriceRange] = useState("All Prices");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const filteredProjects = useMemo(
    () =>
      initialProjects.filter((project) => {
        const query = search.toLowerCase();
        const matchesSearch = 
          project.name.toLowerCase().includes(query) ||
          project.location?.toLowerCase().includes(query) ||
          project.farmer_name?.toLowerCase().includes(query);
          
        const matchesLocation = locationFilter === "All Locations" || project.location?.includes(locationFilter);
        
        return matchesSearch && matchesLocation;
      }),
    [initialProjects, search, locationFilter]
  );

  const handlePurchase = async () => {
    if (!selectedProject) return;
    setIsPurchasing(true);
    setMessage(null);
    const result = await purchaseProject(selectedProject.id, 3000);
    if (result.success) {
      setMessage("Assets retired successfully. Verification receipt sent to your register.");
      setTimeout(() => {
        setSelectedProject(null);
        setMessage(null);
      }, 1800);
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setIsPurchasing(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-end gap-3">
        <Link href="/dashboard" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-white/10 transition-colors">
          Dashboard
        </Link>
        <Link href="/" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-white/10 transition-colors">
          Home
        </Link>
        <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all">
          <ShoppingCart size={13} /> Cart (0)
        </button>
      </div>

      {/* Header Stats From Screenshot */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Credits Available", val: "12,847", sub: "+247 new this week", icon: <Leaf size={18} /> },
          { label: "Average Price", val: "$12.40", sub: "+8.2% from last week", icon: <span className="text-xl font-bold">$</span> },
          { label: "Active Farmers", val: "1,247", sub: "+89 new farmers", icon: <User size={18} /> },
          { label: "Credits Retired", val: "8,432", sub: "-2.1% this month", icon: <Globe size={18} /> },
        ].map((stat, i) => (
          <div key={i} className="refined-border bg-white/[0.03] backdrop-blur-md rounded-3xl p-6">
             <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">{stat.label}</p>
                <div className="text-gold/60">{stat.icon}</div>
             </div>
             <div className="space-y-1">
                <p className="text-3xl font-bold text-white tracking-tighter">{stat.val}</p>
                <p className="text-[10px] text-emerald-400 font-medium">
                  {stat.sub.startsWith('+') ? '↑' : '↓'} {stat.sub}
                </p>
             </div>
          </div>
        ))}
      </section>

      {/* Categories Bar */}
      <div className="flex gap-10 border-b border-white/5 pb-1">
        {["Browse Credits", "Market Analytics", "My Portfolio", "Retired Credits"].map((cat, i) => (
          <button key={cat} className={`pb-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${i === 0 ? 'text-gold border-b-2 border-gold' : 'text-white/30 hover:text-white/60'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Detailed Filters Component */}
      <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8 text-white/40">
           <Filter size={18} />
           <span className="text-sm font-semibold tracking-wide">Filter Credits</span>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <div className="relative">
             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
             <input 
              type="text" 
              placeholder="Search by farm or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-all"
             />
          </div>

          {[
            { label: "Price Range", val: priceRange, setter: setPriceRange },
            { label: "Verification Status", val: statusFilter, setter: setStatusFilter },
            { label: "Location", val: locationFilter, setter: setLocationFilter, options: ["Nakuru", "Mbarara", "Arusha"] }
          ].map((filter) => (
            <div key={filter.label} className="relative group">
              <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/60 hover:border-gold/30 hover:text-white transition-all">
                {filter.val}
                <ChevronDown size={14} className="group-hover:text-gold" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Project Cards */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.id}
            whileHover={{ y: -6 }}
            className="refined-border group flex flex-col overflow-hidden rounded-[2.5rem] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={project.img}
                alt={project.name}
                className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
              <div className="absolute left-6 top-6 flex gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-black backdrop-blur-md shadow-lg">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  Verified
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-6 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{project.name}</h2>
                  <div className="mt-2 flex items-center gap-2 text-white/40">
                    <MapPin size={12} className="text-gold/50" />
                    <span className="text-[11px] font-medium tracking-wide uppercase">{project.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-400 tracking-tighter">{project.price}</p>
                  <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest">{project.zone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-y border-white/5 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60">
                   <User size={18} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-white/30">Farmer</p>
                   <p className="text-sm font-semibold text-white/80">{project.farmer_name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf size={12} className="text-emerald-500/60" />
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">CO2 Sequestered</p>
                    </div>
                    <p className="text-lg font-bold text-white tracking-tight">{project.balance}</p>
                 </div>
                 <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <TrendingUp size={12} className="text-gold/60" />
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Carbon Score</p>
                    </div>
                    <p className="text-lg font-bold text-gold tracking-tight">{project.carbon_score}/100</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    <Calendar size={12} /> Verified: {project.verified_date}
                 </div>
                 
                 <div className="flex flex-wrap gap-2">
                    {project.practices?.split(", ").map(practice => (
                       <span key={practice} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-wider">
                          {practice}
                       </span>
                    ))}
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-bold text-white/60">+1 more</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn-ghost py-4 text-[10px]"
                >
                  View Details
                </button>
                <button className="btn-premium py-4 text-[10px] group-hover:bg-gold transition-all">
                  Buy Credits
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[180] flex items-center justify-center p-5">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              className="refined-border relative z-10 grid w-full max-w-5xl gap-10 rounded-[3rem] p-10 md:grid-cols-[1.2fr_1fr]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-8 top-8 rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:border-gold hover:text-gold"
              >
                <X size={20} />
              </button>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-lg">
                      <Leaf size={28} />
                   </div>
                   <div>
                      <h3 className="font-serif text-4xl font-bold tracking-tight text-white mb-1">{selectedProject.name}</h3>
                      <div className="flex items-center gap-3 text-white/40">
                         <span className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase">
                            <MapPin size={12} /> {selectedProject.location}
                         </span>
                         <span className="w-1 h-1 rounded-full bg-white/20" />
                         <span className="text-xs font-mono tracking-widest uppercase">{selectedProject.farmer_name}</span>
                      </div>
                   </div>
                </div>

                <p className="text-lg leading-relaxed text-white/70 italic font-serif">
                   &quot;{selectedProject.description ?? "Sustainable soil sequestration verified by the Nexus protocol oracles."}&quot;
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-white/5 bg-white/[0.03] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Sequestration Rate</p>
                    <p className="text-3xl font-bold text-white">4.21 <span className="text-sm font-serif italic text-gold">tCO2/yr</span></p>
                  </div>
                  <div className="rounded-[2rem] border border-white/5 bg-white/[0.03] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Soil Restoration</p>
                    <p className="text-3xl font-bold text-white">+11.4% <span className="text-sm font-serif italic text-gold">SOC</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-gold/80">Certified Practices</h4>
                   <div className="flex flex-wrap gap-3">
                      {selectedProject.practices?.split(", ").map(practice => (
                         <div key={practice} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400">
                            <Check size={14} />
                            <span className="text-xs font-bold tracking-wide">{practice}</span>
                         </div>
                      ))}
                   </div>
                </div>
              </div>

              <aside className="rounded-[2.5rem] border border-white/10 bg-black/40 p-8 flex flex-col justify-between backdrop-blur-xl">
                <div>
                   <div className="flex justify-between items-center mb-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Checkout Strategy</p>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Instant Settlement</span>
                   </div>

                   <div className="space-y-6">
                      <div className="flex justify-between items-end">
                         <span className="text-white/40 text-sm font-medium">Credits Requested</span>
                         <span className="text-white font-mono font-bold">{selectedProject.balance}</span>
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-white/40 text-sm font-medium">Price per Tonne</span>
                         <span className="text-white font-mono font-bold">{selectedProject.zone.split(" / ")[0]}</span>
                      </div>
                      <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-6">
                         <span className="text-white/80 font-bold uppercase tracking-widest text-xs">Gross Total</span>
                         <span className="text-4xl font-bold text-gold tracking-tighter">{selectedProject.price}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-12 space-y-4">
                   <button
                    disabled={isPurchasing}
                    onClick={handlePurchase}
                    className="btn-premium w-full py-5 text-sm shadow-[0_15px_40px_-15px_rgba(215,180,90,0.5)]"
                   >
                    {isPurchasing ? "Retiring Assets..." : "Retire Carbon Credits"}
                   </button>
                   {message && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs text-emerald-400 font-medium">
                       {message}
                    </motion.p>
                   )}
                   <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.2em] mt-6">
                      Secured by Nexus V2 Encryption
                   </p>
                </div>
              </aside>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
