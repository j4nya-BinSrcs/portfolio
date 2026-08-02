import { profile } from "@/lib/data";

export default function AvailabilityEmailRow() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-1 flex-col justify-center gap-1.5 rounded-2xl border border-line bg-panel/80 px-5">
        <span className="flex items-center gap-2 text-sm font-medium text-soft">
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

      <a
        href={`mailto:${profile.email}`}
        className="group flex flex-[2.2] flex-col justify-center gap-1.5 rounded-2xl border border-line bg-panel/80 px-5 transition-colors hover:border-line-strong"
      >
        <span className="text-[11px] font-medium uppercase tracking-wider text-mute">
          Email
        </span>
        <span className="truncate text-sm font-medium text-soft transition-colors group-hover:text-tx">
          {profile.email}
        </span>
      </a>
    </div>
  );
}
