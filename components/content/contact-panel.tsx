"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import ReflectCard from "../reflect-card";
import ResumeCta from "./resume-cta";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function ContactPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const c = siteConfig.contact;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`.trim(),
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-bg-elevated px-4 py-3 text-sm text-tx placeholder:text-mute/70 transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      <div className="grid items-start gap-4 lg:grid-cols-[1fr_auto]">
        <motion.ul variants={item} className="space-y-1.5">
          {c.prompts.map((prompt) => (
            <li
              key={prompt}
              className="flex items-center gap-2.5 text-sm font-medium text-soft transition-colors hover:text-tx"
            >
              <span className="shrink-0 font-mono text-accent" aria-hidden="true">
                ›
              </span>
              {prompt}
            </li>
          ))}
        </motion.ul>

        <motion.p
          variants={item}
          className="max-w-sm text-sm leading-relaxed text-mute lg:text-right"
        >
          {c.intro}
        </motion.p>
      </div>

      <motion.div variants={item}>
        <ReflectCard className="rounded-xl border border-line bg-panel/70">
          <form
            onSubmit={onSubmit}
            className="grid gap-5 p-5 lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-medium text-soft"
                  >
                    {c.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={c.namePlaceholder}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-medium text-soft"
                  >
                    {c.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={c.emailPlaceholder}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-medium text-soft"
                >
                  {c.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={c.messagePlaceholder}
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {c.sendLabel}
                </button>
              </div>
            </div>

            <aside className="flex flex-col gap-4 lg:border-l lg:border-line lg:pl-5">
              <ResumeCta />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
                  {c.directLabel}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:border-line-strong hover:text-tx"
                  >
                    <Mail className="h-3 w-3 text-mute" aria-hidden="true" />
                    {siteConfig.email}
                    <ArrowUpRight className="h-3 w-3 text-mute" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:border-line-strong hover:text-tx"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 text-mute" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </aside>
          </form>
        </ReflectCard>
      </motion.div>
    </motion.div>
  );
}
