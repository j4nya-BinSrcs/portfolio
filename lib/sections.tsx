import type { LucideIcon } from "lucide-react";
import {
  User,
  Wrench,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Mail,
} from "lucide-react";

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

export const sections: SectionConfig[] = [
  { id: "about", label: "About", icon: User, path: "~/about" },
  { id: "skills", label: "Skills", icon: Wrench, path: "~/skills" },
  { id: "experience", label: "Experience", icon: Briefcase, path: "~/experience" },
  { id: "education", label: "Education", icon: GraduationCap, path: "~/education" },
  { id: "projects", label: "Projects", icon: FolderGit2, path: "~/projects" },
  { id: "contact", label: "Contact", icon: Mail, path: "~/contact" },
];

export function getSection(id: string): SectionConfig {
  return (
    sections.find((section) => section.id === id) ?? sections[0]
  );
}
