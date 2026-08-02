import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export default function EducationPanel() {
  return (
    <div className="relative space-y-4">
      <span
        className="absolute bottom-4 left-5 top-4 w-px bg-line"
        aria-hidden="true"
      />
      <ol className="space-y-4">
        {siteConfig.education.map((entry) => (
          <li
            key={`${entry.institution}-${entry.period}`}
            className="relative rounded-xl border border-line bg-panel/70 p-5 pl-12 transition-colors hover:border-line-strong"
          >
            <span className="absolute left-[15px] top-7 h-2.5 w-2.5 rounded-full border border-accent/50 bg-bg" aria-hidden="true" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-tx">
                {entry.institution}
              </h3>
              <span className="font-mono text-xs text-mute">{entry.period}</span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-soft">
              <GraduationCap className="h-4 w-4 text-mute" aria-hidden="true" />
              {entry.degree}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-mute">
              {entry.achievement}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
