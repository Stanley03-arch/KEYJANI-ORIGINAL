"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Loader2, MessageSquare, Send, X } from "lucide-react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const LANGUAGES = [
  { code: "English", label: "EN" },
  { code: "Kiswahili", label: "SW" },
  { code: "Kalenjin", label: "KL" },
  { code: "Kikuyu", label: "KK" },
];

export default function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Jambo. I am your Keyjani AI assistant. How can I support your farm today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language,
        }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I could not process that request. Please try again shortly.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I am currently offline. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[150] sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            className="glass-gold mb-3 flex h-[520px] w-[min(92vw,390px)] flex-col overflow-hidden rounded-2xl shadow-[0_20px_50px_-30px_rgba(0,0,0,0.95)]"
          >
            <header className="flex items-start justify-between border-b border-gold/25 bg-gold/8 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-black">
                  <Globe size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-white">Keyjani Oracle</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                          language === lang.code
                            ? "border-gold bg-gold text-black"
                            : "border-gold/30 text-gold/70 hover:border-gold/55"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/15 p-1 text-white/65 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <X size={14} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[84%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-gold text-black"
                        : "border border-white/10 bg-white/6 text-white/88"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-2">
                    <Loader2 size={16} className="animate-spin text-gold" />
                  </div>
                </div>
              )}
            </div>

            <footer className="flex gap-2 border-t border-gold/20 bg-black/30 p-3">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleSend()}
                placeholder="Ask about soil, payouts, or crop practice"
                className="flex-1 rounded-xl border border-white/15 bg-black/45 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-gold/45 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <Send size={14} />
              </button>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="gold-glow flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-[0_14px_35px_-18px_rgba(215,180,90,0.95)]"
      >
        <MessageSquare size={23} />
      </motion.button>
    </div>
  );
}
