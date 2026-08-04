"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  dashboardReveal,
  enterHero,
  enterNav,
  enterSandbox,
  enterInfo,
  enterInfoRow,
  enterContent,
} from "@/lib/motion";
import { SectionProvider } from "./section-provider";
import { useBoot } from "./boot-provider";
import NavRail from "./nav-rail";
import ThemeToggle from "./theme-toggle";
import ContentPanel from "./content/content-panel";
import HeroCard from "./left/hero-card";
import InfoCard from "./left/info-card";
import SocialRow from "./left/social-row";
import AvailabilityEmailRow from "./left/availability-email";
import SandboxStack from "./left/sandbox-stack";
import FooterLine from "./footer-line";

export default function Dashboard() {
  const reduce = useReducedMotion();
  const { booted } = useBoot();
  const pop = reduce ? undefined : { scale: 1.15, zIndex: 20, boxShadow: "0 0 24px -6px rgba(232,223,200,0.35)" };

  return (
    <SectionProvider>
      <div className="flex min-h-dvh w-full flex-col items-center px-4 py-6 sm:px-8 lg:h-dvh lg:overflow-hidden lg:px-0 lg:py-0">
        <motion.div
          variants={reduce ? undefined : dashboardReveal}
          initial={reduce ? false : "hidden"}
          animate={booted ? "show" : "hidden"}
          className="my-auto grid w-full grid-cols-1 gap-3 lg:flex lg:h-[71.5vh] lg:w-[70vw] lg:max-w-[1600px] lg:items-stretch lg:gap-3"
        >
          <div className="flex w-full min-w-0 flex-col gap-3 lg:w-[495px] lg:shrink-0">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
              <motion.div
                variants={reduce ? undefined : enterHero}
                whileHover={pop}
                className="min-w-0 flex-1"
              >
                <HeroCard />
              </motion.div>

              <motion.div
                variants={reduce ? undefined : enterNav}
                className="flex min-w-0 flex-col items-stretch gap-2 lg:w-[170px]"
              >
                  <ThemeToggle />
                  <NavRail />
                </motion.div>
            </div>

            <motion.div
              variants={reduce ? undefined : enterInfo}
              whileHover={pop}
              className="min-w-0"
            >
              <InfoCard />
            </motion.div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <motion.div
                variants={reduce ? undefined : enterInfoRow}
                whileHover={pop}
                className="min-w-0 flex-1"
              >
                <AvailabilityEmailRow />
              </motion.div>

              <motion.div
                variants={reduce ? undefined : enterInfoRow}
                whileHover={pop}
                className="min-w-0 lg:w-[112px]"
              >
                <SocialRow />
              </motion.div>
            </div>

            <motion.div
              variants={reduce ? undefined : enterSandbox}
              whileHover={pop}
              className="min-w-0 flex-1"
            >
              <SandboxStack />
            </motion.div>
          </div>

          <motion.div
            variants={reduce ? undefined : enterContent}
            className="min-w-0 lg:flex-1"
          >
            <ContentPanel />
          </motion.div>
        </motion.div>

        <FooterLine />
      </div>
    </SectionProvider>
  );
}
