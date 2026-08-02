import { GitFork, Link2, Mail, SquareX } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const icons = {
  GitHub: GitFork,
  LinkedIn: Link2,
  X: SquareX,
};

export default function SocialRow() {
  const links = [
    ...profile.socials.map((social) => ({
      label: social.label,
      href: social.href,
      Icon: icons[social.label as keyof typeof icons],
    })),
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <div className="flex gap-3">
      {links.map(({ label, href, Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          aria-label={label}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel/80 text-soft transition-colors hover:border-line-strong hover:text-tx"
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </motion.a>
      ))}
    </div>
  );
}
