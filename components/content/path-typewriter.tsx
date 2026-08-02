"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function PathTypewriter({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [chars, setChars] = useState(() => (reduce ? text.length : 0));
  const [caret, setCaret] = useState(true);

  useEffect(() => {
    const step = Math.max(1, Math.round(text.length / 18));
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return Math.min(text.length, c + step);
      });
    }, 40);
    return () => clearInterval(id);
  }, [text]);

  useEffect(() => {
    const id = setInterval(
      () => setCaret((c) => !c),
      420,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs text-soft">
      {text.slice(0, chars)}
      <span
        className={caret ? "text-accent" : "text-transparent"}
        aria-hidden="true"
      >
        _
      </span>
    </span>
  );
}
