import Link from "next/link";
import { CornerDownLeft } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[1600px] flex-col items-start justify-center px-8">
      <p className="font-mono text-xs tracking-widest text-mute">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-tx sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get
        you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-soft px-5 py-3 text-sm font-semibold text-tx transition-all hover:-translate-y-0.5 hover:brightness-110"
      >
        <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
        Back to {siteConfig.name}&apos;s workspace
      </Link>
    </div>
  );
}
