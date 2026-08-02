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
      <div className="flex min-h-dvh flex-col">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <motion.div
            variants={reduce ? undefined : revealContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[minmax(280px,320px)_minmax(170px,190px)_minmax(0,1fr)]"
          >
            <motion.aside
              variants={reduce ? undefined : revealItem}
              className="order-2 flex flex-col gap-5 md:col-span-1 lg:order-1 lg:col-span-1 lg:col-start-1"
            >
              <HeroCard />
              <InfoCard />
              <SocialRow />
              <AvailabilityEmailRow />
            </motion.aside>

            <motion.nav
              variants={reduce ? undefined : revealItem}
              aria-label="Primary"
              className="order-1 md:col-span-2 lg:order-2 lg:col-span-1 lg:col-start-2"
            >
              <NavRail />
            </motion.nav>

            <motion.div
              variants={reduce ? undefined : revealItem}
              className="order-3 md:col-span-1 lg:order-3 lg:col-span-1 lg:col-start-3"
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
