"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Download, Send } from "lucide-react";
import { profile } from "@/lib/data";

export default function ContactPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`.trim(),
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-bg-elevated px-3.5 py-2.5 text-sm text-tx placeholder:text-mute/70 transition-colors focus:border-line-strong focus:outline-none";

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block text-xs font-medium text-soft"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block text-xs font-medium text-soft"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ada@analytical.engine"
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
            Message
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project…"
            rows={5}
            required
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-soft px-4 py-2.5 text-sm font-semibold text-tx transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send message
        </button>
      </form>

      <aside className="flex flex-col gap-4">
        <div className="rounded-xl border border-line bg-panel/70 p-5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
            Direct
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-soft transition-colors hover:border-line-strong hover:text-tx"
              >
                {social.label}
                <ArrowUpRight className="h-3 w-3 text-mute" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-xl border border-line bg-panel/70 p-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
              Availability
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-soft">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              {profile.available ? "Currently available" : "Currently booked"}
            </p>
          </div>
          <a
            href={profile.resumeUrl}
            download
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-soft transition-all hover:border-line-strong hover:text-tx"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download resume
          </a>
        </div>
      </aside>
    </div>
  );
}
