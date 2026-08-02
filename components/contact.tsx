import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <div className="flex flex-col items-start gap-6">
      <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        I&apos;m always open to interesting conversations and new opportunities.
        My inbox is always open — whether you have a question, want to
        collaborate, or just want to say hi.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {profile.email}
      </a>
      <ul className="mt-4 flex flex-wrap gap-5">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-500 underline-offset-4 transition-colors hover:text-foreground hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
