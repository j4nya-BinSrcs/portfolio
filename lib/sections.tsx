import type { LucideIcon } from "lucide-react";
import {
  User,
  Wrench,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Mail,
} from "lucide-react";
import { siteConfig } from "./site.config";

// Each section in the navigation gets a Lucide icon here. The key must match
// the `id` used in site.config.ts navigation entries.
const icons: Record<string, LucideIcon> = {
  about: User,
  skills: Wrench,
  experience: Briefcase,
  education: GraduationCap,
  projects: FolderGit2,
  contact: Mail,
};

export type SectionId =
  | "about"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "contact";

export type SectionConfig = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  path: string;
};

// Derive the ordered list of sections from the single source of truth in
// site.config.ts so navigation, the content panel, and the progress dots all
// stay in sync. `path` mimics a terminal working-directory for the prompt UI.
export const sections: SectionConfig[] = siteConfig.navigation.map((item) => ({
  id: item.id as SectionId,
  label: item.label,
  icon: icons[item.id],
  path: `~/${item.id}`,
}));

// Resolve a hash (e.g. "#skills") to a section, defaulting to the first one.
export function getSection(id: string): SectionConfig {
  return sections.find((section) => section.id === id) ?? sections[0];
}
