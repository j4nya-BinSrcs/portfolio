"use client";

import { ArrowDownToLine } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import ReflectCard from "../reflect-card";

export default function ResumeCta() {
  return (
    <ReflectCard className="rounded-xl border border-accent/30 bg-accent-soft/50">
      <a
        href={siteConfig.resumeUrl}
        download
        className="group flex flex-col items-center justify-center gap-2.5 p-5 text-center transition-all"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-bg/40 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <ArrowDownToLine className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-tx">
          {siteConfig.contact.resumeLabel}
        </span>
        <span className="text-[11px] text-mute">PDF · always up to date</span>
      </a>
    </ReflectCard>
  );
}
