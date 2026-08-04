"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  siArchlinux,
  siDocker,
  siDjango,
  siExpress,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGo,
  siGraphql,
  siHyprland,
  siJavascript,
  siKubernetes,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRust,
  siSqlite,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siGhostty,
  siZedindustries,
  siFastapi,
} from "simple-icons";

const AWS_PATH =
  "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.232.08.635.635 0 0 1-.407-.151 8.923 8.923 0 0 1-.28-.263c-.079-.08-.167-.152-.264-.223a3.24 3.24 0 0 0-1.836-.568 3.506 3.506 0 0 0-1.316.227c-.383.152-.711.36-.983.624-.271.264-.487.584-.632.952-.151.367-.223.767-.223 1.196 0 .432.072.831.223 1.2.151.367.36.687.632.951.272.264.6.472.983.624.384.152.8.223 1.236.223.36 0 .695-.056 1.012-.167.312-.112.584-.263.815-.455.168-.143.312-.287.432-.44a2.68 2.68 0 0 1 .304-.32.59.59 0 0 1 .351-.135c.104 0 .207.04.311.112l.4.264c.063.04.103.087.103.143a.45.45 0 0 1-.063.2 5.05 5.05 0 0 1-.495.631 5.84 5.84 0 0 1-1.444 1.077 4.378 4.378 0 0 1-2.06.455c-.632 0-1.212-.119-1.748-.359a4.085 4.085 0 0 1-1.38-.983 4.515 4.515 0 0 1-.912-1.476A5.274 5.274 0 0 1 3.03 13.06c0-.68.1-1.308.312-1.891.207-.584.504-1.09.887-1.516a4.19 4.19 0 0 1 1.356-.999 4.405 4.405 0 0 1 1.723-.352c.44 0 .848.072 1.228.215.376.144.71.344 1.004.6.088.08.16.164.216.256.056.095.088.167.088.223a.32.32 0 0 1-.064.16l-.4.543Zm3.776 8.915c-.272 0-.48-.072-.624-.215a.745.745 0 0 1-.2-.544c0-.208.064-.384.2-.528.144-.144.352-.216.624-.216.256 0 .464.072.6.216a.77.77 0 0 1 .207.528c0 .216-.072.4-.208.544-.135.143-.343.215-.6.215Zm2.623.008c-.271 0-.48-.072-.623-.215a.745.745 0 0 1-.2-.544c0-.208.064-.384.2-.528.144-.144.352-.216.624-.216.256 0 .463.072.6.216a.77.77 0 0 1 .207.528c0 .216-.071.4-.207.544-.136.143-.344.215-.6.215Zm3.047 0c-.271 0-.48-.072-.623-.215a.745.745 0 0 1-.2-.544c0-.208.063-.384.2-.528.143-.144.351-.216.623-.216.256 0 .464.072.6.216a.77.77 0 0 1 .207.528c0 .216-.071.4-.207.544-.136.143-.344.215-.6.215Zm3.055.04c-.271 0-.48-.072-.623-.215a.745.745 0 0 1-.2-.544c0-.208.064-.384.2-.528.143-.144.351-.216.623-.216.256 0 .464.072.6.216a.77.77 0 0 1 .208.528c0 .216-.072.4-.208.544-.135.143-.343.215-.6.215Zm3.079-.04c-.271 0-.48-.072-.623-.215a.745.745 0 0 1-.2-.544c0-.208.063-.384.2-.528.143-.144.351-.216.623-.216.256 0 .464.072.6.216a.77.77 0 0 1 .207.528c0 .216-.071.4-.207.544-.136.143-.344.215-.6.215Zm-10.248-1.24a.525.525 0 0 1-.44.223.565.565 0 0 1-.36-.111.807.807 0 0 1-.216-.296v1.644c0 .08-.024.143-.072.184a.25.25 0 0 1-.168.063.285.285 0 0 1-.2-.063.247.247 0 0 1-.08-.184V14.66l.008-.288a.653.653 0 0 1-.12.2c-.04.047-.112.103-.216.168l-.008-.064a.43.43 0 0 1 .208-.392.497.497 0 0 1 .264-.064c.08 0 .144.016.2.048a.486.486 0 0 1 .136.12c.04.048.064.104.088.168.024.064.08.064.128 0a2.53 2.53 0 0 1 .248-.32.577.577 0 0 1 .36-.144c.088 0 .16.024.216.072.056.048.08.12.08.216Zm4.174.064c.2.12.368.272.503.456.136.184.2.408.2.672v2.22a.284.284 0 0 1-.08.207.258.258 0 0 1-.192.08.271.271 0 0 1-.2-.08.284.284 0 0 1-.08-.207v-.872a3.556 3.556 0 0 1-.12.151c-.056.064-.152.136-.28.216-.128.08-.32.12-.568.12-.232 0-.432-.048-.608-.144a1.05 1.05 0 0 1-.424-.407 1.24 1.24 0 0 1-.152-.639c0-.272.056-.496.176-.688.12-.191.288-.344.487-.455.2-.112.423-.168.672-.168.24 0 .448.032.616.088.168.056.304.12.408.184v-.175c0-.168-.04-.304-.12-.407a.828.828 0 0 0-.327-.24 1.34 1.34 0 0 0-.465-.072 1.584 1.584 0 0 0-.6.088.712.712 0 0 0-.36.28.687.687 0 0 0-.088.272.313.313 0 0 1-.088.168.301.301 0 0 1-.208.08.307.307 0 0 1-.231-.1.448.448 0 0 1-.089-.256c0-.168.06-.32.176-.464a1.798 1.798 0 0 1 .487-.352c.2-.096.416-.144.656-.144.2 0 .392.028.575.08.184.056.352.144.496.264Zm-.392 1.452a1.654 1.654 0 0 0-.36-.208 1.236 1.236 0 0 0-.432-.072c-.184 0-.344.032-.472.096a.876.876 0 0 0-.328.272.742.742 0 0 0-.128.407c0 .168.04.312.128.431.088.12.2.207.344.264.144.056.304.08.472.08.232 0 .424-.048.576-.144a.888.888 0 0 0 .352-.368.947.947 0 0 0 .048-.56v-.464c-.08-.056-.168-.111-.264-.168.088.04.168.072.24.104Zm5.28 1.652c0 .08-.024.143-.072.184a.25.25 0 0 1-.168.063.285.285 0 0 1-.2-.063.247.247 0 0 1-.08-.184v-2.917c0-.08.024-.143.08-.184a.285.285 0 0 1 .2-.063c.064 0 .12.02.168.063.048.04.072.103.072.184v2.917Zm.457-4.817a.695.695 0 0 1-.208.512.703.703 0 0 1-.512.208.714.714 0 0 1-.519-.208.695.695 0 0 1-.208-.512c0-.2.072-.376.208-.512a.702.702 0 0 1 .519-.215c.2 0 .376.072.512.215.136.136.208.312.208.512Zm1.616.439v4.378c0 .08-.024.143-.072.184a.25.25 0 0 1-.168.063.285.285 0 0 1-.2-.063.247.247 0 0 1-.08-.184V14.42c0-.08.024-.143.08-.184a.285.285 0 0 1 .2-.063c.064 0 .12.02.168.063.048.04.072.103.072.184Zm.281-1.657c.2.12.368.272.503.456.136.184.2.408.2.672v2.907c0 .08-.024.143-.08.184a.285.285 0 0 1-.2.063.285.285 0 0 1-.2-.063.247.247 0 0 1-.08-.184v-2.572c0-.168-.04-.304-.12-.407a.828.828 0 0 0-.327-.24 1.34 1.34 0 0 0-.465-.072 1.584 1.584 0 0 0-.6.088.712.712 0 0 0-.36.28.687.687 0 0 0-.088.272.313.313 0 0 1-.088.168.301.301 0 0 1-.208.08.307.307 0 0 1-.231-.1.448.448 0 0 1-.089-.256c0-.168.06-.32.176-.464a1.798 1.798 0 0 1 .487-.352c.2-.096.416-.144.656-.144.2 0 .392.028.575.08.184.056.352.144.496.264v-.24c0-.24.048-.456.144-.64.096-.184.224-.336.384-.456.16-.12.344-.2.552-.24a1.74 1.74 0 0 1 .528-.032.987.987 0 0 1 .12.024c.072.016.128.04.168.064.04.024.08.056.12.096.04.04.056.08.056.12a.202.202 0 0 1-.056.136.163.163 0 0 1-.128.064.427.427 0 0 1-.12-.024.786.786 0 0 0-.368-.048 1.18 1.18 0 0 0-.4.136c-.152.08-.272.184-.36.32-.088.136-.136.296-.136.48Z";

