import { skills } from "@/lib/data";
import TechLogo from "./tech-logo";

export default function SkillsPanel() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {skills.map((group) => (
        <div
          key={group.category}
          className="rounded-xl border border-line bg-panel/70 p-5 transition-colors hover:border-line-strong"
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider text-mute">
            {group.category}
          </h3>
          <ul className="mt-4 grid gap-x-4 gap-y-3 sm:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.name} className="flex items-center gap-2.5">
                <TechLogo name={item.name} />
                <span className="truncate text-sm text-soft">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
