import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site.config";
import BackgroundGrid from "@/components/background-grid";
import CursorGlow from "@/components/cursor-glow";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [...siteConfig.seoKeywords],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    type: "website",
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
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
