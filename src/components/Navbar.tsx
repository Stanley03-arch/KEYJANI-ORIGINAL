"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sprout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Marketplace", path: "/market" },
    { name: "AI Advisor", path: "/satellite" },
    { name: "Staking", path: "/staking" },
    { name: "Governance", path: "/governance" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress("");
    } else {
      setIsWalletConnected(true);
      setWalletAddress("0x7F4...3B9A");
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-[110] px-4 pt-4 sm:px-8">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-gold/25 bg-charcoal/90 shadow-[0_20px_40px_-24px_rgba(8,18,13,0.92)] backdrop-blur-xl"
            : "border-white/10 bg-charcoal/45 backdrop-blur-lg"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-black shadow-[0_8px_20px_-10px_rgba(215,180,90,0.9)] transition-transform group-hover:scale-105">
            <Sprout size={16} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold tracking-tight text-white">Keyjani</span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/45">
              Regenerative Finance
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                pathname === item.path
                  ? "text-gold"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button 
            onClick={handleConnectWallet}
            className={`flex items-center gap-2 rounded-full border px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
              isWalletConnected 
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                : "border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {isWalletConnected ? (
              <>
                 <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                 {walletAddress}
              </>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>

        <button
          className="rounded-full border border-white/10 p-2 text-white transition-colors hover:border-gold/40 hover:text-gold lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 w-full max-w-6xl rounded-3xl border border-gold/25 bg-charcoal/95 p-5 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`rounded-2xl border px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    pathname === item.path
                      ? "border-gold/35 bg-gold/10 text-gold"
                      : "border-white/10 text-white/75 hover:border-gold/30 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleConnectWallet}
                className={`mt-2 flex w-full justify-center items-center gap-2 rounded-xl border px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  isWalletConnected 
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                    : "border-white/10 bg-white/5 text-white"
                }`}
              >
                {isWalletConnected ? (
                  <>
                     <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                     {walletAddress}
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
