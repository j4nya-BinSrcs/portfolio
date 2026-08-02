import { profile } from "@/lib/data";

function Highlight({ text }: { text: string }) {
  return <span className="font-medium text-accent">{text}</span>;
}

export default function AboutPanel() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed text-soft">
          Full-stack engineer focused on{" "}
          <Highlight text="performance" />, <Highlight text="accessibility" />,
          and <Highlight text="developer experience" />. I like small systems
          that compose into large ones, and interfaces that feel engineered
          rather than decorated.
        </p>
        <p className="text-[15px] leading-relaxed text-soft">
          Currently deep in <Highlight text="real-time collaboration" />,
          design systems, and the fine art of making latency disappear.
          Previously shipped products at early-stage startups and large
          platforms alike.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-panel/70 p-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
          Now
        </p>
        <ul className="mt-3 space-y-2 text-sm text-soft">
          <li className="flex items-baseline gap-2">
            <span className="text-accent" aria-hidden="true">›</span>
            Building a multiplayer, edge-first note-taking tool
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-accent" aria-hidden="true">›</span>
            Writing about systems and interface craft
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-accent" aria-hidden="true">›</span>
            Exploring WebGPU and local-first architecture
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
          {profile.location}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
          {profile.timezone}
        </span>
      </div>
    </div>
  );
}
