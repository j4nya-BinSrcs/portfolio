import { profile } from "@/lib/data";

export default function FooterLine() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-line pt-5 text-xs text-mute sm:flex-row">
      <p>
        © {year} {profile.name} · {profile.role}
      </p>
      <p className="font-mono">
        built with next.js &amp; framer motion
      </p>
    </footer>
  );
}
