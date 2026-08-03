"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import { useBoot } from "./boot-provider";

export default function WelcomeScreen() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();
  const { complete } = useBoot();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 0 : 2800);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={complete}>
      {!done && (
        <motion.div
          key="welcome"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center gap-5 px-6 text-center">
            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="font-mono text-sm tracking-widest text-mute"
            >
              {siteConfig.hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="text-4xl font-bold tracking-tight text-tx sm:text-5xl"
            >
              {siteConfig.name}
            </motion.h1>

            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
              className="text-sm font-medium text-accent"
            >
              {siteConfig.role}
            </motion.p>
          </div>

          <motion.div
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.9, ease: EASE, delay: 0.55 }}
            className="mt-10 h-px w-48 origin-left bg-accent/40 sm:w-56"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
