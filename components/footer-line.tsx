import { siteConfig } from "@/lib/site.config";

export default function FooterLine() {
  const year = new Date().getFullYear();
  const left = siteConfig.footer.left
    .replace("{year}", String(year))
    .replace("{name}", siteConfig.name)
    .replace("{role}", siteConfig.role);

  return (
    <footer className="mt-5 flex flex-col items-center justify-between gap-2 text-xs text-mute sm:flex-row">
      <p>{left}</p>
      <p className="font-mono">{siteConfig.footer.right}</p>
    </footer>
  );
}
