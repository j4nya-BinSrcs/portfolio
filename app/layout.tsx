import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { profile } from "@/lib/data";
import BackgroundGrid from "@/components/background-grid";
import CursorGlow from "@/components/cursor-glow";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "software engineer",
    "portfolio",
    "full-stack",
    "developer",
    "react",
    "typescript",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    url: profile.siteUrl,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-bg text-tx">
        <BackgroundGrid />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
