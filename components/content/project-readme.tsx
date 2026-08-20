"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, FolderGit2 } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import ReflectCard from "../reflect-card";

export default function ProjectReadme({
  title,
  onBack,
  markdown,
}: {
  title: string;
  onBack: () => void;
  markdown?: string;
}) {
  const project = siteConfig.projects.find((p) => p.title === title);

  if (!project) return null;

  const content = markdown ?? "";

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:-translate-x-0.5 hover:border-accent/40 hover:text-tx"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          All projects
        </button>
        <div className="flex items-center gap-2">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:border-accent/40 hover:text-tx"
          >
            <ExternalLink className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Live
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:border-accent/40 hover:text-tx"
          >
            <FolderGit2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Source
          </a>
        </div>
      </div>

      <ReflectCard className="rounded-xl border border-line bg-panel/70">
        <div className="prose-invert max-w-none p-6 sm:p-7">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => (
                <h1 className="mb-4 mt-0 border-b border-line pb-3 text-xl font-bold tracking-tight text-tx" {...props} />
              ),
              h2: (props) => (
                <h2 className="mb-3 mt-6 text-base font-semibold text-tx" {...props} />
              ),
              h3: (props) => (
                <h3 className="mb-2 mt-5 text-sm font-semibold text-tx" {...props} />
              ),
              p: (props) => (
                <p className="mb-3 text-sm leading-relaxed text-soft" {...props} />
              ),
              ul: (props) => (
                <ul className="mb-3 space-y-1.5 pl-5 text-sm text-soft marker:text-accent" {...props} />
              ),
              li: (props) => (
                <li className="leading-relaxed" {...props} />
              ),
              code: (props) => {
                const { className, children, ...rest } = props as {
                  className?: string;
                  children?: React.ReactNode;
                };
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <pre className="mb-3 overflow-x-auto rounded-lg border border-line bg-bg-elevated p-4 text-[13px] leading-relaxed text-tx">
                      <code className={className} {...rest}>{children}</code>
                    </pre>
                  );
                }
                return (
                  <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-[13px] text-accent" {...rest}>
                    {children}
                  </code>
                );
              },
              strong: (props) => (
                <strong className="font-semibold text-tx" {...props} />
              ),
              a: (props) => (
                <a className="text-accent underline underline-offset-2 hover:text-tx" target="_blank" rel="noopener noreferrer" {...props} />
              ),
              blockquote: (props) => (
                <blockquote className="mb-3 border-l-2 border-accent/40 pl-4 text-sm italic text-mute" {...props} />
              ),
              hr: (props) => (
                <hr className="my-6 border-line" {...props} />
              ),
              table: (props) => (
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm text-soft" {...props} />
                </div>
              ),
              thead: (props) => (
                <thead className="border-b border-line" {...props} />
              ),
              th: (props) => (
                <th className="border-b border-line px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-mute" {...props} />
              ),
              td: (props) => (
                <td className="border-b border-line/70 px-3 py-2 text-sm leading-relaxed" {...props} />
              ),
              input: (props) => (
                <input className="accent-accent" disabled {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </ReflectCard>
    </motion.div>
  );
}
