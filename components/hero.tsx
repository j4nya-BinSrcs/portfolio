import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="flex flex-col items-start gap-6 py-20 sm:py-28">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Hi, my name is
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-500 sm:text-4xl dark:text-zinc-400">
        {profile.role}
      </h2>
      <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        {profile.tagline}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Get in touch
        </a>
      </div>
      <div className="mt-4 flex items-center gap-5">
        {profile.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-500 underline-offset-4 transition-colors hover:text-foreground hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {social.label}
          </a>
        ))}
      </div>
    </section>
  );
}
