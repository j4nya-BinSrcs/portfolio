import { profile } from "@/lib/data";

const focus = ["React", "TypeScript", "Node.js", "Cloud"];

export default function HeroCard() {
  return (
    <div className="rounded-2xl border border-line bg-panel/80 p-6 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset,0_10px_30px_-18px_rgba(0,0,0,0.7)] sm:p-7">
      <p className="font-mono text-xs tracking-wide text-mute">
        {"// " + profile.role.toLowerCase()}
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-tx sm:text-4xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-sm font-medium text-soft">{profile.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-mute">{profile.tagline}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {focus.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-line px-3 py-1 text-xs font-medium text-soft transition-colors hover:border-line-strong"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
