import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <a
          key={project.title}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {project.featured ? "Featured" : "Project"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-zinc-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-zinc-500"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
              >
                {tech}
              </li>
            ))}
          </ul>
        </a>
      ))}
    </div>
  );
}
