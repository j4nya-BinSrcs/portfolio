import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
