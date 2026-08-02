import { profile } from "@/lib/data";

export default function HeroCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-panel/80 p-6 sm:p-7">
      <p className="font-mono text-xs tracking-widest text-mute">
        {"~/portfolio"}
      </p>
      <div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-tx sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-sm font-medium text-accent">{profile.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-mute">
          {profile.tagline}
        </p>
      </div>
      <p className="flex items-center gap-2 text-xs font-medium text-soft">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
        </span>
        Open to work
      </p>
    </div>
  );
}
