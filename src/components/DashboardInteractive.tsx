"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Leaf, DollarSign, Sprout, Zap, 
  MapPin, CloudSun, Wind, Droplets, 
  Sun, Bell, Globe
} from "lucide-react";
import LiveSatelliteMap from "./LiveSatelliteMap";

type FarmerState = {
  balance_kes: number;
  balance_tco2: number;
  total_earnings: number;
  farm_health: string;
  carbon_score: number;
};

export default function DashboardInteractive({ farmerState }: { farmerState: FarmerState }) {
  const [activeTab, setActiveTab] = React.useState("Overview");
  
  // Chat State
  const [chatInput, setChatInput] = React.useState("");
  const [chatLog, setChatLog] = React.useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Welcome to Keyjani AI! I am your free local regenerative agriculture advisor. How can I assist you today?' }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newLog = [...chatLog, { role: 'user', content: chatInput }];
    setChatLog(newLog);
    setChatInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newLog, language: "English" })
      });
      const data = await res.json();
      setChatLog([...newLog, { role: 'assistant', content: data.content }]);
    } catch (err) {
      setChatLog([...newLog, { role: 'assistant', content: 'Sorry, I encountered a local processing error.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-white mb-2">Welcome back, Samuel</h1>
          <p className="text-white/45 text-lg tracking-wide uppercase font-semibold text-sm">Track your regenerative farming progress and carbon credit earnings</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">Nakuru, Kenya</span>
           <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 transition-colors">Home</button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Carbon Score", val: farmerState.carbon_score, unit: "", sub: "+12.3% from last month", icon: <Leaf size={18} className="text-emerald-400" /> },
          { label: "Total Earnings", val: `$${farmerState.total_earnings.toFixed(2)}`, unit: "", sub: "+$24.50 this week", icon: <DollarSign size={18} className="text-gold" /> },
          { label: "CO2 Sequestered", val: `${farmerState.balance_tco2.toFixed(1)} tonnes`, unit: "", sub: "Verified by oracle", icon: <Sprout size={18} className="text-emerald-400" /> },
          { label: "Farm Health", val: farmerState.farm_health, unit: "", sub: "Last updated today", icon: <Zap size={18} className="text-gold" /> },
        ].map((stat, i) => (
          <div key={i} className="refined-border bg-white/[0.03] backdrop-blur-md rounded-3xl p-8">
             <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
             </div>
             <div className="space-y-2">
                <p className="text-4xl font-bold text-white tracking-tighter">{stat.val}</p>
                <p className="text-[11px] text-white/30 font-medium">
                  {stat.label === "Farm Health" ? <span className="text-emerald-400">{stat.sub}</span> : stat.sub}
                </p>
             </div>
          </div>
        ))}
      </section>

      {/* Tabs Menu */}
      <div className="flex gap-10 border-b border-white/5 pb-1 overflow-x-auto no-scrollbar">
        {["Overview", "Carbon Score", "AI Advice", "Earnings", "Farm Data"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
              activeTab === tab 
                ? 'text-gold border-b-2 border-gold font-black' 
                : 'text-white/20 hover:text-white/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          
          {activeTab === "Overview" && (
            <section className="refined-border bg-white/[0.02] rounded-[3rem] p-10 overflow-hidden relative min-h-[500px] flex flex-col">
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      <MapPin size={20} className="text-emerald-400" /> Farm Overview
                    </h3>
                    <p className="text-white/40 text-sm">Real-time mock capabilities initialized</p>
                 </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center border border-white/5 bg-black/40 rounded-[2rem] relative">
                  <div className="z-10 bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center">
                      <p className="text-white font-semibold">Dashboard Active</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Navigate to "Farm Data" for live Satellite Imagery.</p>
                  </div>
              </div>
            </section>
          )}

          {activeTab === "Farm Data" && (
            <section className="refined-border bg-white/[0.02] rounded-[3rem] p-6 lg:p-10 h-[600px] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      <Globe size={20} className="text-emerald-400" /> Real-time Satellite Sync
                    </h3>
                    <p className="text-white/40 text-sm">Powered by Free ESA & Esri Satellite Layers</p>
                 </div>
              </div>
              {LiveSatelliteMap && <LiveSatelliteMap />}
            </section>
          )}

          {activeTab === "AI Advice" && (
            <section className="refined-border bg-white/[0.02] rounded-[3rem] p-6 lg:p-10 h-[600px] flex flex-col">
              <div className="mb-6">
                 <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                   <Zap size={20} className="text-gold" /> Free AI Agronomist
                 </h3>
                 <p className="text-white/40 text-sm">Powered exclusively by local computation (No API keys required)</p>
              </div>
              
              <div className="flex-1 bg-black/40 border border-white/5 rounded-[2rem] p-6 mb-4 overflow-y-auto space-y-4">
                 {chatLog.map((chat, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl max-w-[80%] ${chat.role === 'user' ? 'bg-white/5 ml-auto border border-white/10 text-white' : 'bg-gold/10 border border-gold/20 mr-auto text-gold/90'}`}>
                       <p className="text-sm leading-relaxed">{chat.content}</p>
                    </div>
                 ))}
                 {isTyping && (
                    <div className="p-4 rounded-2xl max-w-[80%] bg-gold/5 border border-gold/10 mr-auto text-gold/50 flex gap-2">
                       <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
                    </div>
                 )}
              </div>
              
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                 <input 
                   type="text" 
                   value={chatInput} 
                   onChange={(e) => setChatInput(e.target.value)}
                   disabled={isTyping}
                   placeholder="Ask about soil, water, carbon credits..."
                   className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                 />
                 <button type="submit" disabled={isTyping || !chatInput.trim()} className="bg-gold text-black font-bold px-6 py-3 rounded-xl hover:bg-gold/80 transition-colors disabled:opacity-50">
                    Send
                 </button>
              </form>
            </section>
          )}

          {/* Simple Fallback for Earnings/Carbon Score Tab */}
          {(activeTab === "Earnings" || activeTab === "Carbon Score") && (
            <section className="refined-border bg-white/[0.02] rounded-[3rem] p-10 overflow-hidden relative min-h-[500px] flex items-center justify-center">
               <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                     <Sprout size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">{activeTab} MODULE</h3>
                  <p className="text-white/40 text-sm max-w-sm mx-auto">This module is currently syncing with the blockchain ledger. Real-time data will populate shortly.</p>
               </div>
            </section>
          )}

        </div>

        <aside className="space-y-8">
          {/* Weather Forecast Widget */}
          <section className="refined-border bg-white/[0.03] rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-bold text-white flex items-center gap-3">
                 <CloudSun size={20} className="text-gold" /> Weather Forecast
               </h3>
               <span className="text-4xl font-bold text-white tracking-tighter">24°C</span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10 border-b border-white/5 pb-8">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-gold/60">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30">Humidity</p>
                    <p className="text-sm font-bold text-white">68%</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-gold/60">
                    <Wind size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30">Wind</p>
                    <p className="text-sm font-bold text-white">12 km/h</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-rose-500/60">
                    <Zap size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30">Rain</p>
                    <p className="text-sm font-bold text-white">20%</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-gold/60">
                    <Sun size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30">UV Index</p>
                    <p className="text-sm font-bold text-white">6</p>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">
                 <span>3-Day Forecast</span>
               </div>
               {[
                 { day: "Tomorrow", icon: <Sun size={14} />, temp: "26°C / 18°C" },
                 { day: "Wednesday", icon: <CloudSun size={14} />, temp: "22°C / 16°C" },
                 { day: "Thursday", icon: <CloudSun size={14} />, temp: "19°C / 14°C" },
               ].map((f, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-sm text-white/80">{f.day}</span>
                    <div className="flex items-center gap-4">
                       <span className="text-gold/60">{f.icon}</span>
                       <span className="text-xs font-mono text-white/60">{f.temp}</span>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Recent Alerts */}
          <section className="refined-border bg-white/[0.02] rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-8">
               <div className="h-8 w-8 flex items-center justify-center bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Bell size={16} />
               </div>
               <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
            </div>

            <div className="space-y-4">
               <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <div>
                     <p className="text-sm font-semibold text-white">Soil moisture optimal</p>
                     <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">2 hours ago</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(215,180,90,0.5)]" />
                  <div>
                     <p className="text-sm font-semibold text-white">Verification successful</p>
                     <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">Yesterday</p>
                  </div>
               </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
