import { siteConfig } from "@/lib/site.config";
import ReflectCard from "../reflect-card";

export default function HeroCard() {
  return (
    <ReflectCard className="rounded-2xl border border-line bg-panel/80">
      <div className="flex h-full flex-col items-start justify-center gap-4 p-5 sm:p-6">
        <p className="font-mono text-xs tracking-widest text-mute">
          {siteConfig.hero.eyebrow}
        </p>
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-tx sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-sm font-medium text-accent">
            {siteConfig.role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </ReflectCard>
  );
}
