import { siteConfig } from "@/lib/site.config";

function highlight(text: string, keywords: readonly string[]) {
  if (keywords.length === 0) return text;
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.some((k) => part.toLowerCase() === k.toLowerCase()) ? (
      <span key={i} className="font-medium text-accent">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function AboutPanel() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {siteConfig.about.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-[15px] leading-relaxed text-soft"
          >
            {highlight(paragraph, siteConfig.about.keywords)}
          </p>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-panel/70 p-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
          {siteConfig.about.nowLabel}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-soft">
          {siteConfig.about.now.map((item) => (
            <li key={item} className="flex items-baseline gap-2">
              <span className="text-accent" aria-hidden="true">
                ›
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
          {siteConfig.location}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
          {siteConfig.timezone}
        </span>
      </div>
    </div>
  );
}
