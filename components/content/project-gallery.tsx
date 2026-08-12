"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Film, ImagePlay, Image as ImageIcon } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";

type GalleryItem = {
  type: "image" | "video" | "gif";
  src: string;
  caption: string;
  ratio: string;
};

function gradientFor(title: string, i: number) {
  const h = [...title].reduce((a, c) => a + c.charCodeAt(0), 0) + i * 7;
  const palettes = [
    "from-[#2a2a2f] via-[#1c1c20] to-[#0e0e10]",
    "from-[#2b2620] via-[#1d1a16] to-[#0e0d0c]",
    "from-[#1f2830] via-[#161d24] to-[#0c1014]",
    "from-[#2c2128] via-[#1d151c] to-[#0e0a0d]",
  ];
  return palettes[h % palettes.length];
}

const typeMeta = {
  video: { icon: Film, label: "Video" },
  gif: { icon: ImagePlay, label: "GIF" },
  image: { icon: ImageIcon, label: "Screenshot" },
} as const;

export default function ProjectGallery({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  const project = siteConfig.projects.find((p) => p.title === title);
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="space-y-4"
    >
      <div className="sticky top-0 z-10 -mx-6 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel/95 px-6 pb-3 pt-3 backdrop-blur-sm sm:-mx-8 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:-translate-x-0.5 hover:border-accent/40 hover:text-tx"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          All projects
        </button>
        <p className="text-sm font-semibold text-tx">Gallery · {project.title}</p>
      </div>

      <div className="columns-2 gap-3 lg:columns-3">
        {project.gallery.map((item, i) => (
          <MediaTile
            key={`${item.type}-${i}`}
            title={project.title}
            item={item}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MediaTile({
  title,
  item,
  index,
}: {
  title: string;
  item: GalleryItem;
  index: number;
}) {
  const { icon: TypeIcon, label } = typeMeta[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.04 * index }}
      className="mb-3 break-inside-avoid"
    >
      <div className="group overflow-hidden rounded-xl border border-line bg-panel/70">
        <div
          className={`relative flex w-full items-center justify-center overflow-hidden bg-bg-elevated ${item.ratio}`}
        >
          {item.src ? (
            item.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                className="h-full w-full object-cover"
                src={item.src}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            )
          ) : (
            <span
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradientFor(title, index)}`}
            >
              <TypeIcon
                className="h-6 w-6 text-accent/40"
                aria-hidden="true"
              />
              <span className="rounded-full border border-accent/30 bg-bg/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
                {label}
              </span>
            </span>
          )}
        </div>
        <p className="px-3 pb-2.5 pt-2 text-xs text-mute">{item.caption}</p>
      </div>
    </motion.div>
  );
}
