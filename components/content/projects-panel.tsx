import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

function ProjectThumb({ title }: { title: string }) {
  return (
    <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-lg border border-line bg-bg-elevated">
      <div
        className="absolute inset-0 opacity-60 transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,223,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,223,200,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <span
        className="relative font-mono text-3xl font-bold tracking-tight text-accent/30"
        aria-hidden="true"
      >
        {title.charAt(0)}
      </span>
    </div>
  );
}

export default function ProjectsPanel() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {siteConfig.projects.map((project) => (
        <article
          key={project.title}
          className="group relative flex flex-col rounded-xl border border-line bg-panel/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9)]"
        >
          <ProjectThumb title={project.title} />
          <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-tx">
                {project.title}
              </h3>
              {project.featured && (
                <span className="rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line px-2 py-1 text-[11px] font-medium text-mute transition-colors group-hover:border-line-strong group-hover:text-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-soft transition-all hover:border-line-strong hover:bg-panel hover:text-tx"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Live
              </a>
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source code for ${project.title}`}
                  className="inline-flex w-9 items-center justify-center rounded-lg border border-line text-mute transition-all hover:border-line-strong hover:text-tx"
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <ArrowUpRight
            className="absolute right-5 top-24 h-4 w-4 text-accent opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
            aria-hidden="true"
          />
        </article>
      ))}
    </div>
  );
}
