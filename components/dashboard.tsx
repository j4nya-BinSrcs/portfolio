"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";
import { SectionProvider } from "./section-provider";
import NavRail from "./nav-rail";
import ContentPanel from "./content/content-panel";
import HeroCard from "./left/hero-card";
import InfoCard from "./left/info-card";
import SocialRow from "./left/social-row";
import AvailabilityEmailRow from "./left/availability-email";
import FooterLine from "./footer-line";

export default function Dashboard() {
  const reduce = useReducedMotion();

  return (
    <SectionProvider>
      <div className="flex min-h-dvh flex-col bg-bg lg:h-dvh lg:overflow-hidden">
        <div className="mx-auto flex w-full flex-1 flex-col px-4 py-5 sm:px-8 lg:w-[min(72vw,1440px)] lg:py-6">
          <motion.div
            variants={reduce ? undefined : revealContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="grid w-full flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,300px)_minmax(0,190px)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto_auto_auto] lg:[grid-template-areas:'hero_nav_content'_'info_info_content'_'avail_avail_content'_'social_social_content']"
          >
            <motion.div
              variants={reduce ? undefined : revealItem}
              className="lg:[grid-area:hero]"
            >
              <HeroCard />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="lg:[grid-area:nav]"
            >
              <NavRail />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="lg:[grid-area:info]"
            >
              <InfoCard />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="lg:[grid-area:avail]"
            >
              <AvailabilityEmailRow />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="lg:[grid-area:social]"
            >
              <SocialRow />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="lg:[grid-area:content]"
            >
              <ContentPanel />
            </motion.div>
          </motion.div>

          <FooterLine />
        </div>
      </div>
    </SectionProvider>
  );
}
