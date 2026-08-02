"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export function AvailabilityCard() {
  return (
    <div className="flex h-[76px] flex-1 flex-col justify-center gap-2 rounded-2xl border border-line bg-panel/80 px-4 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset]">
      <span className="flex items-center gap-2 text-xs font-medium text-soft">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
        </span>
        {profile.available ? "Available" : "Busy"}
      </span>
      <p className="text-[11px] leading-snug text-mute">
        Open to new opportunities
      </p>
    </div>
  );
}

export function EmailCard() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${profile.email}`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className="group flex h-[76px] flex-[2] items-center justify-between gap-3 rounded-2xl border border-line bg-panel/80 px-5 text-left shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset] transition-colors hover:border-line-strong"
    >
      <span className="flex min-w-0 flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-mute">
          Email
        </span>
        <span className="truncate text-sm font-medium text-soft transition-colors group-hover:text-tx">
          {profile.email}
        </span>
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-mute transition-colors group-hover:border-line-strong group-hover:text-accent">
        {copied ? (
          <Check className="h-4 w-4 text-ok" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </motion.button>
  );
}

export default function AvailabilityEmailRow() {
  return (
    <div className="flex gap-3">
      <AvailabilityCard />
      <EmailCard />
      <a
        href={`mailto:${profile.email}`}
        aria-label="Open email client"
        className="flex h-[76px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-line bg-panel/80 text-mute transition-colors hover:border-line-strong hover:text-tx"
      >
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
