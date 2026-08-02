import Link from "next/link";
import { navigation, profile } from "@/lib/data";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-background/80 backdrop-blur dark:border-zinc-800/60">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link
          href="#"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
