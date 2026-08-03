const BRANDS: Record<string, { color: string; glyph: string }> = {
  TypeScript: { color: "#3178C6", glyph: "TS" },
  JavaScript: { color: "#F7DF1E", glyph: "JS" },
  Python: { color: "#3776AB", glyph: "Py" },
  Go: { color: "#00ADD8", glyph: "Go" },
  Rust: { color: "#F74C00", glyph: "Rs" },
  React: { color: "#61DAFB", glyph: "Rx" },
  "Next.js": { color: "#E8DFC8", glyph: "N" },
  "Tailwind CSS": { color: "#38BDF8", glyph: "T" },
  "Node.js": { color: "#5FA04E", glyph: "N" },
  PostgreSQL: { color: "#699ECA", glyph: "PG" },
  Redis: { color: "#FF4438", glyph: "R" },
  GraphQL: { color: "#E535AB", glyph: "G" },
  gRPC: { color: "#4290FB", glyph: "R" },
  Docker: { color: "#2496ED", glyph: "D" },
  Kubernetes: { color: "#326CE5", glyph: "K8s" },
  AWS: { color: "#FF9900", glyph: "AWS" },
  Terraform: { color: "#7B42BC", glyph: "TF" },
  "CI/CD": { color: "#E8DFC8", glyph: "CI" },
};

export default function TechLogo({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "lg";
}) {
  const brand = BRANDS[name] ?? { color: "#E8DFC8", glyph: name.slice(0, 2) };
  const box = size === "lg" ? "h-12 w-12 rounded-lg" : "h-7 w-7 rounded-md";
  const glyph = size === "lg" ? "text-sm" : "text-[10px]";
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center border border-line`}
      style={{ backgroundColor: `${brand.color}1f` }}
      aria-hidden="true"
    >
      <span
        className={`${glyph} font-bold tracking-tight`}
        style={{ color: brand.color }}
      >
        {brand.glyph}
      </span>
    </span>
  );
}
