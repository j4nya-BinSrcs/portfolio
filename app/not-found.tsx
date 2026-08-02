import Link from "next/link";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-6">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get
        you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Back to {profile.name}&apos;s site
      </Link>
    </div>
  );
}
