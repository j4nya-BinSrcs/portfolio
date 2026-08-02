import { profile } from "@/lib/data";

export default function About() {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
      <div className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
        {/* Replace with <Image src={profile.avatar} ... /> or your photo */}
        <span className="flex h-40 w-40 items-center justify-center rounded-full bg-zinc-300 text-5xl font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
          {profile.name.charAt(0)}
        </span>
      </div>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        <p>{profile.bio}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {profile.location}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href={`mailto:${profile.email}`}
            className="text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-200"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </div>
  );
}