type BrandDef = { path: string; color: string };

const BRANDS: Record<string, BrandDef> = {
  TypeScript: { path: siTypescript.path, color: "#3178C6" },
  JavaScript: { path: siJavascript.path, color: "#F7DF1E" },
  Python: { path: siPython.path, color: "#3776AB" },
  Go: { path: siGo.path, color: "#00ADD8" },
  Rust: { path: siRust.path, color: "#F74C00" },
  React: { path: siReact.path, color: "#61DAFB" },
  "Next.js": { path: siNextdotjs.path, color: "#E8DFC8" },
  "Tailwind CSS": { path: siTailwindcss.path, color: "#38BDF8" },
  "Node.js": { path: siNodedotjs.path, color: "#5FA04E" },
  PostgreSQL: { path: siPostgresql.path, color: "#699ECA" },
  Redis: { path: siRedis.path, color: "#FF4438" },
  GraphQL: { path: siGraphql.path, color: "#E535AB" },
  Docker: { path: siDocker.path, color: "#2496ED" },
  Kubernetes: { path: siKubernetes.path, color: "#326CE5" },
  AWS: { path: AWS_PATH, color: "#FF9900" },
  Terraform: { path: siTerraform.path, color: "#7B42BC" },
  FastAPI: { path: siFastapi.path, color: "#009688" },
  Django: { path: siDjango.path, color: "#092E20" },
  Express: { path: siExpress.path, color: "#E8DFC8" },
  Git: { path: siGit.path, color: "#F05032" },
  GitHub: { path: siGithub.path, color: "#E8DFC8" },
  SQLite: { path: siSqlite.path, color: "#003B57" },
  MongoDB: { path: siMongodb.path, color: "#47A248" },
  "GitHub Actions": { path: siGithubactions.path, color: "#2088FF" },
  "Framer Motion": { path: siFramer.path, color: "#E8DFC8" },
  Zed: { path: siZedindustries.path, color: "#FFFFFF" },
  Ghostty: { path: siGhostty.path, color: "#F5C2E7" },
  "Arch Linux": { path: siArchlinux.path, color: "#1793D1" },
  Hyprland: { path: siHyprland.path, color: "#E8DFC8" },
};

