"use client";

import { siteConfig } from "@/lib/site.config";
import ProjectReadme from "./project-readme";

export default function ProjectCaseStudy({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  const project = siteConfig.projects.find((p) => p.title === title);
  if (!project) return null;
  return <ProjectReadme title={title} onBack={onBack} markdown={project.caseStudy} />;
}
