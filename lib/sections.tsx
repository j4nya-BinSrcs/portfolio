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

export const sections: SectionConfig[] = siteConfig.navigation.map((item) => ({
  id: item.id as SectionId,
  label: item.label,
  icon: icons[item.id],
  path: `~/${item.id}`,
}));

export function getSection(id: string): SectionConfig {
  return sections.find((section) => section.id === id) ?? sections[0];
}
