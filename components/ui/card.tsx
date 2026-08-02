import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-panel/80 p-6 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset,0_10px_30px_-18px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-line-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
