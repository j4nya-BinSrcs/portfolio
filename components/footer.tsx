import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Next.js
          </a>{" "}
          &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