const WORDMARKS: Record<string, { label: string; color: string }> = {
  "CI/CD": { label: "CI/CD", color: "#E8DFC8" },
  gRPC: { label: "gRPC", color: "#4290FB" },
  Java: { label: "Java", color: "#ED8B00" },
  WebGPU: { label: "WebGPU", color: "#E8DFC8" },
  "REST APIs": { label: "REST", color: "#E8DFC8" },
  WebSockets: { label: "WS", color: "#E8DFC8" },
  Linux: { label: "Linux", color: "#E8DFC8" },
};

function useDockScale() {
  const scale = useMotionValue(1);
  const spring = useSpring(scale, { stiffness: 400, damping: 28, mass: 0.55 });
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const reach = Math.max(r.width, r.height) / 2 + 44;
    const t = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
    scale.set(1 + 0.6 * t * t);
  }

  function onLeave() {
    scale.set(1);
  }

  return { ref, spring, onMove, onLeave };
}

export default function TechLogo({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "lg";
}) {
  const { ref, spring, onMove, onLeave } = useDockScale();
  const brand = BRANDS[name];
  const wordmark = WORDMARKS[name];
  const box = size === "lg" ? "h-12 w-12 rounded-lg" : "h-7 w-7 rounded-md";
  const icon = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  const text = size === "lg" ? "text-[11px]" : "text-[9px]";
  const color = brand?.color ?? wordmark?.color ?? "#E8DFC8";

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ scale: spring, backgroundColor: `${color}1f`, color }}
      className={`relative z-10 flex ${box} shrink-0 items-center justify-center border border-line`}
      aria-hidden="true"
    >
      {brand ? (
        <svg viewBox="0 0 24 24" className={`${icon} fill-current`}>
          <path d={brand.path} />
        </svg>
      ) : (
        <span className={`${text} font-bold tracking-tight`}>
          {wordmark?.label ?? name.slice(0, 2)}
        </span>
      )}
    </motion.span>
  );
}
