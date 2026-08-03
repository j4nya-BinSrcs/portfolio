export default function TrafficDots({
  filled = 0,
  className = "",
}: {
  filled?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 ${className}`}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ring-1 ring-line ${
            i === filled ? "bg-accent/60" : "bg-bg-elevated"
          }`}
        />
      ))}
    </span>
  );
}
