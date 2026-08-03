"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export default function AvailabilityEmailRow() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const pop = reduce ? undefined : { scale: 1.06, zIndex: 20 };

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <div className="flex gap-3">
      <motion.div
        whileHover={pop}
        className="flex min-h-[64px] flex-[1] flex-col justify-center gap-2 rounded-2xl border border-line bg-panel/80 px-4 py-3"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-soft">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {siteConfig.available ? "Available" : "Busy"}
        </span>
        <p className="text-[11px] leading-snug text-mute">
          {siteConfig.availabilityText}
        </p>
      </motion.div>

      <motion.div
        whileHover={pop}
        className="flex min-h-[64px] flex-[2] items-center justify-between gap-3 rounded-2xl border border-line bg-panel/80 px-4 py-3 transition-colors hover:border-line-strong"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
            Email
          </p>
          <p className="truncate text-sm font-medium text-soft">
            {siteConfig.email}
          </p>
        </div>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email copied" : `Copy email ${siteConfig.email}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-mute transition-colors hover:border-line-strong hover:text-tx"
        >
          {copied ? (
            <Check className="h-4 w-4 text-ok" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
