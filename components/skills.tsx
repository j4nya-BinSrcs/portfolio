import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <li
          key={group.category}
          className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
        >
          <h3 className="text-sm font-semibold text-foreground">
            {group.category}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
