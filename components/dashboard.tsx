"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";
import { SectionProvider } from "./section-provider";
import { useBoot } from "./boot-provider";
import NavRail from "./nav-rail";
import ContentPanel from "./content/content-panel";
import HeroCard from "./left/hero-card";
import InfoCard from "./left/info-card";
import SocialRow from "./left/social-row";
import AvailabilityEmailRow from "./left/availability-email";
import FooterLine from "./footer-line";

export default function Dashboard() {
  const reduce = useReducedMotion();
  const { booted } = useBoot();

  return (
    <SectionProvider>
      <div className="flex min-h-dvh w-full flex-col items-center px-4 py-6 sm:px-8 lg:h-dvh lg:overflow-hidden lg:px-0 lg:py-0">
        <motion.div
          variants={reduce ? undefined : revealContainer}
          initial={reduce ? false : "hidden"}
          animate={booted ? "show" : "hidden"}
          className="my-auto grid w-full grid-cols-1 gap-3 lg:flex lg:h-[65vh] lg:w-[70vw] lg:max-w-[1600px] lg:items-stretch lg:gap-3"
        >
          <motion.div
            variants={reduce ? undefined : revealItem}
            className="grid grid-cols-1 gap-3 lg:grid lg:w-[495px] lg:shrink-0 lg:grid-cols-[minmax(0,320px)_minmax(0,170px)] lg:[grid-template-areas:'hero_nav'_'info_info'_'avail_avail'_'social_social'] lg:content-start"
          >
            <motion.div
              variants={reduce ? undefined : revealItem}
              whileHover={reduce ? undefined : { scale: 1.06, zIndex: 20 }}
              className="min-w-0 lg:[grid-area:hero] lg:h-full"
            >
              <HeroCard />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              whileHover={reduce ? undefined : { scale: 1.06, zIndex: 20 }}
              className="min-w-0 lg:[grid-area:nav] lg:h-full"
            >
              <NavRail />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              whileHover={reduce ? undefined : { scale: 1.06, zIndex: 20 }}
              className="min-w-0 lg:[grid-area:info]"
            >
              <InfoCard />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="min-w-0 lg:[grid-area:avail]"
            >
              <AvailabilityEmailRow />
            </motion.div>

            <motion.div
              variants={reduce ? undefined : revealItem}
              whileHover={reduce ? undefined : { scale: 1.06, zIndex: 20 }}
              className="min-w-0 lg:[grid-area:social]"
            >
              <SocialRow />
            </motion.div>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : revealItem}
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
