import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <ol className="relative space-y-10 border-l border-zinc-200 pl-6 dark:border-zinc-800">
      {experience.map((job) => (
        <li key={`${job.company}-${job.period}`} className="relative">
          <span
            className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-zinc-400 bg-background dark:border-zinc-500"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {job.role} ·{" "}
              <span className="text-zinc-600 dark:text-zinc-300">
                {job.company}
              </span>
            </h3>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {job.period}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {job.description}
          </p>
          <ul className="mt-4 space-y-2">
            {job.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
              >
                <span className="mr-2 text-zinc-400" aria-hidden="true">
                  →
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
