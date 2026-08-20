"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Film,
  ImagePlay,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";

type GalleryItem = {
  type: "image" | "video" | "gif";
  src: string;
  caption: string;
  ratio: string;
};

// Deterministic-ish gradient palette picker: hashes the project title (plus a
// per-item offset) so each tile gets a stable but varied fallback background.
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

// Fisher-Yates shuffle. Used to randomize the initial gallery order so the
// preview thumbnails don't always start on the first image.
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Badge/icon metadata shown per media type in the gallery tiles and lightbox.
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
  const base = project?.gallery ?? [];
  // Shuffle once on mount so the order is randomized but stable across the
  // session (avoids re-ordering every render).
  const [items] = useState(() => shuffle([...base]));
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  // Move the lightbox index forward/back, wrapping around both ends.
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? null : (cur + dir + items.length) % items.length,
      ),
    [items.length],
  );

  // Global keyboard navigation while the lightbox is open: Esc to close,
  // arrow keys to cycle.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  if (!project || !project.gallery || items.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
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

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {items.map((item, i) => (
            <MediaTile
              key={`${item.type}-${i}`}
              title={project.title}
              item={item}
              index={i}
              onOpen={() => setActive(i)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            items={items}
            active={active}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MediaTile({
  title,
  item,
  index,
  onOpen,
}: {
  title: string;
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const { icon: TypeIcon, label } = typeMeta[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.04 * index }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${label}: ${item.caption}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-panel/70 text-left transition-colors hover:border-accent/40"
      >
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
                autoPlay
                muted
                loop
                playsInline
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
          <span className="absolute inset-0 z-10 flex items-center justify-center bg-bg/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-bg/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
              <TypeIcon className="h-3 w-3" aria-hidden="true" />
              Open
            </span>
          </span>
          <span
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-soft backdrop-blur-sm"
            aria-hidden="true"
          >
            <TypeIcon className="h-3 w-3 text-accent" />
            {label}
          </span>
        </div>
        <p className="px-3 pb-2.5 pt-2 text-xs text-mute">{item.caption}</p>
      </button>
    </motion.div>
  );
}

function Lightbox({
  items,
  active,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  active: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[active];
  const { icon: TypeIcon } = typeMeta[item.type];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 rounded-full border border-line bg-panel/70 p-2 text-soft transition-colors hover:border-accent/50 hover:text-tx"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-line bg-panel/70 p-2 text-soft transition-colors hover:border-accent/50 hover:text-tx"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-line bg-panel/70 p-2 text-soft transition-colors hover:border-accent/50 hover:text-tx"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="flex h-full w-full min-h-0 max-w-none flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-line bg-black/40">
          {item.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.caption}
              className="h-full w-full object-contain"
            />
          ) : (
            <video
              src={item.src}
              autoPlay
              controls
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-2">
          <TypeIcon className="h-4 w-4 text-accent" aria-hidden="true" />
          <p className="text-sm text-soft">{item.caption}</p>
          <span className="rounded-full border border-line px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-mute">
            {active + 1} / {items.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
